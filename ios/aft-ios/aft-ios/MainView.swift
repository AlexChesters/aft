//
//  MainView.swift
//  aft-ios
//
//  Created by Alex Chesters on 13/05/2022.
//

import SwiftUI

struct MainView: View {
    var body: some View {
        VStack {
            if AuthUtils().getAccessToken() != nil {
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
    }
}

struct MainView_Previews: PreviewProvider {
    static var previews: some View {
        MainView()
    }
}
