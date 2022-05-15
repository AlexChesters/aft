//
//  aft_iosApp.swift
//  aft-ios
//
//  Created by Alex Chesters on 13/05/2022.
//

import SwiftUI

@main
struct aft_iosApp: App {
    var body: some Scene {
        WindowGroup {
            MainView()
                .onOpenURL { url in
                    AuthUtils().handleAuthCallback(url: url)
                }
        }
    }
}
