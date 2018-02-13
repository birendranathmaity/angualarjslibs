var searchBy = require('./model/searchBy.model');
var User = require('./model/user.model');
var searchResultModel = require('./model/search.result.model');
var partnerPreModel = require('./model/partnerpre.model');
var commonQuery = require('./common.query');
var requestModel = require('./model/request.model');
exports.getPartnerPre = function (req, res) {
    partnerPreModel.findOne(req.body, { _id: 0 }, function (err, result) {

        res.json(result);
    });


};
exports.savePartnerPre = function (req, res) {
    partnerPreModel.findOne({
        user_id: req.body.user_id

    }, function (err, partner) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (partner) {
                req.body.updated_on = new Date();
                partnerPreModel.update({ user_id: req.body.user_id }, req.body, function (err, user) {

                    res.json({
                        success: true,
                        data: "partner updated"
                    });
                });
            } else {
                req.body.created_on = new Date();
                var partnerPre = new partnerPreModel(req.body);
                partnerPre.save(function (err, result) {

                    res.json({ success: true })
                });

            }
        }
    });
};
exports.getSavedSearchResults = function (req, res) {
   
    var aggregate = searchResultModel.aggregate([{
        
                $sort: {
        
                    created_on: -1
        
                }
        
            },{
                $match:{
                    user_id:{$eq:req.body.user_id}
                }
            }]);
            var options = {
                page: req.body.page,
                limit: req.body.limit
            };
            searchResultModel.aggregatePaginate(aggregate, options, function (err, results, pageCount, count) {
                if (err) {
                    res.json(err);
                    console.err(err)
                }
            else{
                var docs = {
                    searchResults: results,
                    pages: pageCount,
                    total: count
    
                };
    
                res.json(docs);

            }
            });

};
exports.saveSearchResult = function (req, res) {
    req.body.created_on=new Date();

    var ResultModel = new searchResultModel(req.body);
    ResultModel.save(function (err, result) {

        res.json({ success: true })
    });



};
exports.saveSearch = function (req, res) {
    searchBy.findOne({
        user_id: req.body.user_id

    }, function (err, search) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (search) {
                req.body.updated_on = new Date();
                searchBy.update({ user_id: req.body.user_id }, req.body, function (err, user) {

                    res.json({
                        success: true,
                        data: "search updated"
                    });
                });
            } else {
                req.body.created_on = new Date();
                var searchByModel = new searchBy(req.body);
                searchByModel.save(function (err, result) {

                    res.json({ success: true })
                });

            }
        }
    });
};
exports.getSearch = function (req, res) {
    searchBy.findOne(req.body, { _id: 0 }, function (err, result) {

        res.json(result);
    });


};
exports.getSearchResult = function (req, res) {

    var main_user_id = req.body.fields.user_id;
   
    var match=commonQuery.query.matchResult( req.body.fields);
    console.log(match)
    var aggregate = User.aggregate([{

        $sort: {

            created_on: -1

        }

    }, {

        $match: {

            "user_role": {

                "$nin": ["ADMIN", "MARRAGE_BUREAU"]

            },

            "user_status": {

                "$eq": "ACTIVE"

            },
           "gender": {

                "$eq": (req.body.gender=="MALE" ? "FEMALE": "MALE")

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
        
            },{
                
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

    },  {

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

        $project: {

            "_id": 1,
            "main_user_id":main_user_id,
            "user_id": "$user_id",
            "user_status": "$user_status",
            "first_name": "$first_name",
            "last_name": "$last_name",
            "age": "$age",
            "height": "$interest.height",
            "location_name":{
                country:"$cn.name",
                state:"$st.name",
                city:"$ct.name"
            },
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
            "pic": commonQuery.query.isPhotoUploaded(),
            "isphotorequest": commonQuery.query.isphotorequest(main_user_id),
            "is_contact_request": commonQuery.query.is_contact_request(main_user_id),
            "is_message_request": commonQuery.query.is_message_request(main_user_id),
            "is_contacted": commonQuery.query.is_contacted(main_user_id),
            "is_viewed_profile": commonQuery.query.is_viewed_profile(main_user_id),
            "is_liked_profile": commonQuery.query.is_liked_profile(main_user_id),
            "block": commonQuery.query.block(main_user_id),

        }

    }, {

        "$unwind": {

            "path": "$block",

            "preserveNullAndEmptyArrays": true

        }

    }, {

        $match: {

            "block": {

                $exists: false

            }

        }

    },{
        
                $match: match.match
        
            }, {

        "$unwind": {

            "path": "$pic",

            "preserveNullAndEmptyArrays": true

        }

    }, {

        "$unwind": {

            "path": "$isphotorequest",

            "preserveNullAndEmptyArrays": true

        }

    }, {

        "$unwind": {

            "path": "$is_contact_request",

            "preserveNullAndEmptyArrays": true

        }

    }, {

        "$unwind": {

            "path": "$is_message_request",

            "preserveNullAndEmptyArrays": true

        }

    }, {

        "$unwind": {

            "path": "$is_contacted",

            "preserveNullAndEmptyArrays": true

        }

    }, {

        "$unwind": {

            "path": "$is_viewed_profile",

            "preserveNullAndEmptyArrays": true

        }

    }, {

        "$unwind": {

            "path": "$is_liked_profile",

            "preserveNullAndEmptyArrays": true

        }

    },
    {
        
                $lookup: {
        
                    from: "requests",
        
                    localField: "main_user_id",
        
                    foreignField: "request_user_id",
        
                    as: "visitor"
        
                }
        
            },
    {

        $project: {
            is_visitor_profile:commonQuery.query.is_visitor_profile(main_user_id),
            isphotorequest: {

                $ifNull: ["$isphotorequest", null]

            },
            is_contact_request: {

                $ifNull: ["$is_contact_request", null]

            },
            is_message_request: {

                $ifNull: ["$is_message_request", null]

            },
            pic: {

                $ifNull: ["$pic", null]

            },


            setting: {

                $ifNull: ["$setting", null]

            },

            is_contacted: {

                $ifNull: ["$is_contacted.request_type", false]

            },

            is_viewed_profile: {

                $ifNull: ["$is_viewed_profile.request_type", false]

            },

            is_liked_profile: {

                $ifNull: ["$is_liked_profile.request_type", false]

            },
            photo_request_action: {
                $ifNull: ["$isphotorequest.request_action", null]
            },
            message_request_action: {
                $ifNull: ["$is_message_request.request_action", null]
            },
            contact_request_action: {
                $ifNull: ["$is_message_request.request_action", null]
            },
            visitor:"$visitor",
            "user": "$$ROOT"

        }

    },
    {
        
                "$unwind": {
        
                    "path": "$is_visitor_profile",
        
                    "preserveNullAndEmptyArrays": true
        
                }
        
            },
    {

        $project: {
             user_id:"$user.user_id",
             is_visitor_profile: {
                
                                $ifNull: ["$is_visitor_profile.request_type", false]
                
                            },
             location_name:"$user.location_name",
             "first_name": "$user.first_name",
             "last_name": "$user.last_name",
             "age": "$user.age",
             "height": "$user.height",
             "maritialstatus": "$user.maritialstatus",
             "mothertounge": "$user.mothertounge",
             "religion": "$user.religion",
             "caste": "$user.caste",
             "created_by": "$user.created_by",
             "physical_status": "$user.physical_status",
             "occupation": "$user.occupation",
             is_liked_profile:"$is_liked_profile",
             is_viewed_profile:"$is_viewed_profile",
             is_contacted:"$is_contacted",
             photo_btn: commonQuery.query.photo_request_btn(),
             photo: commonQuery.query.photo(),
             message_btn: commonQuery.query.message_btn(),
             contact_btn: commonQuery.query.contact_btn()
        }
    },
    {
        
                $match: match.finalmatch
        
            }

    ]);
    var options = {
        page: req.body.page,
        limit: req.body.limit
    };
    User.aggregatePaginate(aggregate, options, function (err, results, pageCount, count) {
        if (err) {
            res.json(err);
            console.err(err)
        }
        else {

            var docs = {
                users: results,
                pages: pageCount,
                total: count

            };

            res.json(docs);


        }
    });

};
// exports.getProfileVisitorsResult = function (req, res) {
    
//         var main_user_id = req.body.user_id;
       
//         var aggregate = requestModel.aggregate([{
    
//             $sort: {
    
//                 created_on: -1
    
//             }
    
//         }, {
            
//                     $match: {
//                         "request_user_id": {
                            
//                                        "$eq": main_user_id
                            
//                                         },
//                                         "request_type": {
                                            
//                                             "$eq": "VIEWED_PROFILE"
                                            
//                                          }
//                     }
                
                
//         },{
    
//             $match: {
    
//                 "user_role": {
    
//                     "$nin": ["ADMIN", "MARRAGE_BUREAU"]
    
//                 },
    
//                 "user_status": {
    
//                     "$eq": "ACTIVE"
    
//                 },
//                "gender": {
    
//                     "$eq": (req.body.gender=="MALE" ? "FEMALE": "MALE")
    
//                 }
    
//             }
    
//         }, {
    
//             $lookup: {
    
//                 from: "userblocks",
    
//                 localField: "user_id",
    
//                 foreignField: "block_user_id",
    
//                 as: "blocks"
    
//             }
    
//         }, {
    
//             $lookup: {
    
//                 from: "userbasicinfos",
    
//                 localField: "user_id",
    
//                 foreignField: "user_id",
    
//                 as: "basic"
    
//             }
    
//         }, {
    
//             "$unwind": {
    
//                 "path": "$basic",
    
//                 "preserveNullAndEmptyArrays": true
    
//             }
    
//         }, {
    
//             $lookup: {
    
//                 from: "countries",
    
//                 localField: "basic.country",
    
//                 foreignField: "id",
    
//                 as: "cn"
    
//             }
    
//         }, {
    
//             "$unwind": {
    
//                 "path": "$cn",
    
//                 "preserveNullAndEmptyArrays": true
    
//             }
    
//         }, {
    
//             $lookup: {
    
//                 from: "states",
    
//                 localField: "basic.state",
    
//                 foreignField: "id",
    
//                 as: "st"
    
//             }
    
//         }, {
    
//             "$unwind": {
    
//                 "path": "$st",
    
//                 "preserveNullAndEmptyArrays": true
    
//             }
    
//         }, {
    
//             $lookup: {
    
//                 from: "cities",
    
//                 localField: "basic.city",
    
//                 foreignField: "id",
    
//                 as: "ct"
    
//             }
    
//         }, {
    
//             "$unwind": {
    
//                 "path": "$ct",
    
//                 "preserveNullAndEmptyArrays": true
    
//             }
    
//         }, {
    
//             $lookup: {
    
//                 from: "userphotos",
    
//                 localField: "user_id",
    
//                 foreignField: "user_id",
    
//                 as: "pics"
    
//             }
    
//         }, {
    
//             $lookup: {
    
//                 from: "userintrests",
    
//                 localField: "user_id",
    
//                 foreignField: "user_id",
    
//                 as: "interest"
    
//             }
    
//         }, {
    
//             "$unwind": {
    
//                 "path": "$interest",
    
//                 "preserveNullAndEmptyArrays": true
    
//             }
    
//         }, {
    
//             $lookup: {
    
//                 from: "usereducations",
    
//                 localField: "user_id",
    
//                 foreignField: "user_id",
    
//                 as: "education"
    
//             }
    
//         }, {
    
//             "$unwind": {
    
//                 "path": "$education",
    
//                 "preserveNullAndEmptyArrays": true
    
//             }
    
//         }, {
            
//                     $lookup: {
            
//                         from: "userfamilies",
            
//                         localField: "user_id",
            
//                         foreignField: "user_id",
            
//                         as: "family"
            
//                     }
            
//                 },{
                    
//                             "$unwind": {
                    
//                                 "path": "$family",
                    
//                                 "preserveNullAndEmptyArrays": true
                    
//                             }
                    
//                         }, {
    
//             $lookup: {
    
//                 from: "requests",
    
//                 localField: "user_id",
    
//                 foreignField: "request_user_id",
    
//                 as: "requests"
    
//             }
    
//         }, {
    
//             $lookup: {
    
//                 from: "settings",
    
//                 localField: "user_id",
    
//                 foreignField: "user_id",
    
//                 as: "setting"
    
//             }
    
//         }, {
    
//             "$unwind": {
    
//                 "path": "$setting",
    
//                 "preserveNullAndEmptyArrays": true
    
//             }
    
//         }, {
            
//                     $lookup: {
            
//                         from: "usertokens",
            
//                         localField: "user_id",
            
//                         foreignField: "user_id",
            
//                         as: "lastlogin"
            
//                     }
            
//                 }, {
            
//                     "$unwind": {
            
//                         "path": "$lastlogin",
            
//                         "preserveNullAndEmptyArrays": true
            
//                     }
            
//                 }, 
//                 {
                    
//                             $sort: {
                    
//                                 "lastlogin.created_on": -1
                    
//                             }
                    
//                         },
//                 {
    
//             $project: {
    
//                 "_id": 1,
    
//                 "user_id": "$user_id",
//                 "user_status": "$user_status",
//                 "first_name": "$first_name",
//                 "last_name": "$last_name",
//                 "age": "$age",
//                 "height": "$interest.height",
//                 "location_name":{
//                     country:"$cn.name",
//                     state:"$st.name",
//                     city:"$ct.name"
//                 },
//                 "country": "$basic.country",
//                 "state": "$basic.state",
//                 "city": "$basic.city",
//                 "maritialstatus": "$basic.maritialstatus",
//                 "mothertounge": "$basic.mothertounge",
//                 "religion": "$basic.religion",
//                 "caste": "$basic.caste",
//                 "high_edu": "$education.high_edu",
//                 "occupation": "$education.occupation",
//                 "physical_status": "$interest.physical_status",
//                 body_type: "$interest.body_type",
//                 complexion: "$interest.complexion",
//                 expectation: "$interest.expectation",
//                 "horoscope": "$family.horoscope",
//                 "aincome": "$family.aincome",
//                 "created_by": "$created_by",
//                 "created_on": "$created_on",
//                 "setting": "$setting",
//                 "pic": commonQuery.query.isPhotoUploaded(),
//                 "isphotorequest": commonQuery.query.isphotorequest(main_user_id),
//                 "is_contact_request": commonQuery.query.is_contact_request(main_user_id),
//                 "is_message_request": commonQuery.query.is_message_request(main_user_id),
//                 "is_contacted": commonQuery.query.is_contacted(main_user_id),
//                 "is_viewed_profile": commonQuery.query.is_viewed_profile(main_user_id),
//                 "is_liked_profile": commonQuery.query.is_liked_profile(main_user_id),
//                 "block": commonQuery.query.block(main_user_id),
    
//             }
    
//         }, {
    
//             "$unwind": {
    
//                 "path": "$block",
    
//                 "preserveNullAndEmptyArrays": true
    
//             }
    
//         }, {
    
//             $match: {
    
//                 "block": {
    
//                     $exists: false
    
//                 }
    
//             }
    
//         },{
            
//                     $match: match.match
            
//                 }, {
    
//             "$unwind": {
    
//                 "path": "$pic",
    
//                 "preserveNullAndEmptyArrays": true
    
//             }
    
//         }, {
    
//             "$unwind": {
    
//                 "path": "$isphotorequest",
    
//                 "preserveNullAndEmptyArrays": true
    
//             }
    
//         }, {
    
//             "$unwind": {
    
//                 "path": "$is_contact_request",
    
//                 "preserveNullAndEmptyArrays": true
    
//             }
    
//         }, {
    
//             "$unwind": {
    
//                 "path": "$is_message_request",
    
//                 "preserveNullAndEmptyArrays": true
    
//             }
    
//         }, {
    
//             "$unwind": {
    
//                 "path": "$is_contacted",
    
//                 "preserveNullAndEmptyArrays": true
    
//             }
    
//         }, {
    
//             "$unwind": {
    
//                 "path": "$is_viewed_profile",
    
//                 "preserveNullAndEmptyArrays": true
    
//             }
    
//         }, {
    
//             "$unwind": {
    
//                 "path": "$is_liked_profile",
    
//                 "preserveNullAndEmptyArrays": true
    
//             }
    
//         }, {
    
//             $project: {
//                 isphotorequest: {
    
//                     $ifNull: ["$isphotorequest", null]
    
//                 },
//                 is_contact_request: {
    
//                     $ifNull: ["$is_contact_request", null]
    
//                 },
//                 is_message_request: {
    
//                     $ifNull: ["$is_message_request", null]
    
//                 },
//                 pic: {
    
//                     $ifNull: ["$pic", null]
    
//                 },
    
    
//                 setting: {
    
//                     $ifNull: ["$setting", null]
    
//                 },
    
//                 is_contacted: {
    
//                     $ifNull: ["$is_contacted.request_type", false]
    
//                 },
    
//                 is_viewed_profile: {
    
//                     $ifNull: ["$is_viewed_profile.request_type", false]
    
//                 },
    
//                 is_liked_profile: {
    
//                     $ifNull: ["$is_liked_profile.request_type", false]
    
//                 },
//                 photo_request_action: {
//                     $ifNull: ["$isphotorequest.request_action", null]
//                 },
//                 message_request_action: {
//                     $ifNull: ["$is_message_request.request_action", null]
//                 },
//                 contact_request_action: {
//                     $ifNull: ["$is_message_request.request_action", null]
//                 },
    
//                 "user": "$$ROOT"
    
//             }
    
//         },
       
//         {
    
//             $project: {
//                  user_id:"$user.user_id",
//                  location_name:"$user.location_name",
//                  "first_name": "$user.first_name",
//                  "last_name": "$user.last_name",
//                  "age": "$user.age",
//                  "height": "$user.height",
//                  "maritialstatus": "$user.maritialstatus",
//                  "mothertounge": "$user.mothertounge",
//                  "religion": "$user.religion",
//                  "caste": "$user.caste",
//                  "created_by": "$user.created_by",
//                  "physical_status": "$user.physical_status",
//                  "occupation": "$user.occupation",
//                  is_liked_profile:"$is_liked_profile",
//                  is_viewed_profile:"$is_viewed_profile",
//                  is_contacted:"$is_contacted",
//                  photo_btn: commonQuery.query.photo_request_btn(),
//                  photo: commonQuery.query.photo(),
//                  message_btn: commonQuery.query.message_btn(),
//                  contact_btn: commonQuery.query.contact_btn()
//             }
//         },
//         {
            
//                     $match: match.finalmatch
            
//                 }
    
//         ]);
//         var options = {
//             page: req.body.page,
//             limit: req.body.limit
//         };
//         User.aggregatePaginate(aggregate, options, function (err, results, pageCount, count) {
//             if (err) {
//                 res.json(err);
//                 console.err(err)
//             }
//             else {
    
//                 var docs = {
//                     users: results,
//                     pages: pageCount,
//                     total: count
    
//                 };
    
//                 res.json(docs);
    
    
//             }
//         });
    
//     };