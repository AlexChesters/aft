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
        Button(action: { onTapped() }) {
            HStack {
                Text(entry)
                    .strikethrough(completed)
                    .opacity(completed ? 0.2 : 1.0)
                    .font(.system(size: 26))
                    .frame(
                        minWidth: 0,
                        maxWidth: .infinity,
                        alignment: .leading
                    )
            }
            .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
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
