//
//  ChecklistEntry.swift
//  aft-ios
//
//  Created by Alex Chesters on 15/05/2022.
//

import SwiftUI

struct ChecklistEntry: View {
    let entry: String
    
    @State private var completed: Bool = false
    
    var body: some View {
        HStack {
            Text(entry)
                .strikethrough(completed)
                .font(.system(size: 26))
                .onTapGesture {
                    completed.toggle()
                }
        }
    }
}

struct ChecklistEntry_Previews: PreviewProvider {
    static var previews: some View {
        ChecklistEntry(entry: "Battery 1 + 2 - ON")
    }
}
