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
        self.isAuthenticated = AuthUtils().isAccessTokenValid()
    }

    public func signIn(email: String, password: String) {
        let signInUrl = "https://edge.alexchesters.com/aft/auth/sign-in"

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

            var date = Date()
            date.addTimeInterval(TimeInterval(response.expires_in))
            let formatter = ISO8601DateFormatter()

            let keychain = KeychainSwift()
            keychain.set(response.access_token, forKey: "access_token")
            keychain.set(response.id_token, forKey: "id_token")
            keychain.set(formatter.string(from: date), forKey: "expires_in")

            self.isAuthenticated = true
        }
    }

    public func signOut() {
        let keychain = KeychainSwift()

        keychain.clear()

        self.isAuthenticated = false
    }
}
