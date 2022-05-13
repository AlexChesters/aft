//
//  aft_iosApp.swift
//  aft-ios
//
//  Created by Alex Chesters on 13/05/2022.
//

import SwiftUI

@main
struct aft_iosApp: App {
    @StateObject private var user = User()
    
    var body: some Scene {
        WindowGroup {
            MainView()
                .onOpenURL { url in
                    self.user.handleAuthCallback(url: url)
                }
                .environmentObject(user)
        }
    }
}
