//
//  Auth.swift
//  aft-ios
//
//  Created by Alex Chesters on 13/05/2022.
//

import SwiftUI

struct Auth: View {
    private var signInUrl = "https://aft.auth.eu-west-1.amazoncognito.com/oauth2/authorize?client_id=7i2fmh23s0j3u5nrb29v1qp9qd&response_type=code&scope=email+openid&redirect_uri=https%3A%2F%2Fedge.alexchesters.com%2Faft%2Fauth%2Fcallback%2Fios"
    
    var body: some View {
        VStack {
            Link(
                "Sign in",
                destination: URL(string: signInUrl)!
            )
        }.padding()
    }
}

struct Auth_Previews: PreviewProvider {
    static var previews: some View {
        Auth()
    }
}
