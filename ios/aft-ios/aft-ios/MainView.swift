//
//  MainView.swift
//  aft-ios
//
//  Created by Alex Chesters on 13/05/2022.
//

import SwiftUI

struct MainView: View {
    @EnvironmentObject var user: User
    
    var body: some View {
        VStack {
            if user.isAuthenticated {
                TabView {
                    Home()
                        .tabItem {
                            Label(
                                "Home",
                                systemImage: "house"
                            )
                        }
                    AccountManagement()
                        .tabItem {
                            Label(
                                "Account",
                                systemImage: "person.crop.circle.fill"
                            )
                        }
                }
            } else {
                Auth()
            }
        }
    }
}

struct MainView_Previews: PreviewProvider {
    static var previews: some View {
        MainView().environmentObject(User())
    }
}
