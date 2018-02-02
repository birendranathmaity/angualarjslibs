db.getCollection('dbusers').aggregate([

    { $sort: { created_on: -1 } },

    //user common query information

    {
        $match: {

            "user_role": { "$nin": ["ADMIN", "MARRAGE_BUREAU"] },

            "user_status": { "$eq": "ACTIVE" },

            "age": { $lte: 50, $gte: 20 },

            "gender": { "$eq": "FEMALE" }



        }

    },

    //blocks//

    { $lookup: { from: "userblocks", localField: "user_id", foreignField: "block_user_id", as: "blocks" } },

    //user basic information///

    { $lookup: { from: "userbasicinfos", localField: "user_id", foreignField: "user_id", as: "basic" } },

    { "$unwind": { "path": "$basic", "preserveNullAndEmptyArrays": true } },

    //user location//

    { $lookup: { from: "countries", localField: "basic.country", foreignField: "id", as: "cn" } },

    { "$unwind": { "path": "$cn", "preserveNullAndEmptyArrays": true } },

    { $lookup: { from: "states", localField: "basic.state", foreignField: "id", as: "st" } },

    { "$unwind": { "path": "$st", "preserveNullAndEmptyArrays": true } },

    { $lookup: { from: "cities", localField: "basic.city", foreignField: "id", as: "ct" } },

    { "$unwind": { "path": "$ct", "preserveNullAndEmptyArrays": true } },

    //user photos//

    { $lookup: { from: "userphotos", localField: "user_id", foreignField: "user_id", as: "pics" } },

    //user interest//

    { $lookup: { from: "userintrests", localField: "user_id", foreignField: "user_id", as: "interest" } },

    { "$unwind": { "path": "$interest", "preserveNullAndEmptyArrays": true } },

    //user education//

    { $lookup: { from: "usereducations", localField: "user_id", foreignField: "user_id", as: "education" } },

    { "$unwind": { "path": "$education", "preserveNullAndEmptyArrays": true } },

    //user request//

    { $lookup: { from: "requests", localField: "user_id", foreignField: "request_user_id", as: "requests" } },

    //user settings//

    { $lookup: { from: "settings", localField: "user_id", foreignField: "user_id", as: "setting" } },

    { "$unwind": { "path": "$setting", "preserveNullAndEmptyArrays": true } },

    //user project main//

    {

        $project: {



            "_id": 1,

            "user_id": "$user_id",

            "user_status": "$user_status",

            "first_name": "$first_name",

            "last_name": "$last_name",

            "age": "$age",

            "height": "$interest.height",

            "country": "$basic.country",

            "state": "$basic.state",

            "city": "$basic.city",

            "maritualstatus": "$basic.maritialstatus",

            "mothertounge": "$basic.mothertounge",

            "religion": "$basic.religion",

            "caste": "$basic.caste",

            "heighestEducation": "$education.high_edu",

            "physical_status": "$interest.physical_status",

            "created_by": "$created_by",

            "created_on": "$created_on",

            "setting": "$setting",

            "pic": {

                $filter: {

                    input: "$pics",

                    as: "item",

                    cond: {

                        $and: [

                            { "$eq": ["$$item.photo_type", "PROFILE"] }

                        ]

                    }



                }



            },

            "isphotorequest": {

                $filter: {

                    input: "$requests",

                    as: "item",

                    cond: {

                        $and: [

                            { "$eq": ["$$item.user_id", "DB2272"] },

                            { "$eq": ["$$item.request_type", "PHOTO"] }

                        ]

                    }



                }



            },

            "is_contact_request": {

                $filter: {

                    input: "$requests",

                    as: "item",

                    cond: {

                        $and: [

                            { "$eq": ["$$item.user_id", "DB2272"] },

                            { "$eq": ["$$item.request_type", "CONTACT"] }



                        ]

                    }



                }



            },

            "is_message_request": {

                $filter: {

                    input: "$requests",

                    as: "item",

                    cond: {

                        $and: [

                            { "$eq": ["$$item.user_id", "DB2272"] },

                            { "$eq": ["$$item.request_type", "MESSAGE"] }





                        ]

                    }



                }



            },

            "is_contacted": {

                $filter: {

                    input: "$requests",

                    as: "item",

                    cond: {

                        $and: [

                            { "$eq": ["$$item.user_id", "DB2272"] },

                            { "$eq": ["$$item.request_type", "CONTACTED"] },

                        ]

                    }



                }



            },

            "is_viewed_profile": {

                $filter: {

                    input: "$requests",

                    as: "item",

                    cond: {

                        $and: [

                            { "$eq": ["$$item.user_id", "DB2272"] },

                            { "$eq": ["$$item.request_type", "VIEWED_PROFILE"] },

                        ]

                    }



                }



            },

            "is_liked_profile": {

                $filter: {

                    input: "$requests",

                    as: "item",

                    cond: {

                        $and: [

                            { "$eq": ["$$item.user_id", "DB2272"] },

                            { "$eq": ["$$item.request_type", "LIKED"] },

                        ]

                    }



                }



            },

            "block": {

                $filter: {

                    input: "$blocks",

                    as: "item",

                    cond: {





                        $and: [

                            { "$eq": ["$$item.user_id", "DB2272"] },

                            { "$eq": ["$$item.block_status", "BLOCK"] }



                        ]

                    }



                }



            },













        }



    },

    { "$unwind": { "path": "$block", "preserveNullAndEmptyArrays": true } },

    { $match: { "block": { $exists: false } } },

    { "$unwind": { "path": "$pic", "preserveNullAndEmptyArrays": true } },

    { "$unwind": { "path": "$isphotorequest", "preserveNullAndEmptyArrays": true } },

    { "$unwind": { "path": "$is_contact_request", "preserveNullAndEmptyArrays": true } },

    { "$unwind": { "path": "$is_message_request", "preserveNullAndEmptyArrays": true } },

    { "$unwind": { "path": "$is_contacted", "preserveNullAndEmptyArrays": true } },

    { "$unwind": { "path": "$is_viewed_profile", "preserveNullAndEmptyArrays": true } },

    { "$unwind": { "path": "$is_liked_profile", "preserveNullAndEmptyArrays": true } },

    {

        $project: {

            "isphotorequest": "$isphotorequest",

            "issetting": "$setting",

            "photo_btn": {

                "$cond": {



                    "if": {

                        "$or": [

                            {

                                "$eq": ["$setting", undefined]

                            },

                            {

                                "$eq": ["$setting.photo", true]

                            },

                            {

                                "$and": [

                                    { "$eq": ["$setting.photo", false] },

                                    { "$ne": ["$isphotorequest", undefined] },

                                    { "$eq": ["$isphotorequest.request_action", "ACCEPTED"] }]

                            }

                        ]



                    },

                    then: {

                        view_photo: true,

                        send_request: false,

                        alreadysent: false

                    },

                    else: {

                        "$cond": {



                            "if": {

                                "$and": [

                                    { "$eq": ["$setting.photo", false] },

                                    { "$eq": ["$isphotorequest", undefined] },

                                ]

                            },

                            then: {

                                view_photo: false,

                                send_request: true,

                                alreadysent: false

                            },

                            else: {

                                "$cond": {



                                    "if": {

                                        "$and": [

                                            { "$eq": ["$setting.photo", false] },

                                            { "$ne": ["$isphotorequest", undefined] },

                                            { "$or": [{ "$eq": ["$isphotorequest.request_action", undefined] }, { "$eq": ["$isphotorequest.request_action", "REJECTED"] }] },

                                        ]



                                    },

                                    then: {

                                        alreadysent: true,

                                        view_photo: false,

                                        send_request: false



                                    },

                                    else: "$noval"



                                }







                            }





                        }



                    }





                }

            },

            "contact_btn": {

                "$cond": {



                    "if": {

                        "$or": [

                            {

                                "$eq": ["$setting", undefined]

                            },

                            {

                                "$eq": ["$setting.contact", true]

                            },

                            {

                                "$and": [

                                    { "$eq": ["$setting.contact", false] },

                                    { "$ne": ["$is_contact_request", undefined] },

                                    { "$eq": ["$is_contact_request.request_action", "ACCEPTED"] }]

                            }

                        ]



                    },

                    then: {

                        view_contact: true,

                        send_request: false,

                        alreadysent: false

                    },

                    else: {

                        "$cond": {



                            "if": {

                                "$and": [

                                    { "$eq": ["$setting.contact", false] },

                                    { "$eq": ["$is_contact_request", undefined] },

                                ]

                            },

                            then: {

                                view_contact: false,

                                send_request: true,

                                alreadysent: false

                            },

                            else: {

                                "$cond": {



                                    "if": {

                                        "$and": [

                                            { "$eq": ["$setting.contact", false] },

                                            { "$ne": ["$is_contact_request", undefined] },

                                            { "$or": [{ "$eq": ["$is_contact_request.request_action", undefined] }, { "$eq": ["$is_contact_request.request_action", "REJECTED"] }] },

                                        ]



                                    },

                                    then: {

                                        alreadysent: true,

                                        view_contact: false,

                                        send_request: false



                                    },

                                    else: "$noval"



                                }







                            }





                        }



                    }





                }

            },

            "message_btn": {

                "$cond": {



                    "if": {

                        "$or": [

                            {

                                "$eq": ["$setting", undefined]

                            },

                            {

                                "$eq": ["$setting.message", true]

                            },

                            {

                                "$and": [

                                    { "$eq": ["$setting.message", false] },

                                    { "$ne": ["$is_message_request", undefined] },

                                    { "$eq": ["$is_message_request.request_action", "ACCEPTED"] }]

                            }

                        ]



                    },

                    then: {

                        send_msg: true,

                        send_request: false,

                        alreadysent: false

                    },

                    else: {

                        "$cond": {



                            "if": {

                                "$and": [

                                    { "$eq": ["$setting.message", false] },

                                    { "$eq": ["$is_message_request", undefined] },

                                ]

                            },

                            then: {

                                send_msg: false,

                                send_request: true,

                                alreadysent: false

                            },

                            else: {

                                "$cond": {



                                    "if": {

                                        "$and": [

                                            { "$eq": ["$setting.message", false] },

                                            { "$ne": ["$is_message_request", undefined] },

                                            { "$or": [{ "$eq": ["$is_message_request.request_action", undefined] }, { "$eq": ["$is_message_request.request_action", "REJECTED"] }] },

                                        ]



                                    },

                                    then: {

                                        alreadysent: true,

                                        send_msg: false,

                                        send_request: false



                                    },

                                    else: "$noval"



                                }







                            }





                        }



                    }





                }

            },

            "is_contacted": { $ifNull: ["$is_contacted.request_type", false] },

            "is_viewed_profile": { $ifNull: ["$is_viewed_profile.request_type", false] },

            "is_liked_profile": { $ifNull: ["$is_liked_profile.request_type", false] },

            "photo": {



                "$cond": {



                    "if": {



                        "$or": [

                            {

                                "$and": [

                                    { "$eq": ["$setting", undefined] },

                                    { "$ne": ["$pic", undefined] },

                                    { "$eq": ["$pic.photo_vr", true] }]

                            },

                            {

                                "$and": [

                                    { "$eq": ["$setting.photo", true] },

                                    { "$ne": ["$pic", undefined] },

                                    { "$eq": ["$pic.photo_vr", true] }]

                            },

                            {

                                "$and": [

                                    { "$eq": ["$setting.photo", false] },

                                    { "$ne": ["$pic", undefined] },

                                    { "$eq": ["$pic.photo_vr", true] },

                                    { "$ne": ["$isphotorequest", undefined] },

                                    { "$eq": ["$isphotorequest.request_action", "ACCEPTED"] }]

                            }

                        ]



                    },
                     "then": {

                        view: "CONFIRM",
                        displaypic: "$pic",



                    },
                    "else": {



                        "$cond": {



                            "if": {

                                "$or": [

                                    {

                                        "$and": [

                                            { "$eq": ["$setting.photo", false] },

                                            { "$ne": ["$pic", undefined] },

                                            { "$eq": ["$pic.photo_vr", true] },

                                            { "$ne": ["$isphotorequest", undefined] },

                                            { "$eq": ["$isphotorequest.request_action", "REJECTED"] }



                                        ]

                                    },

                                    {

                                        "$and": [

                                            { "$eq": ["$setting.photo", false] },

                                            { "$ne": ["$pic", undefined] },

                                            { "$eq": ["$pic.photo_vr", true] },

                                            { "$or": [{ "$eq": ["$isphotorequest", undefined] }, { "$eq": ["$isphotorequest.request_action", undefined] }, { "$eq": ["$isphotorequest.request_action", "REJECTED"] }] }



                                        ]

                                    }

                                ],

                            },

                            "then": {



                                view: "BLUR",

                                displaypic: {},



                            },

                            "else": {

                                "$cond": {

                                    "if": {

                                        "$or": [

                                            {

                                                "$and": [

                                                    { "$ne": ["$pic", undefined] },

                                                    { "$eq": ["$pic.photo_vr", false] }



                                                ]

                                            },



                                            { "$eq": ["$pic", undefined] },

                                        ]

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

            },



            "xyz": "$$ROOT"





        }
    }
])