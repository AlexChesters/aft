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

class ChecklistProgressStorage {
    // MARK: public properties
    public let identifier: String
    
    // MARK: private properties
    private let keychain = KeychainSwift()
    private let keychainKey: String
    
    init (identifier: String) {
        self.identifier = identifier
        self.keychainKey = "\(KeychainKeyPrefixes.checklist.rawValue)-\(identifier)"
    }
    
    public func save (completedEntries: [String]) {
        guard let data = self.stringArrayToData(stringArray: completedEntries) else { return }
        
        self.keychain.set(data, forKey: self.keychainKey)
    }
    
    public func get () -> [String] {
        guard let data = self.keychain.getData(self.keychainKey) else { return [] }
        
        guard let completedEntries = self.dataToStringArray(data: data) else { return [] }
        
        return completedEntries
    }
    
    public func clear () {
        self.keychain.delete(self.keychainKey)
    }
    
    private func stringArrayToData(stringArray: [String]) -> Data? {
        return try? JSONSerialization.data(withJSONObject: stringArray, options: [])
    }
    
    private func dataToStringArray(data: Data) -> [String]? {
        return (try? JSONSerialization.jsonObject(with: data, options: [])) as? [String]
    }
}
