exports.query = {
    matchResult: function (fields) {
        var search = fields;
        function checkReId(data, relId, success) {

            var count = 0;
            if (data.length > 0) {
                for (var key in data) {
                    count++;

                    if (data[key].religion === relId) {
                        success(true);
                        return;
                    }
                    if (count > data.length - 1) {

                        success(false);
                        return;
                    }

                }
            }
            else {
                success(false);
                return;
            }
        }
        function getRelCaste(search) {
            var relCaste = [];
            for (var rel in search.religion) {
                var relid = search.religion[rel]
                if (relid === "ANY") {
                    return relCaste;
                }
                checkReId(search.caste, relid, function (success) {

                    if (success) {
                        for (var cs in search.caste) {

                            var cst = search.caste[cs];
                            if (cst.religion === relid) {
                                var rel2 = {
                                    religion: { "$eq": relid },
                                    caste: { "$eq": cst.value },

                                };
                                relCaste.push(rel2);

                            }
                        }
                    }
                    else {
                        var rel1 = { religion: { "$eq": relid } };
                        relCaste.push(rel1);

                    }


                });

            }
            return relCaste;
        }
        function checkCountryIdExtis(data, countryId, success) {
            var count = 0;
            if (data.length > 0) {
                for (var key in data) {
                    count++;

                    if (data[key].country_id === countryId) {
                        success(true);
                        return;
                    }
                    if (count > data.length - 1) {

                        success(false);
                        return;
                    }

                }
            }
            else {
                success(false);
                return;
            }


        }
        function checkCityIdExtis(data, state_id, success) {
            var count = 0;
            if (data.length > 0) {
                for (var key in data) {
                    count++;

                    if (data[key].state_id === state_id) {
                        success(true);
                        return;
                    }
                    if (count > data.length - 1) {

                        success(false);
                        return;
                    }

                }
            }
            else {
                success(false);
                return;
            }


        }
        function getLocations(search) {
            var location = [];
            for (var Code in search.country) {
                var countryCode = search.country[Code]
                if (countryCode === "ANY") {
                    return location;
                }
                checkCountryIdExtis(search.state, countryCode, function (success) {

                    if (success) {
                        for (var st in search.state) {
                            var state = search.state[st];
                            checkCityIdExtis(search.city, state.id, function (is) {
                                if (is) {
                                    if (state.country_id === countryCode) {

                                        for (var ci in search.city) {
                                            var city = search.city[ci];
                                            if (city.country_id === countryCode && city.state_id === state.id) {
                                                var loc = {
                                                    country: { "$eq": countryCode },
                                                    state: { "$eq": state.id },
                                                    city: { "$eq": city.id }
                                                };
                                                location.push(loc);

                                            }

                                        }
                                    }
                                }
                                else {
                                    var loc2 = {
                                        country: { "$eq": countryCode },
                                        state: { "$eq": state.id },

                                    };
                                    location.push(loc2);

                                }

                            });

                        }
                    }
                    else {
                        var loc1 = { country: { "$eq": countryCode } };
                        location.push(loc1);
                    }



                });


            }

            return location;
        }

        var location = getLocations(search);
        var relcaste = getRelCaste(search);


        var match = {};
        var finalmatch = {};
        for (var key in search) {

            if (key === "age") {
                match["age"] = { $lte: search[key].to, $gte: search[key].from };


            }
            if (key === "height") {
                match["height"] = { $lte: search[key].to, $gte: search[key].from };


            }
            if (key === "country") {
                if (location.length > 0) {
                    match["$or"] = location;

                }

            }
            if (key === "religion") {
                if (relcaste.length > 0) {
                    match["$or"] = relcaste;

                }

            }
            if (key === "showprofile") {
                var arrTemp = search[key];

                if (arrTemp.length !== 0 &&
                    arrTemp[0] !== "ANY" &&
                    arrTemp[0] !== "ANY_1" &&
                    arrTemp[0] !== "ANY_2" &&
                    arrTemp[0] !== "ANY_3"
                ) {

                    for (var i = 0; i < arrTemp.length; i++) {
                        if (arrTemp[i] === "WITHPHOTO") {
                            finalmatch["photo.view"] = { "$eq": "CONFIRM" }
                        }
                        if (arrTemp[i] === "GOLDUSER") {
                            finalmatch["user_role"] = { "$eq": "GOLDUSER" }
                        }
                        if (arrTemp[i] === "VIEWED_PROFILE") {
                            finalmatch["is_viewed_profile"] = { "$eq": "VIEWED_PROFILE" }
                        }
                        if (arrTemp[i] === "LIKED") {
                            finalmatch["is_liked_profile"] = { "$eq": "LIKED" }
                        }
                        if (arrTemp[i] === "VISITOR") {
                            finalmatch["is_visitor_profile"] = { "$eq": "VIEWED_PROFILE" }
                        }
                    }

                  

                }

            }
            if (key === "dontshow") {
                var arrTempDont = search[key];

                if (arrTempDont.length !== 0 &&
                    arrTempDont[0] !== "ANY" &&
                    arrTempDont[0] !== "ANY_1" &&
                    arrTempDont[0] !== "ANY_2" &&
                    arrTempDont[0] !== "ANY_3"
                ) {

                    for (var i = 0; i < arrTempDont.length; i++) {
                        if (arrTempDont[i] === "VIEWED_PROFILE") {
                            finalmatch["is_viewed_profile"] = { "$ne": "VIEWED_PROFILE" }
                        }
                        if (arrTempDont[i] === "LIKED") {
                            finalmatch["is_liked_profile"] = { "$ne": "LIKED" }
                        }
                    }

                

                }

            }
            if (
                key != "user_id" &&
                key != "gender" &&
                key != "age" &&
                key != "height" &&
                key != "country" &&
                key != "state" &&
                key != "city" &&
                key != "religion" &&
                key != "caste" &&
                key != "showprofile" &&
                key != "dontshow" &&
                key != "updated_on" &&
                key !="blockprofile" &&
                key !="search_user_id" &&
                key != "__v" &&
                key != "created_on"

            ) {

                var arr = search[key];

                if (arr.length !== 0 &&
                    arr[0] !== "ANY" &&
                    arr[0] !== "ANY_1" &&
                    arr[0] !== "ANY_2" &&
                    arr[0] !== "ANY_3"
                ) {

                    match[key] = { $in: search[key] };

                }

            }

        }
        return {
            match:match,
            finalmatch:finalmatch

        };
    },
    albums: function () {
        return {

            $filter: {

                input: "$pics",

                as: "item",

                cond: {

                    $and: [{

                        "$eq": ["$$item.photo_type", "ALBUM"]

                    }]

                }

            }

        };
    },
    isPhotoUploaded: function () {
        return {

            $filter: {

                input: "$pics",

                as: "item",

                cond: {

                    $and: [{

                        "$eq": ["$$item.photo_type", "PROFILE"]

                    }]

                }

            }

        };
    },
    block: function (main_user_id) {
        return {

            $filter: {

                input: "$blocks",

                as: "item",

                cond: {

                    $and: [{

                        "$eq": ["$$item.user_id", main_user_id]

                    }, {

                        "$eq": ["$$item.block_status", "BLOCK"]

                    }]

                }

            }

        };

    },
    is_visitor_profile: function (main_user_id) {
        return {

            $filter: {

                input: "$visitor",

                as: "item",

                cond: {

                    $and: [{

                        "$eq": ["$$item.user_id", "$user_id"]

                    }, {
                        
                                                "$eq": ["$$item.request_user_id", main_user_id]
                        
                                            },{
                                                
                                                                        "$ne": ["$$item.request_status", "BLOCK"]
                                                
                                                                    },{

                        "$eq": ["$$item.request_type", "VIEWED_PROFILE"]

                    },]

                }

            }

        };

    },
    is_liked_profile: function (main_user_id) {
        return {

            $filter: {

                input: "$requests",

                as: "item",

                cond: {

                    $and: [{

                        "$eq": ["$$item.user_id", main_user_id]

                    }, {

                        "$eq": ["$$item.request_type", "LIKED"]

                    },]

                }

            }

        };

    },
    is_viewed_profile: function (main_user_id) {
        return {

            $filter: {

                input: "$requests",

                as: "item",

                cond: {

                    $and: [{

                        "$eq": ["$$item.user_id", main_user_id]

                    }, {

                        "$eq": ["$$item.request_type", "VIEWED_PROFILE"]

                    },]

                }

            }

        };
    },
    is_contacted: function (main_user_id) {
        return {

            $filter: {

                input: "$requests",

                as: "item",

                cond: {

                    $and: [{

                        "$eq": ["$$item.user_id", main_user_id]

                    }, {

                        "$eq": ["$$item.request_type", "CONTACTED"]

                    },]

                }

            }

        };
    },
    is_message_request: function (main_user_id) {
        return {

            $filter: {

                input: "$requests",

                as: "item",

                cond: {

                    $and: [{

                        "$eq": ["$$item.user_id", main_user_id]

                    }, {

                        "$eq": ["$$item.request_type", "MESSAGE"]

                    }]

                }

            }

        };
    },
    is_contact_request: function (main_user_id) {
        return {

            $filter: {

                input: "$requests",

                as: "item",

                cond: {

                    $and: [{

                        "$eq": ["$$item.user_id", main_user_id]

                    }, {

                        "$eq": ["$$item.request_type", "CONTACT"]

                    }]

                }

            }

        };
    },
    isphotorequest: function (main_user_id) {
        return {

            $filter: {

                input: "$requests",

                as: "item",

                cond: {

                    $and: [{

                        "$eq": ["$$item.user_id", main_user_id]

                    }, {

                        "$eq": ["$$item.request_type", "PHOTO"]

                    }]

                }

            }

        };
    },
    photo_request_btn: function () {
        return {

            "$cond": {

                "if": {

                    "$or": [{

                        "$eq": ["$setting", null]

                    }, {

                        "$eq": ["$setting.photo", true]

                    }, {

                        "$and": [{

                            "$eq": ["$setting.photo", false]

                        }, {

                            "$ne": ["$isphotorequest", null]

                        }, {

                            "$eq": ["$photo_request_action", "ACCEPTED"]

                        }]

                    }]

                },

                then: {

                    view_photo: true,

                    send_request: false,

                    decline: false,

                    alreadysent: false

                },

                else: {

                    "$cond": {

                        "if": {

                            "$and": [{

                                "$eq": ["$setting.photo", false]

                            }, {

                                "$eq": ["$isphotorequest", null]

                            },]

                        },

                        then: {

                            view_photo: false,

                            send_request: true,

                            decline: false,

                            alreadysent: false

                        },

                        else: {

                            "$cond": {

                                "if": {

                                    "$and": [{

                                        "$eq": ["$setting.photo", false]

                                    }, {

                                        "$ne": ["$isphotorequest", null]

                                    }, {

                                        "$or": [{

                                            "$eq": ["$photo_request_action", null]

                                        }, {

                                            "$eq": ["$photo_request_action", "PENDING"]

                                        }]

                                    },]

                                },

                                then: {

                                    alreadysent: true,

                                    view_photo: false,

                                    decline: false,

                                    send_request: false

                                },

                                else: {

                                    "$cond": {

                                        "if": {

                                            "$and": [{

                                                "$eq": ["$setting.photo", false]

                                            }, {

                                                "$ne": ["$isphotorequest", null]

                                            },

                                            {

                                                "$eq": ["$photo_request_action", "REJECTED"]

                                            }

                                            ]

                                        },

                                        then: {

                                            alreadysent: false,

                                            decline: true,

                                            send_msg: false,

                                            send_request: false

                                        },

                                        else: "$noval"

                                    }

                                }

                            }

                        }

                    }

                }

            }

        };
    },
    photo: function () {
        return {

            "$cond": {

                "if": {

                    "$or": [{

                        "$and": [{

                            "$eq": ["$setting", null]

                        }, {

                            "$ne": ["$pic", null]

                        }, {

                            "$eq": ["$pic.photo_vr", true]

                        }]

                    }, {

                        "$and": [{

                            "$eq": ["$setting.photo", true]

                        }, {

                            "$ne": ["$pic", null]

                        }, {

                            "$eq": ["$pic.photo_vr", true]

                        }]

                    }, {

                        "$and": [{

                            "$eq": ["$setting.photo", false]

                        }, {

                            "$ne": ["$pic", null]

                        }, {

                            "$eq": ["$pic.photo_vr", true]

                        }, {

                            "$ne": ["$isphotorequest", null]

                        }, {

                            "$eq": ["$photo_request_action", "ACCEPTED"]

                        }]

                    }]

                },

                "then": {

                    view: "CONFIRM",

                    displaypic: "$pic",

                },

                "else": {

                    "$cond": {

                        "if": {

                            "$or": [{

                                "$and": [{

                                    "$eq": ["$setting.photo", false]

                                }, {

                                    "$ne": ["$pic", null]

                                }, {

                                    "$eq": ["$pic.photo_vr", true]

                                }, {

                                    "$ne": ["$isphotorequest", null]

                                }, {

                                    "$eq": ["$photo_request_action", "REJECTED"]

                                }]

                            }, {

                                "$and": [{

                                    "$eq": ["$setting.photo", false]

                                }, {

                                    "$ne": ["$pic", null]

                                }, {

                                    "$eq": ["$pic.photo_vr", true]

                                }, {

                                    "$or": [{

                                        "$eq": ["$isphotorequest", null]

                                    }, {

                                        "$eq": ["$photo_request_action", null]

                                    }, {

                                        "$eq": ["$photo_request_action", "REJECTED"]

                                    }]

                                }]

                            }],

                        },

                        "then": {

                            view: "BLUR",

                            displaypic: {},

                        },

                        "else": {

                            "$cond": {

                                "if": {

                                    "$or": [{

                                        "$and": [{

                                            "$ne": ["$pic", null]

                                        }, {

                                            "$eq": ["$pic.photo_vr", false]

                                        }]

                                    }, {

                                        "$eq": ["$pic", null]

                                    },]

                                },

                                "then": {

                                    view: "EMPTY",

                                    displaypic: {},

                                },

                                else: "$noval"

                            }

                        }

                    }

                }

            }

        };
    },
    message_btn: function () {
        return {

            "$cond": {

                "if": {

                    "$or": [{

                        "$eq": ["$setting", null]

                    }, {

                        "$eq": ["$setting.message", true]

                    }, {

                        "$and": [{

                            "$eq": ["$setting.message", false]

                        }, {

                            "$ne": ["$is_message_request", null]

                        }, {

                            "$eq": ["$message_request_action", "ACCEPTED"]

                        }]

                    }]

                },

                then: {

                    send_msg: true,

                    send_request: false,

                    alreadysent: false,

                    decline: false

                },

                else: {

                    "$cond": {

                        "if": {

                            "$and": [{

                                "$eq": ["$setting.message", false]

                            }, {

                                "$eq": ["$is_message_request", null]

                            },]

                        },

                        then: {

                            send_msg: false,

                            send_request: true,

                            alreadysent: false,

                            decline: false

                        },

                        else: {

                            "$cond": {

                                "if": {

                                    "$and": [{

                                        "$eq": ["$setting.message", false]

                                    }, {

                                        "$ne": ["$is_message_request", null]

                                    }, {

                                        "$or": [{

                                            "$eq": ["$message_request_action", null]

                                        }, {

                                            "$eq": ["$message_request_action", "PENDING"]

                                        }]

                                    },]

                                },

                                then: {

                                    alreadysent: true,

                                    send_msg: false,

                                    decline: false,

                                    send_request: false

                                },

                                else: {

                                    "$cond": {

                                        "if": {

                                            "$and": [{

                                                "$eq": ["$setting.message", false]

                                            }, {

                                                "$ne": ["$is_message_request", null]

                                            },

                                            {

                                                "$eq": ["$message_request_action", "REJECTED"]

                                            }

                                            ]

                                        },

                                        then: {

                                            alreadysent: false,

                                            decline: true,

                                            send_msg: false,

                                            send_request: false

                                        },

                                        else: "$noval"

                                    }

                                }

                            }

                        }

                    }

                }

            }

        };
    },
    contact_btn: function () {
        return {

            "$cond": {

                "if": {

                    "$or": [{

                        "$eq": ["$setting", null]

                    }, {

                        "$eq": ["$setting.contact", true]

                    }, {

                        "$and": [{

                            "$eq": ["$setting.contact", false]

                        }, {

                            "$ne": ["$is_contact_request", null]

                        }, {

                            "$eq": ["$contact_request_action", "ACCEPTED"]

                        }]

                    }]

                },

                then: {

                    view_contact: true,
                    personal:"$user.phone_number",
                    family:"$user.userinfo.family.phone_number",
                    send_request: false,
                    alreadysent: false,

                    decline: false

                },

                else: {

                    "$cond": {

                        "if": {

                            "$and": [{

                                "$eq": ["$setting.contact", false]

                            }, {

                                "$eq": ["$is_contact_request", null]

                            },]

                        },

                        then: {

                            view_contact: false,

                            send_request: true,

                            alreadysent: false,

                            decline: false

                        },

                        else: {

                            "$cond": {

                                "if": {

                                    "$and": [{

                                        "$eq": ["$setting.contact", false]

                                    }, {

                                        "$ne": ["$is_contact_request", null]

                                    }, {

                                        "$or": [{

                                            "$eq": ["$contact_request_action", null]

                                        }, {

                                            "$eq": ["$contact_request_action", "PENDING"]

                                        }]

                                    },]

                                },

                                then: {

                                    alreadysent: true,

                                    view_contact: false,

                                    send_request: false,

                                    decline: false

                                },

                                else: {

                                    "$cond": {

                                        "if": {

                                            "$and": [{

                                                "$eq": ["$setting.contact", false]

                                            }, {

                                                "$ne": ["$is_contact_request", null]

                                            },

                                            {

                                                "$eq": ["$contact_request_action", "REJECTED"]

                                            }

                                            ]

                                        },

                                        then: {

                                            alreadysent: false,

                                            decline: true,

                                            view_contact: false,

                                            send_request: false

                                        },

                                        else: "$noval"

                                    }

                                }

                            }

                        }

                    }

                }

            }

        };
    },
    usersFields: function (field) {


        var user = [

            { $lookup: { from: "dbusers", localField: field, foreignField: "user_id", as: "user" } },
            { "$unwind": { "path": "$user", "preserveNullAndEmptyArrays": true } },
            { $lookup: { from: "userbasicinfos", localField: "user.user_id", foreignField: "user_id", as: "basicinfos" } },
            { $lookup: { from: "settings", localField: "user.user_id", foreignField: "user_id", as: "setting" } },
            { "$unwind": { "path": "$setting", "preserveNullAndEmptyArrays": true } },
            { "$unwind": { "path": "$basicinfos", "preserveNullAndEmptyArrays": true } },
            { $lookup: { from: "countries", localField: "basicinfos.country", foreignField: "id", as: "country" } },
            { $lookup: { from: "states", localField: "basicinfos.state", foreignField: "id", as: "state" } },
            { $lookup: { from: "cities", localField: "basicinfos.city", foreignField: "id", as: "city" } },
            { $lookup: { from: "userphotos", localField: "user.user_id", foreignField: "user_id", as: "pic" } },
            { $lookup: { from: "userintrests", localField: "user.user_id", foreignField: "user_id", as: "height" } },
            { "$unwind": { "path": "$height", "preserveNullAndEmptyArrays": true } },
            { "$unwind": { "path": "$country", "preserveNullAndEmptyArrays": true } },
            { "$unwind": { "path": "$state", "preserveNullAndEmptyArrays": true } },
            { "$unwind": { "path": "$city", "preserveNullAndEmptyArrays": true } },


        ];


        var j = user.join();
        var jj = JSON.stringify(user);
        var kk = jj.replace("[", "");
        var k = kk.replace("]", "");
        var k = k.replace(/\\/g, "")
        return k;













    }










}