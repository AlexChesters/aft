//
//  Interceptors.swift
//  aft-ios
//
//  Created by Alex Chesters on 14/05/2022.
//

import Foundation
import Alamofire

enum BadAuth: Error {
    case invalidAuth
}

private class AccessTokenInterceptor: RequestInterceptor {
    func adapt(_ urlRequest: URLRequest, for session: Session, completion: @escaping (Result<URLRequest, Error>) -> Void) {
        var urlRequest = urlRequest
        
        if let accessToken = AuthUtils().getAccessToken() {
            urlRequest.headers.add(.authorization(accessToken))
            completion(.success(urlRequest))
        } else {
            completion(.failure(BadAuth.invalidAuth))
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
