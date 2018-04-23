var User = require('./../model/user.model');
var PhotoModel = require('./../model/user.photo.model');
exports.getallActiveUsersR = function (req, res) {


    //  User.find({},null,{sort: {created_on: -1 }},function(err,result){
    // res.json({
    // users:result

    // });

    //  });
    var aggregate = User.aggregate(
        [
            { "$sort": { created_on: -1 } },
            { $match: { user_status: "ACTIVE" } },
            {
                "$project": {

                    "user_id": "$user_id",
                    "first_name": "$first_name",
                    "last_name": "$last_name",
                    "age": "$age",
                    "created_on": "$created_on"
                }
            },
            {
                $lookup:
                {
                    from: "userintrests",
                    localField: "user_id",
                    foreignField: "user_id",
                    as: "height"
                }
            },
            {
                $lookup:
                {
                    from: "userphotos",
                    localField: "user_id",
                    foreignField: "user_id",
                    as: "pic"
                }
            },

            //    { 
            //                      $match: { 
            //                          "pic.photo_type": {'$exists':false},

            //                           "pic.photo_type": 'PROFILE',
            //                          $nor: [
            //                               {"pic.photo_type": "ALBUM"}


            //                              ]
            //                      },
            //                    },
            // { 
            //   $filter: 
            //   { 
            //     input: "$pic", 
            //     as: "p", 
            //     cond: { $eq: [ "$$p.photo_type", "PROFILE" ] } 
            //   } 
            // },
            //    { "$unwind": "$pic" },
            //     // This actually "filters" the array content
            //     { "$match": { "pic.photo_type": "PROFILE" } },
            //    {
            //   $project: 
            //   {

            //     pic: 
            //     { 
            //       $filter: 
            //       { 
            //         input: "$pic", 
            //         as: "p", 
            //         cond: { $eq: [ "$$p.photo_type", "PROFILE" ] } 
            //       } 
            //     } 
            //   } 
            // },
            {
                $unwind: "$height"
            },
            { $addFields: { "height": "$height.height" } }

        ]
    );
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
                docs: results,
                pages: pageCount,
                total: count

            };
            res.json(docs);
        }
    });

    // User.paginate({}, options, function(err, result) {
    //   // result.docs
    //   // result.total
    //   // result.limit - 10
    //   // result.page - 3
    //   // result.pages

    //   res.json(result);
    // });

};


