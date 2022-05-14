//
//  Checklist.swift
//  aft-ios
//
//  Created by Alex Chesters on 14/05/2022.
//

import SwiftUI

struct ChecklistView: View {
    let checklist: Checklist
    
    var body: some View {
        ScrollView {
            VStack {
                Text(checklist.aircraft)
            }
        }
        .padding()
    }
}

struct Checklist_Previews: PreviewProvider {
    static var previews: some View {
        ChecklistView(checklist: Checklist(
            data: ChecklistAPIType(
                identifier: "abcd-1234",
                aircraft: "Airbus A319",
                notes: "Made for the Toliss A319 in XP11",
                sections: [ChecklistSection(
                    title: "Preflight",
                    entries: [
                        "Flight - Planned",
                        "smartCARS - Started"
                    ]
                )]
            )
        ))
    }
}
