//
//  Auth.swift
//  aft-ios
//
//  Created by Alex Chesters on 13/05/2022.
//

import SwiftUI

struct Auth: View {
    @EnvironmentObject var user: User
    
    @State var email: String = ""
    @State var password: String = ""
    
    var body: some View {
        VStack {
            Spacer()
            
            TextField("Email address", text: $email)
                .keyboardType(.emailAddress)
                .disableAutocorrection(true)
            Divider()
            SecureField("Password", text: $password)
                .disableAutocorrection(true)
            Divider()
            
            Spacer()
            
            Button("Sign in") {
                self.user.signIn(
                    email: self.email,
                    password: self.password
                )
            }
        }.padding()
    }
}

struct Auth_Previews: PreviewProvider {
    static var previews: some View {
        Auth().environmentObject(User())
    }
}