function UserProfileUpdate(userId, update, res) {
    User.findOneAndUpdate({
        user_id: userId
    }, update, {
            new: true
        }, function (err, user) {

            res.json({
                success: true,
                user: user

            });
            // if(user.created_by==="ADMIN"){
            //         res.json({
            //         success: true,
            //         msg: ""
            //     });
            // }
            // else{
            //    createToken(res, user);
            // }


        });
};
exports.adminAccept = function (req, res) {

    User.update(
        { user_id: { $in: req.body.user_ids } },

        { $set: { user_status: "ACTIVE" } },
        { multi: true },

        function (err, docs) {
            res.json({
                success: true,
                users: docs

            });
        });

};
exports.getallusersgroupbyphotostatus = function (req, res) {

    var aggregate = User.aggregate([
        { $sort: { created_on: -1 } },

        { $match: { user_status: "ACTIVE" } },

        { $lookup: { from: "userbasicinfos", localField: "user_id", foreignField: "user_id", as: "basicinfos" } },

        { "$unwind": { "path": "$basicinfos", "preserveNullAndEmptyArrays": true } },



        { $lookup: { from: "countries", localField: "basicinfos.country", foreignField: "id", as: "country" } },

        { $lookup: { from: "states", localField: "basicinfos.state", foreignField: "id", as: "state" } },

        { $lookup: { from: "cities", localField: "basicinfos.city", foreignField: "id", as: "city" } },

        { $lookup: { from: "userphotos", localField: "user_id", foreignField: "user_id", as: "pic" } },
        { $lookup: { from: "userintrests", localField: "user_id", foreignField: "user_id", as: "height" } },


        { "$unwind": { "path": "$height", "preserveNullAndEmptyArrays": true } },
        { "$unwind": { "path": "$pic", "preserveNullAndEmptyArrays": true } },

        { "$unwind": { "path": "$country", "preserveNullAndEmptyArrays": true } },

        { "$unwind": { "path": "$state", "preserveNullAndEmptyArrays": true } },

        { "$unwind": { "path": "$city", "preserveNullAndEmptyArrays": true } },
        {
            "$match": {
                "pic.photo_type": { "$eq": "PROFILE" },
                "pic.photo_vr_msg": { "$eq": req.body.searchtype },
                "pic.photo_vr": { "$eq": req.body.vr }
            }
        },




        {
            $project: {

                "_id": 1,

                "user_id": "$user_id",

                "first_name": "$first_name",

                "last_name": "$last_name",

                "age": "$age",

                "height": "$height.height",

                "country": "$country.name",

                "state": "$state.name",

                "city": "$city.name",

                "pic": "$pic",
                "created_on": "$created_on"

            }
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
                docs: results,
                pages: pageCount,
                total: count

            };
            res.json(docs);
        }
    });


};
exports.getallusersgroupbyphotostatus_count = function (req, res) {


    PhotoModel.aggregate([
        { "$match": { "photo_type": { "$eq": "PROFILE" } } },


        // Count all occurrences
        {
            "$group": {
                "_id": "$photo_vr_msg"
                ,


                "count": { "$sum": 1 }

            }
        }

        //     { "$unwind": "$matches" },
        //     {$lookup:{from: "dbusers",localField: "$$ROOT.user_id",foreignField: "user_id",as: "user"}},
        // 



    ], function (error, results) {


        res.json(results);
    });

};
exports.pendingemailvrusers = function (req, res) {

    var aggregate = User.aggregate([



        { $sort: { created_on: -1 } },

        {
            $match: {
                user_status: "ACTIVE",
                email_vr: false
            }
        },



        { $lookup: { from: "userbasicinfos", localField: "user_id", foreignField: "user_id", as: "basicinfos" } },


        { "$unwind": { "path": "$basicinfos", "preserveNullAndEmptyArrays": true } },


        { $lookup: { from: "countries", localField: "basicinfos.country", foreignField: "id", as: "country" } },

        { $lookup: { from: "states", localField: "basicinfos.state", foreignField: "id", as: "state" } },

        { $lookup: { from: "cities", localField: "basicinfos.city", foreignField: "id", as: "city" } },

        { $lookup: { from: "userphotos", localField: "user_id", foreignField: "user_id", as: "pic" } },
        { $lookup: { from: "userintrests", localField: "user_id", foreignField: "user_id", as: "height" } },


        { "$unwind": { "path": "$height", "preserveNullAndEmptyArrays": true } },
        { "$unwind": { "path": "$pic", "preserveNullAndEmptyArrays": true } },

        { "$unwind": { "path": "$country", "preserveNullAndEmptyArrays": true } },

        { "$unwind": { "path": "$state", "preserveNullAndEmptyArrays": true } },

        { "$unwind": { "path": "$city", "preserveNullAndEmptyArrays": true } },


        {
            $project: {

                "_id": 1,

                "user_id": "$user_id",

                "first_name": "$first_name",

                "last_name": "$last_name",

                "age": "$age",

                "height": "$height.height",

                "country": "$country.name",

                "state": "$state.name",

                "city": "$city.name",

                "pic": "$pic",
                "created_on": "$created_on"

            }
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
                docs: results,
                pages: pageCount,
                total: count

            };
            res.json(docs);
        }
    });

};
exports.pendingemailvrusers_count = function (req, res) {


    User.aggregate([
        {
            "$match": {
                "user_status": { "$eq": "ACTIVE" }

            }
        },


        // Count all occurrences
        {
            "$group": {
                "_id": "$email_vr"
                ,


                "count": { "$sum": 1 }

            }
        }


    ], function (error, results) {


        res.json(results);
    });

};
exports.pendingprofiles_count = function (req, res) {


    User.aggregate([
        {
            "$match": {
                "user_status": { "$eq": "ACTIVE" },
                "more_info_vr": { "$eq": true },
                "phone_vr": { "$eq": true },
                "email_vr": { "$eq": true }


            }
        },


        // Count all occurrences
        {
            "$group": {
                "_id": "$profile_complete_status"
                ,


                "count": { "$sum": 1 }

            }
        }


    ], function (error, results) {


        res.json(results);
    });

};
exports.get_all_users_status_count = function (req, res) {
    User.aggregate([
        {

            $match: {

                "user_role": {

                    "$nin": ["ADMIN", "MARRAGE_BUREAU"]

                }
            }
        },

        {

            $lookup: {

                from: "userphotos",
                localField: "user_id",
                foreignField: "user_id",
                as: "pics"

            }

        },
        {

            $project: {

                "_id": 1,
                "created_on": "$created_on",
                "user_status": "$user_status",
                "pic": {

                    $filter: {

                        input: "$pics",

                        as: "item",

                        cond: {

                            $and: [{

                                "$eq": ["$$item.photo_type", "PROFILE"]

                            }]

                        }

                    }

                },





            }

        },
        {

            "$unwind": {

                "path": "$pic",

                "preserveNullAndEmptyArrays": true

            }

        },
        {

            $project: {

                "_id": 1,
                "created_on": "$created_on",
                "user_status": "$user_status",
                pic: {

                    $ifNull: ["$pic", null]

                }
            }
        },
        {

            $project: {

                "_id": 1,
                "created_on": "$created_on",
                "user_status": "$user_status",
                photo: {

                    "$cond": {

                        "if": {

                            "$eq": ["$pic", null]



                        },

                        "then": {

                            status: "NOT_UPLOADED",

                            displaypic: {},

                        },

                        "else": {

                            "$cond": {

                                "if": {



                                    "$and": [{

                                        "$ne": ["$pic", null]

                                    }, {

                                        "$eq": ["$pic.photo_vr", false]

                                    },
                                    {
                                        "$eq": ["$pic.photo_vr_msg", "PENDING_APPROVAL"]
                                    }]


                                },

                                "then": {

                                    status: "PENDING_APPROVAL",

                                    displaypic: "$pic",

                                },

                                "else": {

                                    "$cond": {

                                        "if": {
                                            "$and": [{

                                                "$ne": ["$pic", null]

                                            }, {

                                                "$eq": ["$pic.photo_vr", true]

                                            },
                                            {
                                                "$eq": ["$pic.photo_vr_msg", "APPROVED"]
                                            }]

                                        },

                                        "then": {

                                            status: "APPROVED",

                                            displaypic: "$pic"

                                        },

                                        else: {
                                            "$cond": {

                                                "if": {
                                                    "$and": [{

                                                        "$ne": ["$pic", null]

                                                    }, {

                                                        "$eq": ["$pic.photo_vr", false]

                                                    },
                                                    {
                                                        "$eq": ["$pic.photo_vr_msg", "REJECTED"]
                                                    }]

                                                },

                                                "then": {

                                                    status: "REJECTED",

                                                    displaypic: "$pic"

                                                },

                                                else: "$noval"

                                            }
                                        }

                                    }

                                }

                            }

                        }

                    }





                }

            }
        }, {
            "$group": {
                "_id": null,
                //                 "TOTAL_USERS": {
                //                      "$sum": {
                //                         "$cond": [{
                //                             $or: [{ $eq: ["$pic.photo_type", "PROFILE"] },
                //                             { $not: ["$pic"]}
                //                             ]
                //                         }, 1, 0]
                //                     }
                //                    },
                "TOTAL_USERS": { "$sum": 1 },
                "TOTAL_ACTIVE_USERS": {
                    "$sum": {
                        "$cond": [{ "$eq": ["$user_status", "ACTIVE"] }, 1, 0]
                    }
                },
                "TOTAL_INCOMPLETE_USERS": {
                    "$sum": {
                        "$cond": [{ "$eq": ["$user_status", "INCOMPLETE"] }, 1, 0]
                    }
                },
                "TOTAL_INPROGRESS_USERS": {
                    "$sum": {
                        "$cond": [{ "$eq": ["$user_status", "INPROGRESS"] }, 1, 0]
                    }
                },
                "PHOTO_UPLOAD_PENDING": {
                    "$sum": {
                        //"$cond": [{ "$eq": ["$photo.status", "NOT_UPLOADED"] }, 1, 0]
                                   $cond: [{
                                        $and: [{ $eq: ["$photo.status", "NOT_UPLOADED"] },
                                        { $eq: ["$user_status", "ACTIVE"] }
                                        ]
                                    },
                                        1,
                                        0]
                    }
                },
                "PHOTO_VR_PENDING": {
                    "$sum": {
                        //"$cond": [{ "$eq": ["$photo.status", "PENDING_APPROVAL"] }, 1, 0]
                        $cond: [{
                            $and: [{ $eq: ["$photo.status", "PENDING_APPROVAL"] },
                            { $eq: ["$user_status", "ACTIVE"] }
                            ]
                        },
                            1,
                            0]
                    }
                },
                "PHOTO_VR_REJECTED": {
                    "$sum": {
                       // "$cond": [{ "$eq": ["$photo.status", "REJECTED"] }, 1, 0]
                       $cond: [{
                        $and: [{ $eq: ["$photo.status", "REJECTED"] },
                        { $eq: ["$user_status", "ACTIVE"] }
                        ]
                    },
                        1,
                        0]
                    }
                },

                "PHOTO_VR_COMPLETED": {
                    "$sum": {
                        //"$cond": [{ "$eq": ["$photo.status", "APPROVED"] }, 1, 0]
                        $cond: [{
                            $and: [{ $eq: ["$photo.status", "APPROVED"] },
                            { $eq: ["$user_status", "ACTIVE"] }
                            ]
                        },
                            1,
                            0]
                    }
                },
                // "COMPLETED_PROFILES": {
                //     $sum: {
                //         $cond: [{
                //             $and: [{ $eq: ["$profile_complete_status", "COMPLETED"] },
                //             { $eq: ["$user_status", "ACTIVE"] }
                //             ]
                //         },
                //             1,
                //             0]
                //     }
                // },
                // "PENDING_PROFILES": {
                //     $sum: {
                //         $cond: [{
                //             $and: [{ $eq: ["$profile_complete_status", "PENDING"] },
                //             { $eq: ["$user_status", "ACTIVE"] }
                //             ]
                //         },
                //             1,
                //             0]
                //     }
                // }



            }
        }


    ], function (error, results) {


        res.json(results);
    });
};
exports.getallinActiveUsers = function (req, res) {

};

