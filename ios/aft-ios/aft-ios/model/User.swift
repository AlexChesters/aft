//
//  User.swift
//  aft-ios
//
//  Created by Alex Chesters on 13/05/2022.
//

import Foundation
import Alamofire
import KeychainSwift

private struct SignInResponse: Decodable {
    let access_token: String
    let id_token: String
    let expires_in: Int
}


class User: ObservableObject {
    @Published var isAuthenticated = false
    
    init () {
        let keychain = KeychainSwift()
        
        if keychain.get("access_token") != nil {
            self.isAuthenticated = true
        }
    }
    
    public func signIn(email: String, password: String) {
        let signInUrl = "https://edge.alexchesters.com/aft/sign-in"

        AF.request(
            signInUrl,
            method: .post,
            parameters: [
                "username": email,
                "password": password
            ],
            encoder: JSONParameterEncoder.default,
            headers: [
                .contentType("application/json"),
            ]
        ).responseDecodable(of: SignInResponse.self) { response in
            debugPrint(response)
            
            guard let response = response.value else {
                print("[ERROR] bad response from sign in request")
                return
            }
            
            let keychain = KeychainSwift()
            keychain.set(response.access_token, forKey: "access_token")
            keychain.set(response.id_token, forKey: "id_token")
            keychain.set("\(response.expires_in)", forKey: "expires_in")
            
            self.isAuthenticated = true
        }
    }
    
    public func handleAuthCallback (url: URL) {
        var urlToParse = URLComponents(string: url.absoluteString)
        urlToParse?.query = nil
        if urlToParse?.string?.starts(with: "aft://callback") == false {
            print("[ERROR] url was not expected callback")
            return
        }
        
        let components = URLComponents(string: url.absoluteString)
        
        components?.queryItems?.forEach { item in
            print("name: \(item.name), value: \(item.value!)")
        }
    }
}
