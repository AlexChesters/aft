//
//  PersistentStorage.swift
//  aft-ios
//
//  Created by Alex Chesters on 16/05/2022.
//

import Foundation
import KeychainSwift

private enum KeychainKeyPrefixes: String {
    case checklist = "AFT_CHECKLIST"
}

class PersistentStorage {
    private let keychain = KeychainSwift()
    
    public func saveChecklistState (completedEntries: [String], checklistIdentifier: String) {
        guard let data = self.stringArrayToData(stringArray: completedEntries) else { return }
        
        let key = "\(KeychainKeyPrefixes.checklist.rawValue)-\(checklistIdentifier)"
        
        self.keychain.set(data, forKey: key)
    }
    
    public func getChecklistState (checklistIdentifier: String) -> [String]? {
        let key = "\(KeychainKeyPrefixes.checklist.rawValue)-\(checklistIdentifier)"
        guard let data = self.keychain.getData(key) else { return nil }
        
        guard let completedEntries = self.dataToStringArray(data: data) else { return nil }
        
        return completedEntries
    }
    
    public func clearChecklistState (checklistIdentifier: String) {
        let key = "\(KeychainKeyPrefixes.checklist.rawValue)-\(checklistIdentifier)"
        self.keychain.delete(key)
    }
    
    private func stringArrayToData(stringArray: [String]) -> Data? {
        return try? JSONSerialization.data(withJSONObject: stringArray, options: [])
    }
    
    private func dataToStringArray(data: Data) -> [String]? {
        return (try? JSONSerialization.jsonObject(with: data, options: [])) as? [String]
    }
}
