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

    }, {
        $match: {
            user_id: { $eq: req.body.user_id }
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
        else {
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
    req.body.created_on = new Date();

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

    // request format for search
    //{ 
    //   gender:"",
    //  fields:{  
    //   user_id:""

    //}

    //}

    var main_user_id = req.body.fields.user_id;

    //  console.log(main_user_id)
    var blockprofile = false;
    var searchUserIdMatch = {};
    var userallinfo = false;
    if (req.body.fields.blockprofile) {
        blockprofile = true;

    }
    if (req.body.search_user_id) {
        userallinfo = true;
        searchUserIdMatch["user_id"] = {

            "$eq": req.body.search_user_id

        };

    }

    var match = commonQuery.query.matchResult(req.body.fields);

    var aggregate = User.aggregate([{

        $match: searchUserIdMatch


    }, {

        $match: {

            "user_role": {

                "$nin": ["ADMIN", "MARRAGE_BUREAU"]

            },

            "user_status": {

                "$eq": "ACTIVE"

            },
            "gender": {

                "$eq": (req.body.gender == "MALE" ? "FEMALE" : "MALE")

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
            "main_user_id": main_user_id,
            "user_id": "$user_id",
            "whocanview": "$whocanview",
            "online": "$lastlogin.online",
            "user_status": "$user_status",
            "first_name": "$first_name",
            "last_name": "$last_name",
            "gender": "$gender",
            "dob": "$dob",
            "age": "$age",
            "height": "$interest.height",
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
            "pic": commonQuery.query.isPhotoUploaded(),
            "isphotorequest": commonQuery.query.isphotorequest(main_user_id),
            "is_contact_request": commonQuery.query.is_contact_request(main_user_id),
            "is_message_request": commonQuery.query.is_message_request(main_user_id),
            "is_contacted": commonQuery.query.is_contacted(main_user_id),
            "is_viewed_profile": commonQuery.query.is_viewed_profile(main_user_id),
            "is_liked_profile": commonQuery.query.is_liked_profile(main_user_id),
            "block": commonQuery.query.block(main_user_id),
            userinfo: {
                "albums": commonQuery.query.albums(),
                "basic": "$basic",
                "education": "$education",
                "interest": "$interest",
                "family": "$family",
                "partner_pre": "$partner_pre"
            }



        }

    }, {

        "$unwind": {

            "path": "$block",

            "preserveNullAndEmptyArrays": true

        }

    }, {

        $match: {

            "block": {

                $exists: blockprofile

            }

        }

    }, {

        $match: match.match

    },
    {

        $lookup: {

            from: "userblocks",

            localField: "main_user_id",

            foreignField: "block_user_id",

            as: "userbyblock"

        }

    },


    {

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

    ////////////login user info//////////
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

    }, {

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
    //end login user info
    {

        $project: {
            is_visitor_profile: commonQuery.query.is_visitor_profile(main_user_id),
            is_user_by_block: commonQuery.query.isBlockByUser(main_user_id),
            is_blocked_profile: {

                $ifNull: ["$block.block_status", false]

            },
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
            is_contacted_date: {

                $ifNull: ["$is_contacted.created_on", false]

            },
            is_viewed_profile: {

                $ifNull: ["$is_viewed_profile.request_type", false]

            },
            is_viewed_profile_date: {

                $ifNull: ["$is_viewed_profile.created_on", false]

            },
            is_liked_profile: {

                $ifNull: ["$is_liked_profile.request_type", false]

            },
            is_liked_profile_date: {

                $ifNull: ["$is_liked_profile.created_on", false]

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
            visitor: "$visitor",
            user: "$$ROOT",
            login_user_age: "$loginuser.age",
            login_user_mothertounge: "$loginuser_basic.mothertounge",
            login_user_maritialstatus: "$loginuser_basic.maritialstatus",
            login_user_religion: "$loginuser_basic.religion",
            login_user_caste: "$loginuser_basic.caste",
            login_user_country: "$loginuser_basic.country",
            login_user_state: "$loginuser_basic.state",
            login_user_city: "$loginuser_basic.city",

            login_user_high_edu: "$loginuser_education.high_edu",
            login_user_occupation: "$loginuser_education.occupation",

            login_user_height: "$loginuser_interest.height",
            login_user_physical_status: "$loginuser_interest.physical_status",
            login_user_complexion: "$loginuser_interest.complexion",
            login_user_body_type: "$loginuser_interest.body_type",
            login_user_expectation: "$loginuser_interest.expectation",
            isWhocanviewon: {

                $ifNull: ["$whocanview", null]

            },
            view_user_age: {

                $ifNull: ["$whocanview.fields.age", null]

            },
            view_user_height: {

                $ifNull: ["$whocanview.fields.height", null]

            },

            view_user_maritialstatus: {

                $filter: {

                    input: "$whocanview.fields.maritialstatus",

                    as: "item",

                    cond: {

                        $and: [{

                            "$ne": ["$$item", "ANY"]

                        }, {

                            "$ne": ["$$item", "ANY_1"]

                        }]

                    }

                }

            },
            view_user_mothertounge: {
                $filter: {

                    input: "$whocanview.fields.mothertounge",

                    as: "item",

                    cond: {

                        $and: [{

                            "$ne": ["$$item", "ANY"]

                        }]

                    }

                }



            },
            view_user_religion: {
                $filter: {

                    input: "$whocanview.fields.religion",

                    as: "item",

                    cond: {

                        $and: [{

                            "$ne": ["$$item", "ANY"]

                        }, {

                            "$ne": ["$$item", "ANY_1"]

                        }]

                    }

                }



            },
            view_user_caste: {

                "$map": {
                    "input": {
                        "$filter": {
                            "input": "$whocanview.fields.caste",
                            "as": "item",
                            "cond": {

                                $and: [{

                                    "$ne": ["$$item.value", "ANY"]

                                }, {

                                    "$ne": ["$$item.value", "ANY_1"]

                                }]

                            }
                        }
                    },
                    "as": "cst",
                    "in": "$$cst.value"
                }


            }, view_user_country: {
                $filter: {

                    input: "$whocanview.fields.country",

                    as: "item",

                    cond: {

                        $and: [{

                            "$ne": ["$$item.id", "ANY"]

                        }]

                    }

                }



            }, view_user_state: {
                "$map": {
                    "input": {
                        "$filter": {
                            "input": "$whocanview.fields.state",
                            "as": "item",
                            "cond": {

                                $and: [{

                                    "$ne": ["$$item.id", "ANY"]

                                }, {

                                    "$ne": ["$$item.id", "ANY_1"]

                                }]

                            }
                        }
                    },
                    "as": "st",
                    "in": "$$st.id"
                }



            }, view_user_city: {
                "$map": {
                    "input": {
                        "$filter": {
                            "input": "$whocanview.fields.city",
                            "as": "item",
                            "cond": {

                                $and: [{

                                    "$ne": ["$$item.id", "ANY"]

                                }, {

                                    "$ne": ["$$item.id", "ANY_1"]

                                }]

                            }
                        }
                    },
                    "as": "ct",
                    "in": "$$ct.id"
                }



            },
            view_user_high_edu: {

                $filter: {

                    input: "$whocanview.fields.high_edu",

                    as: "item",

                    cond: {

                        $and: [{

                            "$ne": ["$$item", "ANY"]

                        }, {

                            "$ne": ["$$item", "ANY_1"]

                        }]

                    }

                }

            }, view_user_occupation: {

                $filter: {

                    input: "$whocanview.fields.occupation",

                    as: "item",

                    cond: {

                        $and: [{

                            "$ne": ["$$item", "ANY"]

                        }, {

                            "$ne": ["$$item", "ANY_1"]

                        }]

                    }

                }

            },
            view_user_physical_status: {

                $filter: {

                    input: "$whocanview.fields.physical_status",

                    as: "item",

                    cond: {

                        $and: [{

                            "$ne": ["$$item", "ANY"]

                        }, {

                            "$ne": ["$$item", "ANY_1"]

                        }]

                    }

                }

            },
            view_user_expectation: {

                $filter: {

                    input: "$whocanview.fields.expectation",

                    as: "item",

                    cond: {

                        $and: [{

                            "$ne": ["$$item", "ANY"]

                        }, {

                            "$ne": ["$$item", "ANY_1"]

                        }]

                    }

                }

            },

            view_user_complexion: {

                $filter: {

                    input: "$whocanview.fields.complexion",

                    as: "item",

                    cond: {

                        $and: [{

                            "$ne": ["$$item", "ANY"]

                        }, {

                            "$ne": ["$$item", "ANY_1"]

                        }]

                    }

                }

            },

            view_user_body_type: {

                $filter: {

                    input: "$whocanview.fields.body_type",

                    as: "item",

                    cond: {

                        $and: [{

                            "$ne": ["$$item", "ANY"]

                        }, {

                            "$ne": ["$$item", "ANY_1"]

                        }]

                    }

                }

            }

        }

    },
    {

        "$unwind": {

            "path": "$is_visitor_profile",

            "preserveNullAndEmptyArrays": true

        }

    },
    {

        "$unwind": {

            "path": "$is_user_by_block",

            "preserveNullAndEmptyArrays": true

        }

    },

    {

        $project: {
            user_id: "$user.user_id",
            online: "$user.online",
            is_visitor_profile: {

                $ifNull: ["$is_visitor_profile.request_type", false]

            },
            is_visitor_profile_date: {

                $ifNull: ["$is_visitor_profile.created_on", false]

            },
            is_user_by_block: {

                $ifNull: ["$is_user_by_block.block_status", false]

            },
            is_blocked_profile: "$is_blocked_profile",
            location_name: "$user.location_name",
            "first_name": "$user.first_name",
            "last_name": "$user.last_name",
            "gender": "$user.gender",
            "age": "$user.age",
            dob: "$user.dob",
            "height": "$user.height",
            "maritialstatus": "$user.maritialstatus",
            "mothertounge": "$user.mothertounge",
            "religion": "$user.religion",
            "caste": "$user.caste",
            "created_by": "$user.created_by",
            "physical_status": "$user.physical_status",
            "occupation": "$user.occupation",
            "high_edu": "$user.high_edu",
            is_liked_profile: "$is_liked_profile",
            is_liked_profile_date: "$is_liked_profile_date",
            is_viewed_profile: "$is_viewed_profile",
            is_viewed_profile_date: "$is_viewed_profile_date",
            is_contacted: "$is_contacted",
            is_contacted_date: "$is_contacted_date",
            photo_btn: commonQuery.query.photo_request_btn(),
            pic: commonQuery.query.photo(),
            message_btn: commonQuery.query.message_btn(),
            contact_btn: commonQuery.query.contact_btn(),
            userinfo: (userallinfo ? "$user.userinfo" : null),
            view_user_age: {
                "$cond": {
                    if: {
                        $or: [{

                            "$eq": ["$isWhocanviewon", null]

                        },  {

                            "$eq": ["$login_user_age", null]

                        }, 
                        {
                            $and:[{
                                $lte:["$login_user_age","$view_user_age.to"]
                                  },
                                  {
                                    $gte:["$login_user_age","$view_user_age.from"]
                                     }]
                        }
                       ]
                    },
                    then: "VISIBLE",
                    else: "INVISIBLE"
                }


            },
            view_user_height: {
                "$cond": {
                    if: {
                        $or: [{

                            "$eq": ["$isWhocanviewon", null]

                        },  {

                            "$eq": ["$login_user_height", null]

                        }, 
                        {
                            $and:[{
                                $lte:["$login_user_height","$view_user_height.to"]
                                  },
                                  {
                                    $gte:["$login_user_height","$view_user_height.from"]
                                     }]
                        }
                       ]
                    },
                    then: "VISIBLE",
                    else: "INVISIBLE"
                }


            },
            view_user_religion:
            {
                "$cond": {
                    if: {
                        $or: [{

                            "$eq": ["$isWhocanviewon", null]

                        }, {

                            "$eq": ["$view_user_religion", []]

                        }, {

                            "$eq": ["$view_user_religion", null]

                        }, {

                            "$in": ["$login_user_religion", "$view_user_religion"]

                        }]
                    },
                    then: "VISIBLE",
                    else: "INVISIBLE"
                }


            },
            view_user_caste:
            {
                "$cond": {
                    if: {
                        $or: [{

                            "$eq": ["$isWhocanviewon", null]

                        }, {

                            "$eq": ["$view_user_caste", []]

                        }, {

                            "$eq": ["$view_user_caste", null]

                        }, {

                            "$in": ["$login_user_caste", "$view_user_caste"]

                        }]
                    },
                    then: "VISIBLE",
                    else: "INVISIBLE"
                }


            },
            view_user_country:
            {
                "$cond": {
                    if: {
                        $or: [{

                            "$eq": ["$isWhocanviewon", null]

                        }, {

                            "$eq": ["$view_user_country", []]

                        }, {

                            "$eq": ["$view_user_country", null]

                        }, {

                            "$in": ["$login_user_country", "$view_user_country"]

                        }]
                    },
                    then: "VISIBLE",
                    else: "INVISIBLE"
                }


            }, view_user_state:
            {
                "$cond": {
                    if: {
                        $or: [{

                            "$eq": ["$isWhocanviewon", null]

                        }, {

                            "$eq": ["$view_user_state", []]

                        }, {

                            "$eq": ["$view_user_state", null]

                        }, {

                            "$in": ["$login_user_state", "$view_user_state"]

                        }]
                    },
                    then: "VISIBLE",
                    else: "INVISIBLE"
                }


            },
            view_user_city: {
                "$cond": {
                    if: {
                        $or: [{

                            "$eq": ["$isWhocanviewon", null]

                        }, {

                            "$eq": ["$view_user_city", []]

                        }, {

                            "$eq": ["$view_user_city", null]

                        }, {

                            "$in": ["$login_user_city", "$view_user_city"]

                        }]
                    },
                    then: "VISIBLE",
                    else: "INVISIBLE"
                }


            },
            view_user_maritialstatus:
            {
                "$cond": {
                    if: {
                        $or: [{

                            "$eq": ["$isWhocanviewon", null]

                        }, {

                            "$eq": ["$view_user_maritialstatus", []]

                        }, {

                            "$eq": ["$view_user_maritialstatus", null]

                        }, {

                            "$in": ["$login_user_maritialstatus", "$view_user_maritialstatus"]

                        }]
                    },
                    then: "VISIBLE",
                    else: "INVISIBLE"
                }


            },

            view_user_mothertounge:
            {
                "$cond": {
                    if: {
                        $or: [{

                            "$eq": ["$isWhocanviewon", null]

                        }, {

                            "$eq": ["$view_user_mothertounge", []]

                        }, {

                            "$eq": ["$view_user_mothertounge", null]

                        }, {

                            "$in": ["$login_user_mothertounge", "$view_user_mothertounge"]

                        }]
                    },
                    then: "VISIBLE",
                    else: "INTVISIBLE"
                }


            },
            view_user_high_edu:
            {
                "$cond": {
                    if: {
                        $or: [{

                            "$eq": ["$isWhocanviewon", null]

                        }, {

                            "$eq": ["$view_user_high_edu", []]

                        }, {

                            "$eq": ["$view_user_high_edu", null]

                        }, {

                            "$in": ["$login_user_high_edu", "$view_user_high_edu"]

                        }]
                    },
                    then: "VISIBLE",
                    else: "INTVISIBLE"
                }


            },
            view_user_occupation:
            {
                "$cond": {
                    if: {
                        $or: [{

                            "$eq": ["$isWhocanviewon", null]

                        }, {

                            "$eq": ["$view_user_occupation", []]

                        }, {

                            "$eq": ["$view_user_occupation", null]

                        }, {

                            "$in": ["$login_user_occupation", "$view_user_occupation"]

                        }]
                    },
                    then: "VISIBLE",
                    else: "INTVISIBLE"
                }


            },
            view_user_physical_status:
            {
                "$cond": {
                    if: {
                        $or: [{

                            "$eq": ["$isWhocanviewon", null]

                        }, {

                            "$eq": ["$view_user_physical_status", []]

                        }, {

                            "$eq": ["$view_user_physical_status", null]

                        }, {

                            "$in": ["$login_user_physical_status", "$view_user_physical_status"]

                        }]
                    },
                    then: "VISIBLE",
                    else: "INTVISIBLE"
                }


            },
            view_user_body_type:
            {
                "$cond": {
                    if: {
                        $or: [{

                            "$eq": ["$isWhocanviewon", null]

                        }, {

                            "$eq": ["$view_user_body_type", []]

                        }, {

                            "$eq": ["$view_user_body_type", null]

                        }, {

                            "$in": ["$login_user_body_type", "$view_user_body_type"]

                        }]
                    },
                    then: "VISIBLE",
                    else: "INTVISIBLE"
                }


            },
            view_user_complexion:
            {
                "$cond": {
                    if: {
                        $or: [{

                            "$eq": ["$isWhocanviewon", null]

                        }, {

                            "$eq": ["$view_user_complexion", []]

                        }, {

                            "$eq": ["$view_user_complexion", null]

                        }, {

                            "$in": ["$login_user_complexion", "$view_user_complexion"]

                        }]
                    },
                    then: "VISIBLE",
                    else: "INTVISIBLE"
                }


            },
            view_user_expectation:
            {
                "$cond": {
                    if: {
                        $or: [{

                            "$eq": ["$isWhocanviewon", null]

                        }, {

                            "$eq": ["$view_user_expectation", []]

                        }, {

                            "$eq": ["$view_user_expectation", null]

                        }, {

                            "$in": ["$login_user_expectation", "$view_user_expectation"]

                        }]
                    },
                    then: "VISIBLE",
                    else: "INTVISIBLE"
                }


            }

        }
    },
    {
        $match:{
            view_user_age: {"$eq": "VISIBLE"},
            view_user_height: {"$eq": "VISIBLE"},
            view_user_religion: {"$eq": "VISIBLE"},
            view_user_caste: {"$eq": "VISIBLE"},
            view_user_country: {"$eq": "VISIBLE"},
            view_user_state: {"$eq": "VISIBLE"},
            view_user_city: {"$eq": "VISIBLE"},
            view_user_maritialstatus: {"$eq": "VISIBLE"},
            view_user_mothertounge: {"$eq": "VISIBLE"},
            view_user_high_edu: {"$eq": "VISIBLE"},
            view_user_occupation: {"$eq": "VISIBLE"},
            view_user_physical_status: {"$eq": "VISIBLE"},
            view_user_body_type: {"$eq": "VISIBLE"},
            view_user_complexion: {"$eq": "VISIBLE"},
            view_user_expectation: {"$eq": "VISIBLE"}

        }
    },
    {

        $match: match.finalmatch

    }
    ]);
    var options = {
        page: req.body.page,
        limit: req.body.limit,
        allowDiskUse: true
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
exports.getRequestsCount = function (req, res) {

    var user_id = req.body.user_id;

    requestModel.aggregate([
        {
            $match: {
                created_on: {
                    $gte: new Date(req.body.from),
                    $lte: new Date(req.body.to)
                }
            }

        },

        {
            "$project": {
                "user_id": "$user_id",
                request_type: "$request_type",
                request_user_id: "$request_user_id",

                "customfield": {
                    "$cond": {
                        "if": {
                            "$and": [
                                { "$eq": ["$user_id", req.body.user_id] },
                                {

                                    "$or": [
                                        { "$eq": ["$request_type", "VIEWED_PROFILE"] },
                                        { "$eq": ["$request_type", "LIKED"] },
                                        { "$eq": ["$request_type", "CONTACTED"] }
                                    ]
                                }


                            ]
                        },
                        "then": {

                            id: "$request_user_id"


                        },
                        "else": {

                            "$cond": {

                                "if": {

                                    "$and": [
                                        { "$eq": ["$request_user_id", req.body.user_id] },
                                        {

                                            "$or": [
                                                { "$eq": ["$request_type", "VIEWED_PROFILE"] },
                                                { "$eq": ["$request_type", "LIKED"] },
                                                { "$eq": ["$request_type", "CONTACTED"] }
                                            ]
                                        }


                                    ]

                                },

                                "then": {

                                    id: "$user_id"

                                },

                                else: "$noval"

                            }
                        }

                    }
                }

            }
        },
        {

            $lookup: {

                from: "userblocks",

                localField: "customfield.id",

                foreignField: "block_user_id",

                as: "blocks"

            }

        },
        {
            "$project": {
                "block": commonQuery.query.block(user_id),
                "request": "$$ROOT"

            }

        },

        {

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

        },

        {
            "$group": {
                "_id": null,
                "VIEWED_PROFILE": {
                    "$sum": {
                        "$cond": [

                            {
                                "$and": [
                                    { "$eq": ["$request.user_id", user_id] },
                                    { "$eq": ["$request.request_type", "VIEWED_PROFILE"] }
                                ]


                            }

                            , 1, 0]
                    }
                },
                "PROFILE_VISITOR": {
                    "$sum": {
                        "$cond": [

                            {
                                "$and": [
                                    { "$eq": ["$request.request_user_id", user_id] },
                                    { "$eq": ["$request.request_type", "VIEWED_PROFILE"] }

                                ]


                            }

                            , 1, 0]
                    }
                },
                "LIKED_PROFILES": {
                    "$sum": {
                        "$cond": [

                            {
                                "$and": [
                                    { "$eq": ["$request.user_id", user_id] },
                                    { "$eq": ["$request.request_type", "LIKED"] }

                                ]


                            }

                            , 1, 0]
                    }
                },
                "RECENTLY_CONTACTED": {
                    "$sum": {
                        "$cond": [

                            {
                                "$and": [
                                    { "$eq": ["$request.user_id", user_id] },
                                    { "$eq": ["$request.request_type", "CONTACTED"] }

                                ]


                            }

                            , 1, 0]
                    }
                }

            }
        }]).allowDiskUse(true).exec(function (error, results) {


            res.json(results);
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