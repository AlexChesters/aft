//
//  ChecklistCard.swift
//  aft-ios
//
//  Created by Alex Chesters on 14/05/2022.
//

import SwiftUI

struct ChecklistCard: View {
    let checklist: Checklist
    
    var body: some View {
        VStack(alignment: .leading) {
            Text(checklist.aircraft).font(.headline)
            Text(checklist.notes)
                .font(.footnote)
                .italic()
        }
    }
}

struct ChecklistCard_Previews: PreviewProvider {
    static var previews: some View {
        ChecklistCard(
            checklist: Checklist(
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
            )
        )
    }
}