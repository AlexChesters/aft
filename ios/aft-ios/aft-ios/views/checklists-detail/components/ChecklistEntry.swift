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
    let completed: Bool
    let onTapped: () -> Void
    
    var body: some View {
        HStack {
            Text(entry)
                .strikethrough(completed)
                .opacity(completed ? 0.2 : 1.0)
                .font(.system(size: 26))
                .onTapGesture {
                    
                    onTapped()
                }
        }
    }
}

struct ChecklistEntry_Previews: PreviewProvider {
    static var previews: some View {
        ChecklistEntry(
            identifier: "abcd1234",
            entry: "Battery 1 + 2 - ON",
            completed: true,
            onTapped: {}
        )
    }
}
