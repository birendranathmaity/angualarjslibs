db.getCollection('requests').find({
    $or:[{
       "$and": [

                                { "user_id": {"$eq":"DB22712"} },

                                {"request_status":{"$eq":"UNREAD"}},
                                {

                                    "$or":[
                                    { "request_action": {"$eq":"ACCEPTED"} },
                                    { "request_action": {"$eq":"REJECTED"} },
                                       
                                    ]
                                }
                               

                            ]
        },{
            "$and": [

                                { "request_user_id": {"$eq":"DB22712"} },

                                {"request_status":{"$eq":"UNREAD"}},
                                { "request_action": {"$ne":"PENDING"} },
                                
                               

                            ]
            
            }
        
        ]
       
    
    
    })