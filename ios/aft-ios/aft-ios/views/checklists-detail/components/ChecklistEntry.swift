//
//  ChecklistEntry.swift
//  aft-ios
//
//  Created by Alex Chesters on 15/05/2022.
//

import SwiftUI

struct ChecklistEntry: View {
    let identifier: String
    let entry: String
    
    @State var completed: Bool = false
    
    var body: some View {
        HStack {
            Text(entry)
                .strikethrough(completed)
                .font(.system(size: 26))
                .onTapGesture {
                    completed.toggle()
                    let defaults = UserDefaults.standard
                    
                    var persistentState = defaults.object(forKey: "\(identifier)-completed-state") as? [String] ?? []
                    
                    if persistentState.contains(entry) {
                        persistentState.removeAll(where: { $0 == entry })
                    } else {
                        persistentState.append(entry)
                    }
                    
                    defaults.setValue(persistentState, forKey: "\(identifier)-completed-state")
                }
        }
        .onAppear {
            let defaults = UserDefaults.standard
            
            let completedEntries = defaults.object(forKey: "\(identifier)-completed-state") as? [String] ?? []
            completed = completedEntries.contains(entry)
        }
    }
}

struct ChecklistEntry_Previews: PreviewProvider {
    static var previews: some View {
        ChecklistEntry(
            identifier: "abcd1234",
            entry: "Battery 1 + 2 - ON"
        )
    }
}