exports.get_users = function (req, res) {

    var search = req.body.searchType;
    var match = {};
    var sort={};

    function setDateRange(dateField){

        if(search.dateRange.from && search.dateRange.to){
            match[dateField] ={
                $gte: new Date(search.dateRange.from),
                $lte: new Date(search.dateRange.to)
            }
    
        }
    }
if(!search.userType || !search.dateRange.type){
  
   sort={ created_on: -1 } ;

}
else if(search.dateRange.type=="CREATEDDATE" ){
    sort={ created_on: -1 } ;
    setDateRange("created_on");

}
else if(search.dateRange.type=="ACTIVATIONDATE" ){
    sort={ admin_action_on: -1 } ;
    setDateRange("admin_action_on");
}
else if(search.dateRange.type=="UPLOADED_DATE" ){
    sort={ photo_uploaded_on: -1 } ;
    setDateRange("photo_uploaded_on");

}else if(search.dateRange.type=="APPROVED_PHOTO" ){
    sort={ photo_ap_or_rej_on: -1 } ;
    setDateRange("photo_ap_or_rej_on");

}
else if(search.dateRange.type=="REJECTED_PHOTO" ){
    sort={ photo_ap_or_rej_on: -1 } ;

    setDateRange("photo_ap_or_rej_on");

}
// {
//     $match: {
//         created_on: {
//             $gte: new Date(req.body.from),
//             $lte: new Date(req.body.to)
//         }
//     }

// },
for (var key in search) {
        
        if (key === "photoType") {

            if(search[key]){
                match["photostatus"] = { "$eq": search[key] };
            }
           
     }
          if (key === "userType") {
        
                    if(search[key]){
                        match["user_status"] = { "$eq": search[key] };
                    }
                   
             }
        if (key === "age") {
            match["age"] = { $lte: search[key].to, $gte: search[key].from };


        }
        if (key === "height") {
            match["height"] = { $lte: search[key].to, $gte: search[key].from };


        }
        if (key === "country") {
            var location = [];
            var countries = search["country"];
            var cities = search["city"];
            var states = search["state"];
            if (cities.length > 0) {

                for (var city = 0; city < cities.length; city++) {
                    var loc = {
                        country_id: { "$eq": cities[city].country_id },
                        state_id: { "$eq": cities[city].state_id },
                        city_id: { "$eq": cities[city].city_id }
                    };
                    location.push(loc);

                }
            }
            if (cities.length == 0 && states.length > 0) {
                for (var state = 0; state < states.length; state++) {
                    var loc1 = {
                        country_id: { "$eq": states[state].country_id },
                        state_id: { "$eq": states[state].state_id }

                    };
                    location.push(loc1);

                }

            }
            if (states.length == 0 && countries.length > 0) {
                for (var cn = 0; cn < countries.length; cn++) {
                    var loc2 = {
                        country_id: { "$eq": countries[cn].country_id }


                    };
                    location.push(loc2);

                }

            }
            if (location.length > 0) {
                match["$or"] = location;

            }

        }
        if (key === "religions") {

            var religions = search["religions"];
            var castes = search["caste"];
            var relcaste = [];
            if (castes.length > 0) {
                for (var cst = 0; cst < castes.length; cst++) {
                    var rel2 = {
                        religion: { "$eq": castes[cst].religion },
                        caste: { "$eq": castes[cst].caste },

                    };
                    relCaste.push(rel2);

                }

            }
            if (castes.length == 0 && religions.length > 0) {
                match["religion"] = { $in: religions };

            }
            if (relcaste.length > 0) {
                match["$or"] = relcaste;

            }

        }
        
        if ((key === "gender" ||
        key === "MaritialStatus" ||
        key === "mother_tongues" ||
        key === "physical_status" ||
        key === "occupation" ||
        key === "high_edu") && search[key].length > 0) {

            match[key] = { $in: search[key] };
        }
    }
   
console.log(match)
    var aggregate = User.aggregate([


        {

            $match: {

                "user_role": {

                    "$nin": ["ADMIN", "MARRAGE_BUREAU"]

                }
            }
        },
        {

            $lookup: {

                from: "userphotos",
                localField: "user_id",
                foreignField: "user_id",
                as: "pics"

            }

        },
        { $lookup: { from: "userbasicinfos", localField: "user_id", foreignField: "user_id", as: "basicinfos" } },
        { "$unwind": { "path": "$basicinfos", "preserveNullAndEmptyArrays": true } },
        { $lookup: { from: "usereducations", localField: "user_id", foreignField: "user_id", as: "usereducation" } },
        { "$unwind": { "path": "$usereducation", "preserveNullAndEmptyArrays": true } },
        { $lookup: { from: "countries", localField: "basicinfos.country", foreignField: "id", as: "country" } },
        { $lookup: { from: "states", localField: "basicinfos.state", foreignField: "id", as: "state" } },
        { $lookup: { from: "cities", localField: "basicinfos.city", foreignField: "id", as: "city" } },
        { $lookup: { from: "userintrests", localField: "user_id", foreignField: "user_id", as: "interest" } },
        { "$unwind": { "path": "$interest", "preserveNullAndEmptyArrays": true } },
        { "$unwind": { "path": "$country", "preserveNullAndEmptyArrays": true } },
        { "$unwind": { "path": "$state", "preserveNullAndEmptyArrays": true } },
        { "$unwind": { "path": "$city", "preserveNullAndEmptyArrays": true } },
        {

            $project: {

                "_id": 1,
                userinfo: "$$ROOT",
                pics: "$pics"
            }
        },
        {

            $project: {

                "_id": 1,
                userinfo: "$userinfo",
                "pic": {

                    $filter: {

                        input: "$pics",

                        as: "item",

                        cond: {

                            $and: [{

                                "$eq": ["$$item.photo_type", "PROFILE"]

                            }]

                        }

                    }

                },





            }

        },
        {

            "$unwind": {

                "path": "$pic",

                "preserveNullAndEmptyArrays": true

            }

        },
        {

            $project: {

                "_id": 1,
                userinfo: "$userinfo",
                pic: {

                    $ifNull: ["$pic", null]

                }
            }
        },
        {

            $project: {

                "_id": 1,
                userinfo: "$userinfo",
                photo: {

                    "$cond": {

                        "if": {

                            "$eq": ["$pic", null]



                        },

                        "then": {

                            status: "NOT_UPLOADED",

                            displaypic: null,

                        },

                        "else": {

                            "$cond": {

                                "if": {



                                    "$and": [{

                                        "$ne": ["$pic", null]

                                    }, {

                                        "$eq": ["$pic.photo_vr", false]

                                    },
                                    {
                                        "$eq": ["$pic.photo_vr_msg", "PENDING_APPROVAL"]
                                    }]


                                },

                                "then": {

                                    status: "PENDING_APPROVAL",

                                    displaypic: "$pic",

                                },

                                "else": {

                                    "$cond": {

                                        "if": {
                                            "$and": [{

                                                "$ne": ["$pic", null]

                                            }, {

                                                "$eq": ["$pic.photo_vr", true]

                                            },
                                            {
                                                "$eq": ["$pic.photo_vr_msg", "APPROVED"]
                                            }]

                                        },

                                        "then": {

                                            status: "APPROVED",

                                            displaypic: "$pic"

                                        },

                                        else: {
                                            "$cond": {

                                                "if": {
                                                    "$and": [{

                                                        "$ne": ["$pic", null]

                                                    }, {

                                                        "$eq": ["$pic.photo_vr", false]

                                                    },
                                                    {
                                                        "$eq": ["$pic.photo_vr_msg", "REJECTED"]
                                                    }]

                                                },

                                                "then": {

                                                    status: "REJECTED",

                                                    displaypic: "$pic"

                                                },

                                                else: "$noval"

                                            }
                                        }

                                    }

                                }

                            }

                        }

                    }





                }

            }
        },

        {
            $project: {
                "_id": 1,
                "user_id": "$userinfo.user_id",
                user_status: "$userinfo.user_status",
                gender: "$userinfo.gender",
                "first_name": "$userinfo.first_name",
                "last_name": "$userinfo.last_name",
                "age": "$userinfo.age",
                "height": "$userinfo.interest.height",
                country_id: "$userinfo.country.id",
                state_id: "$userinfo.state.id",
                city_id: "$userinfo.city.id",
                country: "$userinfo.country.name",
                state: "$userinfo.state.name",
                city: "$userinfo.city.name",
                physical_status: "$userinfo.interest.physical_status",
                MaritialStatus: "$userinfo.basicinfos.maritialstatus",
                mother_tongues: "$userinfo.basicinfos.mothertounge",
                religion: "$userinfo.basicinfos.religion",
                caste: "$userinfo.basicinfos.caste",
                high_edu: "$userinfo.usereducation.high_edu",
                occupation: "$userinfo.usereducation.occupation",
                "photostatus": "$photo.status",
                "pic": "$photo.displaypic",
                photo_uploaded_on: "$photo.displaypic.uploaded_on",
                photo_ap_or_rej_on: "$photo.displaypic.photo_approved_on",
                created_on: "$userinfo.created_on",
                admin_action_on: "$userinfo.admin_action_on"

            }
        },
        { $sort: sort },
        {
            
                        $match: match
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
                docs: results,
                pages: pageCount,
                total: count

            };
            res.json(docs);
        }
    });
};
exports.get_user = function (req, res) {

    User.aggregate([

        {
            $match: {
                "user_id": { "$eq": req.body.user_id }

            }
        },

        { $lookup: { from: "userbasicinfos", localField: "user_id", foreignField: "user_id", as: "basicinfos" } },
        { $lookup: { from: "usereducations", localField: "user_id", foreignField: "user_id", as: "usereducations" } },
        { $lookup: { from: "userintrests", localField: "user_id", foreignField: "user_id", as: "userintrests" } },
        { $lookup: { from: "userfamilies", localField: "user_id", foreignField: "user_id", as: "userfamilies" } },
        { $lookup: { from: "userphotos", localField: "user_id", foreignField: "user_id", as: "pic" } },
        {
            $project: {
                "_id": 0,
                "user": "$$ROOT"




            }
        }





    ], function (error, results) {


        res.json(results[0]);
    });



};