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
    ////////////who can view//////////
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

            from: "userbasicinfos",

            localField: "main_user_id",

            foreignField: "user_id",

            as: "loginuser_basic"

        }

    }, {

        "$unwind": {

            "path": "$loginuser_basic",

            "preserveNullAndEmptyArrays": true

        }

    },  {

        $lookup: {

            from: "usereducations",

            localField: "main_user_id",

            foreignField: "user_id",

            as: "loginuser_education"

        }

    }, {

        "$unwind": {

            "path": "$loginuser_education",

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
          
          login_user_mothertounge:"$loginuser_basic.mothertounge",
          login_user_maritialstatus:"$loginuser_basic.maritialstatus",
          login_user_religion:"$loginuser_basic.religion",
          login_user_caste:"$loginuser_basic.caste",
          login_user_country:"$loginuser_basic.country",
          login_user_state:"$loginuser_basic.state",
          login_user_city:"$loginuser_basic.city",
          
          login_user_high_edu:"$loginuser_education.high_edu",
          login_user_occupation:"$loginuser_education.occupation",
          
          login_user_height:"$loginuser_interest.height",
          login_user_physical_status:"$loginuser_interest.physical_status",
          login_user_complexion:"$loginuser_interest.complexion",
          login_user_body_type:"$loginuser_interest.body_type",
          login_user_expectation:"$loginuser_interest.expectation",
          
          
          
          
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

                    $and: [{

                        "$ne": ["$$item", "ANY"]

                    },{

                        "$eq": ["$$item", "$loginuser_basic.maritialstatus"]

                    }, {

                        "$ne": ["$$item", "ANY_1"]

                    }]

                }

            }

            },
            view_user_mothertounge:{
                  $filter: {

                input: "$whocanview.fields.mothertounge",

                as: "item",

                cond: {

                    $and: [{

                        "$ne": ["$$item", "ANY"]

                    }, {

                        "$eq": ["$$item", "$loginuser_basic.mothertounge"]

                    }]

                }

            }

            

            },
             view_user_religion:{
                    $filter: {

                input: "$whocanview.fields.religion",

                as: "item",

                cond: {

                    $and: [{

                        "$ne": ["$$item", "ANY"]

                    },{

                        "$ne": ["$$item", "$loginuser_basic.religion"]

                    }, {

                        "$ne": ["$$item", "ANY_1"]

                    }]

                }

            }

            

            },
             view_user_caste:{
                  $filter: {

                input: "$whocanview.fields.caste",

                as: "item",

                cond: {

                    $and: [{

                        "$ne": ["$$item.value", "ANY"]

                    }, {

                        "$eq": ["$$item.value", "$loginuser_basic.caste"]

                    }, {

                        "$ne": ["$$item.value", "ANY_1"]

                    }]

                }

            }

              

            },
             view_user_high_edu:{

                $filter: {

                input: "$whocanview.fields.high_edu",

                as: "item",

                cond: {

                    $and: [{

                        "$ne": ["$$item", "ANY"]

                    },{

                        "$eq": ["$$item", "$loginuser_education.high_edu"]

                    }, {

                        "$ne": ["$$item", "ANY_1"]

                    }]

                }

            }

            }, view_user_occupation:{

                $filter: {

                input: "$whocanview.fields.occupation",

                as: "item",

                cond: {

                    $and: [{

                        "$ne": ["$$item", "ANY"]

                    },{

                        "$eq": ["$$item", "$loginuser_education.occupation"]

                    }, {

                        "$ne": ["$$item", "ANY_1"]

                    }]

                }

            }

            },
            view_user_physical_status:{

                $filter: {

                input: "$whocanview.fields.physical_status",

                as: "item",

                cond: {

                    $and: [{

                        "$ne": ["$$item", "ANY"]

                    },{

                        "$eq": ["$$item", "$loginuser_interest.physical_status"]

                    }, {

                        "$ne": ["$$item", "ANY_1"]

                    }]

                }

            }

            },
            view_user_expectation:{

                $filter: {

                input: "$whocanview.fields.expectation",

                as: "item",

                cond: {

                    $and: [{

                        "$ne": ["$$item", "ANY"]

                    },{

                        "$eq": ["$$item", "$loginuser_interest.expectation"]

                    }, {

                        "$ne": ["$$item", "ANY_1"]

                    }]

                }

            }

            },
            
            view_user_complexion:{

                $filter: {

                input: "$whocanview.fields.complexion",

                as: "item",

                cond: {

                    $and: [{

                        "$ne": ["$$item", "ANY"]

                    },{

                        "$eq": ["$$item", "$loginuser_interest.complexion"]

                    }, {

                        "$ne": ["$$item", "ANY_1"]

                    }]

                }

            }

            },
            
            view_user_body_type:{

                $filter: {

                input: "$whocanview.fields.body_type",

                as: "item",

                cond: {

                    $and: [{

                        "$ne": ["$$item", "ANY"]

                    },{

                        "$eq": ["$$item", "$loginuser_interest.body_type"]

                    }, {

                        "$ne": ["$$item", "ANY_1"]

                    }]

                }

            }

            }
             
      }   
        
    }
   
    ])
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      