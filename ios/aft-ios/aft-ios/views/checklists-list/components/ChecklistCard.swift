//
//  ChecklistCard.swift
//  aft-ios
//
//  Created by Alex Chesters on 14/05/2022.
//

import SwiftUI

struct ChecklistCard: View {
    let checklist: AFTDataTypes.Checklist
    
    var body: some View {
        VStack(alignment: .leading) {
            Text(checklist.aircraft)
                .font(.system(size: 26))
            Text(checklist.notes)
                .font(.system(size: 22))
                .italic()
        }
    }
}

struct ChecklistCard_Previews: PreviewProvider {
    static var previews: some View {
        ChecklistCard(
            checklist: AFTDataTypes.Checklist(
                identifier: "abcd-1234",
                aircraft: "Airbus A319",
                notes: "Made for the Toliss A319 in XP11",
                sections: [AFTDataTypes.ChecklistSection(
                    title: "Preflight",
                    entries: [
                        "Flight - Planned",
                        "smartCARS - Started"
                    ]
                )]
            )
        )
    }
}
