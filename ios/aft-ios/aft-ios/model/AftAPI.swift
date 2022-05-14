//
//  AftAPI.swift
//  aft-ios
//
//  Created by Alex Chesters on 14/05/2022.
//

import Foundation
import Alamofire
import KeychainSwift

class Checklist: Identifiable {
    let id: String
    let aircraft: String

    init (data: ChecklistAPIType) {
        self.id = data.identifier
        self.aircraft = data.aircraft
    }
}

struct ChecklistAPIType: Decodable {
    let identifier: String
    let aircraft: String
}

func getAllChecklists (completionHandler: @escaping (_ result: [Checklist]) -> Void) async {
    let url = "https://edge.alexchesters.com/aft/checklists/list"
    
    AF.request(url, interceptor: authenticatedRequestsInterceptor).responseDecodable(of: [ChecklistAPIType].self) { response in
        guard let results = response.value else {
            debugPrint(response)
            print("[ERROR] bad response for all checklists")
            completionHandler([])
            return
        }
        
        let checklists = results
            .map { return Checklist(data: $0) }
            .sorted(by: { $0.aircraft < $1.aircraft })
        completionHandler(checklists)
    }
}
