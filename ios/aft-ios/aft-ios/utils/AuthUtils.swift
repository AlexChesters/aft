//
//  AuthUtils.swift
//  aft-ios
//
//  Created by Alex Chesters on 14/05/2022.
//

import Foundation
import KeychainSwift

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
    
    public func isAccessTokenValid() -> Bool {
        let keychain = KeychainSwift()
        
        if keychain.get("access_token") != nil {
            guard let expiresIn = keychain.get("expires_in") else { return false }
            
            let formatter = ISO8601DateFormatter()
            guard var expiryDate = formatter.date(from: expiresIn) else { return false }
            
            // consider tokens due to expire within 5 minutes as expired
            expiryDate.addTimeInterval(TimeInterval(-300))
            
            if expiryDate > Date() {
                return true
            }
        }
        
        return false
    }
    
    public func getAccessToken () -> String? {
        if !self.isAccessTokenValid() { return nil }
        
        let keychain = KeychainSwift()
        guard let accessToken = keychain.get("access_token") else {
            return nil
        }
        
        return accessToken
    }
    
    public func signOut() {
        let keychain = KeychainSwift()

        keychain.clear()
    }
}
