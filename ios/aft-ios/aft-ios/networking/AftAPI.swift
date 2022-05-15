//
//  AftAPI.swift
//  aft-ios
//
//  Created by Alex Chesters on 14/05/2022.
//

import Foundation
import Alamofire
import KeychainSwift

struct DataTypes {
    struct Checklist: Decodable, Identifiable {
        let identifier: String
        let aircraft: String
        let notes: String
        let sections: [ChecklistSection]
        
        var id: String { identifier }
    }
    
    struct ChecklistSection: Decodable, Identifiable {
        let title: String
        let entries: [String]
        
        var id: String { title }
    }
}

func getAllChecklists (completionHandler: @escaping (_ result: [DataTypes.Checklist]) -> Void) async {
    let url = "https://edge.alexchesters.com/aft/checklists/list"
    
    AF.request(url, interceptor: authenticatedRequestsInterceptor).responseDecodable(of: [DataTypes.Checklist].self) { response in
        guard let results = response.value else {
            debugPrint(response)
            print("[ERROR] bad response for all checklists")
            completionHandler([])
            return
        }
        
        let checklists = results.sorted(by: { $0.aircraft < $1.aircraft })
        completionHandler(checklists)
    }
}
