//
//  AuthUtils.swift
//  aft-ios
//
//  Created by Alex Chesters on 14/05/2022.
//

import Foundation
import KeychainSwift

class AuthUtils {
    public func isAccessTokenValid() -> Bool {
        let keychain = KeychainSwift()
        
        if keychain.get("access_token") != nil {
            guard let expiresIn = keychain.get("expires_in") else { return false }
            
            let formatter = ISO8601DateFormatter()
            guard var expiryDate = formatter.date(from: expiresIn) else { return false }
            
            // consider tokens due to expire within 1 hour as expired
            expiryDate.addTimeInterval(TimeInterval(-3600))
            
            if expiryDate > Date() {
                return true
            }
        }
        
        return false
    }
}
