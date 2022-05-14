//
//  Interceptors.swift
//  aft-ios
//
//  Created by Alex Chesters on 14/05/2022.
//

import Foundation
import Alamofire
import KeychainSwift

enum BadAuth: Error {
    case noAccessToken
}

private class AccessTokenInterceptor: RequestInterceptor {
    func adapt(_ urlRequest: URLRequest, for session: Session, completion: @escaping (Result<URLRequest, Error>) -> Void) {
        var urlRequest = urlRequest
        let keychain = KeychainSwift()
        
        if let accessToken = keychain.get("access_token") {
            urlRequest.headers.add(.authorization(accessToken))
            completion(.success(urlRequest))
        } else {
            completion(.failure(BadAuth.noAccessToken))
        }
    }
}

private class UserAgentInterceptor: RequestInterceptor {
    func adapt(_ urlRequest: URLRequest, for session: Session, completion: @escaping (Result<URLRequest, Error>) -> Void) {
        var urlRequest = urlRequest
        
        urlRequest.headers.add(.userAgent("ios:aft:v0.0.0"))
        
        completion(.success(urlRequest))
    }
}

let unauthenticatedRequestsInterceptor = Interceptor(adapters: [UserAgentInterceptor()])
let authenticatedRequestsInterceptor = Interceptor(adapters: [AccessTokenInterceptor(), UserAgentInterceptor()])
