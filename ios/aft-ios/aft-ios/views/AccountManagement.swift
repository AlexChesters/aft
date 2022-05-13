//
//  AccountManagement.swift
//  aft-ios
//
//  Created by Alex Chesters on 13/05/2022.
//

import SwiftUI

struct AccountManagement: View {
    @EnvironmentObject var user: User
    
    var body: some View {
        VStack {
            Text("Your account")
            
            Spacer()
            
            Button("Sign out") {
                self.user.signOut()
            }
        }.padding()
    }
}

struct AccountManagement_Previews: PreviewProvider {
    static var previews: some View {
        AccountManagement()
    }
}
