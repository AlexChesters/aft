//
//  ChecklistView.swift
//  aft-ios
//
//  Created by Alex Chesters on 14/05/2022.
//

import SwiftUI

struct ChecklistView: View {
    let checklist: Checklist
    
    var body: some View {
        ScrollView {
            VStack(alignment: .leading) {
                Text(checklist.aircraft)
                    .font(.system(size: 30))
                Text(checklist.notes)
                    .font(.system(size: 18))
                    .italic()
                
                Spacer()
                
                ForEach(checklist.sections) { section in
                    Text(section.title)
                        .font(.system(size: 22))
                        .underline()
                    Spacer()
                    
                    ForEach(section.entries, id: \.self) { entry in
                        Text(entry)
                            .font(.system(size: 16))
                    }
                    
                    Divider()
                }
            }
            .frame(
              minWidth: 0,
              maxWidth: .infinity,
              minHeight: 0,
              maxHeight: .infinity,
              alignment: .topLeading
            )
        }
        .padding()
    }
}

struct Checklist_Previews: PreviewProvider {
    static var previews: some View {
        ChecklistView(checklist: Checklist(
            identifier: "abcd-1234",
            aircraft: "Airbus A319",
            notes: "Made for the Toliss A319 in XP11",
            sections: [
                ChecklistSection(
                    title: "Preflight",
                    entries: [
                        "Flight - Planned",
                        "smartCARS - Started"
                    ]
                ),
                ChecklistSection(
                    title: "Cockpit preparation",
                    entries: [
                        "Battery 1 + 2 - ON"
                    ]
                )
            ]
        ))
    }
}
