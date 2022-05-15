//
//  AuthUtils.swift
//  aft-ios
//
//  Created by Alex Chesters on 14/05/2022.
//

import Foundation
import KeychainSwift
import Alamofire

private struct AuthDataTypes {
    struct RefreshTokenResponse: Decodable {
        let accessToken: String
        let expiresIn: Int
    }
}

private enum AccessTokenState {
    case notFound
    case expired
    case unknown
    case valid
}

class AuthUtils {
    public func handleAuthCallback (url: URL) {
        var urlToParse = URLComponents(string: url.absoluteString)
        urlToParse?.query = nil
        if urlToParse?.string?.starts(with: "aft://auth/success") == false {
            print("[ERROR] url was not expected callback")
            return
        }

        let components = URLComponents(string: url.absoluteString)
        
        let keychain = KeychainSwift()
        
        components?.queryItems?.forEach { item in
            switch item.name {
            case "refresh_token":
                keychain.set(item.value!, forKey: "refresh_token")
                break
            case "access_token":
                keychain.set(item.value!, forKey: "access_token")
                break
            case "expires_in":
                var date = Date()
                date.addTimeInterval(TimeInterval(item.value!)!)
                let formatter = ISO8601DateFormatter()
                keychain.set(formatter.string(from: date), forKey: "expires_in")
                break
            default: break
            }
        }
    }
    
    private func refreshToken(completionHandler: @escaping () -> Void) async {
        let keychain = KeychainSwift()
        
        guard let refreshToken = keychain.get("refresh_token") else {
            completionHandler()
            return
        }
        
        AF.request(
            "https://edge.alexchesters.com/aft/auth/refresh/ios",
            method: .post,
            parameters: [
                "refreshToken": refreshToken
            ],
            encoding: JSONEncoding.default,
            interceptor: unauthenticatedRequestsInterceptor
        ).responseDecodable(of: AuthDataTypes.RefreshTokenResponse.self) { response in
            guard let result = response.value else {
                debugPrint(response)
                print("[ERROR] bad response for access token request")
                completionHandler()
                return
            }
            
            keychain.set(result.accessToken, forKey: "access_token")
            var date = Date()
            date.addTimeInterval(TimeInterval(result.expiresIn))
            let formatter = ISO8601DateFormatter()
            keychain.set(formatter.string(from: date), forKey: "expires_in")
            
            completionHandler()
        }
    }
    
    public func refreshAccessTokenIfNeeded(completionHandler: @escaping () -> Void) async {
        let keychain = KeychainSwift()
        
        if keychain.get("access_token") != nil {
            guard let expiresIn = keychain.get("expires_in") else {
                completionHandler()
                return
            }
            
            let formatter = ISO8601DateFormatter()
            guard var expiryDate = formatter.date(from: expiresIn) else {
                completionHandler()
                return
            }
            
            // consider tokens due to expire within 5 minutes as expired
            expiryDate.addTimeInterval(TimeInterval(-300))
            
            if expiryDate > Date() {
                completionHandler()
            } else {
                await self.refreshToken {
                    let keychain = KeychainSwift()
                    guard keychain.get("access_token") != nil else {
                        completionHandler()
                        return
                    }
                    
                    completionHandler()
                }
            }
        } else {
            completionHandler()
            return
        }
    }
    
    public func getAccessToken () -> String? {
        let keychain = KeychainSwift()
        guard let accessToken = keychain.get("access_token") else { return nil }
        
        return accessToken
    }
    
    public func signOut() {
        let keychain = KeychainSwift()

        keychain.clear()
    }
}
