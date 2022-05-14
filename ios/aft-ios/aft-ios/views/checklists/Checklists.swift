//
//  Checklists.swift
//  aft-ios
//
//  Created by Alex Chesters on 13/05/2022.
//

import SwiftUI

struct Checklists: View {
    @EnvironmentObject var user: User
    
    @State private var checklists: [Checklist] = []
    
    var body: some View {
        ScrollView {
            VStack(alignment: .leading) {
                if checklists.count == 0 {
                    ProgressView().padding()
                } else {
                    ForEach(checklists) { checklist in
                        Text(checklist.aircraft)
                        Divider()
                    }
                }
            }
        }
        .task {
            await getAllChecklists() { results in
                checklists = results
            }
        }
    }
}

struct Checklists_Previews: PreviewProvider {
    static var previews: some View {
        Checklists()
    }
}
