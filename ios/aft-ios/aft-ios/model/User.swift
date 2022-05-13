//
//  User.swift
//  aft-ios
//
//  Created by Alex Chesters on 13/05/2022.
//

import Foundation
import Alamofire

private struct SignInResponse: Decodable {
    let access_token: String
    let id_token: String
    let expires_in: Int
}


class User: ObservableObject {
    @Published var isAuthenticated = false
    
    public func signIn(email: String, password: String) {
//        let signInUrl = "https://edge.alexchesters.com/aft/sign-in"
        let signInUrl = "http://localhost:8080/sign-in"

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
            
            print(response.access_token, response.id_token, response.expires_in)
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
