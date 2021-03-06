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
                    ChecklistsList()
                        .tabItem {
                            Label(
                                "Checklists",
                                systemImage: "checklist"
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
        .onAppear {
            if AuthUtils().getAccessToken() != nil { user.isAuthenticated = true }
        }
    }
}

struct MainView_Previews: PreviewProvider {
    static var previews: some View {
        MainView()
    }
}
