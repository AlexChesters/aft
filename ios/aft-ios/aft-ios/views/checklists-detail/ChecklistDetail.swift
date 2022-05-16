//
//  ChecklistDetail.swift
//  aft-ios
//
//  Created by Alex Chesters on 14/05/2022.
//

import SwiftUI

struct ChecklistDetail: View {
    let checklist: AFTDataTypes.Checklist
    
    @State private var completedEntries: [String] = []
    
    private let persistentStorage = PersistentStorage()
    
    var body: some View {
        ScrollView {
            VStack(alignment: .leading) {
                HStack {
                    Text(checklist.aircraft)
                        .font(.system(size: 40))
                    
                    Spacer()
                    
                    Button {
                        persistentStorage.clearChecklistState(checklistIdentifier: checklist.identifier)
                        completedEntries = []
                    } label: {
                        Image(systemName: "xmark.circle")
                    }
                    .buttonStyle(.plain)
                    .font(.system(size: 24))
                }
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
                        ChecklistEntry(
                            identifier: checklist.identifier,
                            entry: entry,
                            completed: completedEntries.contains(entry),
                            onTapped: {
                                var persistentState = persistentStorage.getChecklistState(checklistIdentifier: checklist.identifier) ?? []
                                
                                if persistentState.contains(entry) {
                                    persistentState.removeAll(where: { $0 == entry })
                                } else {
                                    persistentState.append(entry)
                                }
                                
                                persistentStorage.saveChecklistState(completedEntries: persistentState, checklistIdentifier: checklist.identifier)
                                completedEntries = persistentState
                            }
                        )
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
        .onAppear {
            completedEntries = persistentStorage.getChecklistState(checklistIdentifier: checklist.identifier) ?? []
        }
    }
}

struct ChecklistDetail_Previews: PreviewProvider {
    static var previews: some View {
        ChecklistDetail(checklist: AFTDataTypes.Checklist(
            identifier: "abcd-1234",
            aircraft: "Airbus A319",
            notes: "Made for the Toliss A319 in XP11",
            sections: [
                AFTDataTypes.ChecklistSection(
                    title: "Preflight",
                    entries: [
                        "Flight - Planned",
                        "smartCARS - Started"
                    ]
                ),
                AFTDataTypes.ChecklistSection(
                    title: "Cockpit preparation",
                    entries: [
                        "Battery 1 + 2 - ON"
                    ]
                )
            ]
        ))
    }
}
