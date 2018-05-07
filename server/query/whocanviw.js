db.getCollection('dbusers').aggregate([{
    
            $match: {
    
                "user_role": {
    
                    "$nin": ["ADMIN", "MARRAGE_BUREAU"]
    
                },
    
                "user_status": {
    
                    "$eq": "ACTIVE"
    
                },
                "gender": {
    
                    "$eq": ('MALE' == "MALE" ? "FEMALE" : "MALE")
    
                }
    
            }
    
        }, {
    
            $lookup: {
    
                from: "userblocks",
    
                localField: "user_id",
    
                foreignField: "block_user_id",
    
                as: "blocks"
    
            }
    
        }, {
    
            $lookup: {
    
                from: "userbasicinfos",
    
                localField: "user_id",
    
                foreignField: "user_id",
    
                as: "basic"
    
            }
    
        }, {
    
            "$unwind": {
    
                "path": "$basic",
    
                "preserveNullAndEmptyArrays": true
    
            }
    
        }, {
    
            $lookup: {
    
                from: "countries",
    
                localField: "basic.country",
    
                foreignField: "id",
    
                as: "cn"
    
            }
    
        }, {
    
            "$unwind": {
    
                "path": "$cn",
    
                "preserveNullAndEmptyArrays": true
    
            }
    
        }, {
    
            $lookup: {
    
                from: "states",
    
                localField: "basic.state",
    
                foreignField: "id",
    
                as: "st"
    
            }
    
        }, {
    
            "$unwind": {
    
                "path": "$st",
    
                "preserveNullAndEmptyArrays": true
    
            }
    
        }, {
    
            $lookup: {
    
                from: "cities",
    
                localField: "basic.city",
    
                foreignField: "id",
    
                as: "ct"
    
            }
    
        }, {
    
            "$unwind": {
    
                "path": "$ct",
    
                "preserveNullAndEmptyArrays": true
    
            }
    
        }, {
    
            $lookup: {
    
                from: "userphotos",
    
                localField: "user_id",
    
                foreignField: "user_id",
    
                as: "pics"
    
            }
    
        }, {
    
            $lookup: {
    
                from: "userintrests",
    
                localField: "user_id",
    
                foreignField: "user_id",
    
                as: "interest"
    
            }
    
        }, {
    
            "$unwind": {
    
                "path": "$interest",
    
                "preserveNullAndEmptyArrays": true
    
            }
    
        }, {
    
            $lookup: {
    
                from: "usereducations",
    
                localField: "user_id",
    
                foreignField: "user_id",
    
                as: "education"
    
            }
    
        }, {
    
            "$unwind": {
    
                "path": "$education",
    
                "preserveNullAndEmptyArrays": true
    
            }
    
        }, {
    
            $lookup: {
    
                from: "userfamilies",
    
                localField: "user_id",
    
                foreignField: "user_id",
    
                as: "family"
    
            }
    
        }, {
    
            "$unwind": {
    
                "path": "$family",
    
                "preserveNullAndEmptyArrays": true
    
            }
    
        }, {
    
            $lookup: {
    
                from: "requests",
    
                localField: "user_id",
    
                foreignField: "request_user_id",
    
                as: "requests"
    
            }
    
        }, {
    
            $lookup: {
    
                from: "settings",
    
                localField: "user_id",
    
                foreignField: "user_id",
    
                as: "setting"
    
            }
    
        }, {
    
            "$unwind": {
    
                "path": "$setting",
    
                "preserveNullAndEmptyArrays": true
    
            }
    
        }, {
    
            $lookup: {
    
                from: "usertokens",
    
                localField: "user_id",
    
                foreignField: "user_id",
    
                as: "lastlogin"
    
            }
    
        }, {
    
            "$unwind": {
    
                "path": "$lastlogin",
    
                "preserveNullAndEmptyArrays": true
    
            }
    
        },
        {
    
            $sort: {
    
                "lastlogin.created_on": -1
    
            }
    
        },
        {
    
            $lookup: {
    
                from: "partnerpreferences",
    
                localField: "user_id",
    
                foreignField: "user_id",
    
                as: "partner_pre"
    
            }
    
        }, {
    
            "$unwind": {
    
                "path": "$partner_pre",
    
                "preserveNullAndEmptyArrays": true
    
            }
    
        },
    {
    
            $lookup: {
    
                from: "whocanviews",
    
                localField: "user_id",
    
                foreignField: "user_id",
    
                as: "whocanview"
    
            }
    
        }, {
    
            "$unwind": {
    
                "path": "$whocanview",
    
                "preserveNullAndEmptyArrays": true
    
            }
    
        },
         
        {
    
            $project: {
    
                "_id": 1,
                "main_user_id": "CDF20738",
                "whocanview":"$whocanview",
                "user_id": "$user_id",
                "online": "$lastlogin.online",
                "user_status": "$user_status",
                "first_name": "$first_name",
                "last_name": "$last_name",
                "gender": "$gender",
                "dob": "$dob",
                "age": "$age",
                height: "$interest.height",
                "location_name": {
                    country: "$cn.name",
                    state: "$st.name",
                    city: "$ct.name"
                },
                phone_number: "$phone_number",
                "country": "$basic.country",
                "state": "$basic.state",
                "city": "$basic.city",
                "maritialstatus": "$basic.maritialstatus",
                "mothertounge": "$basic.mothertounge",
                "religion": "$basic.religion",
                "caste": "$basic.caste",
                "high_edu": "$education.high_edu",
                "occupation": "$education.occupation",
                "physical_status": "$interest.physical_status",
                body_type: "$interest.body_type",
                complexion: "$interest.complexion",
                expectation: "$interest.expectation",
                "horoscope": "$family.horoscope",
                "aincome": "$family.aincome",
                "created_by": "$created_by",
                "created_on": "$created_on",
                "setting": "$setting",
                
                userinfo: {
                   
                    "basic": "$basic",
                    "education": "$education",
                    "interest": "$interest",
                    "family": "$family",
                    "partner_pre": "$partner_pre"
                }
    
    
    
            }
    
        },
         {
    
            $lookup: {
    
                from: "dbusers",
    
                localField: "main_user_id",
    
                foreignField: "user_id",
    
                as: "loginuser"
    
            }
    
        },
        
         {
    
            "$unwind": {
    
                "path": "$loginuser",
    
                "preserveNullAndEmptyArrays": true
    
            }
    
        },
        {
    
            $lookup: {
    
                from: "userintrests",
    
                localField: "main_user_id",
    
                foreignField: "user_id",
    
                as: "loginuser_interest"
    
            }
    
        }, {
    
            "$unwind": {
    
                "path": "$loginuser_interest",
    
                "preserveNullAndEmptyArrays": true
    
            }
    
        },
        {
          $project: {
              
              login_user_age:"$loginuser.age",
              login_user_height:"$loginuser_interest.height",
              isWhocanviewon:{
    
                    $ifNull: ["$whocanview", null]
    
                },
              view_user_age:{
    
                    $ifNull: ["$whocanview.fields.age", null]
    
                },
                 view_user_height:{
    
                    $ifNull: ["$whocanview.fields.height", null]
    
                },
                
                view_user_maritialstatus:{
    
                    $filter: {
    
                    input: "$whocanview.fields.maritialstatus",
    
                    as: "item",
    
                    cond: {
    
                        $or: [{
    
                            "$nq": ["$$item", "ANY"]
    
                        }, {
    
                            "$eq": ["$$item", "ANY_1"]
    
                        }]
    
                    }
    
                }
    
                },
                view_user_mothertounge:{
    
                    $ifNull: ["$whocanview.fields.mothertounge", null]
    
                },
                 view_user_religion:{
    
                    $ifNull: ["$whocanview.fields.religion", null]
    
                },
                 view_user_caste:{
    
                    $ifNull: ["$whocanview.fields.caste", null]
    
                },
                  view_user_country:{
    
                    $ifNull: ["$whocanview.fields.country", null]
    
                },
                  view_user_state:{
    
                    $ifNull: ["$whocanview.fields.state", null]
    
                },
                 view_user_city:{
    
                    $ifNull: ["$whocanview.fields.city", null]
    
                },
                  view_user_physical_status:{
    
                    $ifNull: ["$whocanview.fields.physical_status", null]
    
                },
                  view_user_high_edu:{
    
                    $ifNull: ["$whocanview.fields.high_edu", null]
    
                },
                  view_user_occupation:{
    
                    $ifNull: ["$whocanview.fields.occupation", null]
    
                },
          }   
            
        },{
          $project: {
              login_user_height:"$login_user_height",
              isVisibleUser:{
                   "$cond": {
                       
                       if:{
                           $eq:["$isWhocanviewon",null]
                       },
                       then:"VISIBLE",
                       else:{
                                   "$cond": {
                       
                                    if:{
                                           $or:[
                                               
                                              {
                                            $lt:["$view_user_age.to","$login_user_age"]
                                              },
                                              {
                                            $gt:["$view_user_age.from","$login_user_age"]
                                             }
                                             ]
                                     },
                                   then:"INVISIBLE",
                                    else:{
                                        $cond:{
                                            if:{ $or:[
                                               
                                              {
                                            $lt:["$view_user_height.to","$login_user_height"]
                                              },
                                              {
                                            $gt:["$view_user_height.from","$login_user_height"]
                                             }
                                             ]
                                                
                                            },
                                            then:"INVISIBLE",
                                            else:{
                                                
                                                
                                                
                                            }//3rd else condition end
                                            
                                            
                                          }
                                      
                                     }//2nd else condition end
                                      
                                  }
                               }
                           
                          }//1 st else condition end
                   }
                  
              }
              
              
          }
            
        } 
        
        
        ])
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
        ,{
            $project: {
                
                isVisibleUser:{
                     "$cond": {
                         
                         if:{
                             $eq:["$isWhocanviewon",null]
                         },
                         then:"VISIBLE",
                         else:{
                                     "$cond": {
                         
                                      if:{
                                             $or:[
                                                 
                                                {
                                              $lt:["$view_user_age.to","$login_user_age"]
                                                },
                                                {
                                              $gt:["$view_user_age.from","$login_user_age"]
                                               }
                                               ]
                                       },
                                     then:"INVISIBLE",
                                      else:{
                                          $cond:{
                                              if:{ $or:[
                                                 
                                                {
                                              $lt:["$view_user_height.to","$login_user_height"]
                                                },
                                                {
                                              $gt:["$view_user_height.from","$login_user_height"]
                                               }
                                               ]
                                                  
                                              },
                                              then:"INVISIBLE",
                                              else:{
                                                  
                                        
                                                  
                                              }//3rd else condition end
                                              
                                              
                                            }
                                        
                                       }//2nd else condition end
                                        
                                    }
                                 }
                             
                            }//1 st else condition end
                     }
                    
                }
                
                
            }
              
          } 
           