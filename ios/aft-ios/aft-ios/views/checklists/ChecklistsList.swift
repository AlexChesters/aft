//
//  ChecklistsList.swift
//  aft-ios
//
//  Created by Alex Chesters on 13/05/2022.
//

import SwiftUI

struct ChecklistsList: View {
    @EnvironmentObject var user: User
    
    @State private var checklists: [Checklist] = []
    
    var body: some View {
        NavigationView {
            ScrollView {
                VStack(alignment: .leading) {
                    if checklists.count == 0 {
                        ProgressView()
                    } else {
                        ForEach(checklists) { checklist in
                            NavigationLink {
                                Text("Hello")
                            } label: {
                                ChecklistCard(checklist: checklist)
                                    .onTapGesture {
                                        print("tapped: \(checklist.id)")
                                    }
                            }
                            .buttonStyle(.plain)
                            Divider()
                        }
                    }
                }
            }
            .padding()
        }
        .navigationViewStyle(StackNavigationViewStyle())
        .task {
            await getAllChecklists() { results in
                checklists = results
            }
        }
    }
}

struct ChecklistsList_Previews: PreviewProvider {
    static var previews: some View {
        ChecklistsList()
    }
}
