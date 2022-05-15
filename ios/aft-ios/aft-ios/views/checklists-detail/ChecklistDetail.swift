//
//  ChecklistDetail.swift
//  aft-ios
//
//  Created by Alex Chesters on 14/05/2022.
//

import SwiftUI

struct ChecklistDetail: View {
    let checklist: DataTypes.Checklist
    
    var body: some View {
        ScrollView {
            VStack(alignment: .leading) {
                Text(checklist.aircraft)
                    .font(.system(size: 40))
                Text(checklist.notes)
                    .font(.system(size: 24))
                    .italic()
                
                Divider().frame(height: 2).background(Color.green)
                Spacer()
                
                ForEach(checklist.sections) { section in
                    Text(section.title)
                        .font(.system(size: 32))
                        .underline()
                        .padding(.bottom)
                    Spacer()
                    
                    ForEach(section.entries, id: \.self) { entry in
                        ChecklistEntry(entry: entry)
                        Divider()
                    }
                    
                    Divider().frame(height: 3).background(Color.green)
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

struct ChecklistDetail_Previews: PreviewProvider {
    static var previews: some View {
        ChecklistDetail(checklist: DataTypes.Checklist(
            identifier: "abcd-1234",
            aircraft: "Airbus A319",
            notes: "Made for the Toliss A319 in XP11",
            sections: [
                DataTypes.ChecklistSection(
                    title: "Preflight",
                    entries: [
                        "Flight - Planned",
                        "smartCARS - Started"
                    ]
                ),
                DataTypes.ChecklistSection(
                    title: "Cockpit preparation",
                    entries: [
                        "Battery 1 + 2 - ON"
                    ]
                )
            ]
        ))
    }
}
