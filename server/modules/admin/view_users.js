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
       // { $sort: { created_on: -1 } },
        { $lookup: { from: "userphotos", localField: "user_id", foreignField: "user_id", as: "pic" } },
         { "$unwind": { "path": "$pic", "preserveNullAndEmptyArrays": true } },
         { $match: { $or: [ { 'pic.photo_type': { $eq: "PROFILE", $exists: true } },{'pic':{$exists: false}} ] } },
        {
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
                "TOTAL_INACTIVE_USERS": {
                    "$sum": {
                        "$cond": [{ "$eq": ["$user_status", "INACTIVE"] }, 1, 0]
                    }
                },
                "EMAIL_VR_PENDING": {
                    $sum: {
                        $cond: [{
                            $and: [{ $eq: ["$email_vr", false] },
                            { $eq: ["$user_status", "ACTIVE"] }
                            ]
                        },
                            1,
                            0]
                    }
                },
                "PHOTO_UPLOAD_PENDING": {
                    $sum: {
                        $cond: [{
                            $and: [{ $not: ["$pic"] },
                            { $eq: ["$user_status", "ACTIVE"] }
                            ]
                        },
                            1,
                            0]
                    }
                },
                "PHOTO_VR_PENDING": {
                    $sum: {
                        $cond: [{
                            $and: [
                                { $eq: ["$pic.photo_type", "PROFILE"] },
                                { $eq: ["$pic.photo_vr_msg", "PENDING_APPROVAL"] },
                                { $eq: ["$user_status", "ACTIVE"] }
                            ]
                        },
                            1,
                            0]
                    }
                },
                "PHOTO_VR_REJECTED": {
                    $sum: {
                        $cond: [{
                            $and: [
                                { $eq: ["$pic.photo_type", "PROFILE"] },
                                { $eq: ["$pic.photo_vr_msg", "REJECTED"] },
                                { $eq: ["$user_status", "ACTIVE"] }
                            ]
                        },
                            1,
                            0]
                    }
                },
                "PHOTO_VR_COMPLETED": {
                    $sum: {
                        $cond: [{
                            $and: [
                                { $eq: ["$pic.photo_type", "PROFILE"] },
                                { $eq: ["$pic.photo_vr", true] },
                                { $eq: ["$user_status", "ACTIVE"] }
                            ]
                        },
                            1,
                            0]
                    }
                },
                "COMPLETED_PROFILES": {
                    $sum: {
                        $cond: [{
                            $and: [{ $eq: ["$profile_complete_status", "COMPLETED"] },
                            { $eq: ["$user_status", "ACTIVE"] }
                            ]
                        },
                            1,
                            0]
                    }
                },
                "PENDING_PROFILES": {
                    $sum: {
                        $cond: [{
                            $and: [{ $eq: ["$profile_complete_status", "PENDING"] },
                            { $eq: ["$user_status", "ACTIVE"] }
                            ]
                        },
                            1,
                            0]
                    }
                }



            }
        }


    ], function (error, results) {


        res.json(results);
    });
};
exports.getallinActiveUsers = function (req, res) {

};

exports.get_users = function (req, res) {

    var searchType = req.body.searchType;
    var match = {};
    if (searchType == "TOTAL_USERS") {
        match = {};

    }
    if (searchType == "TOTAL_ACTIVE_USERS") {
        match = {
            "user_status": { "$eq": "ACTIVE" },

        };

    }
    if (searchType == "TOTAL_INACTIVE_USERS") {
        match = {
            "user_status": { "$eq": "INACTIVE" },

        };

    }
    if (searchType == "EMAIL_VR_PENDING") {
        match = {
            "user_status": { "$eq": "ACTIVE" },
            "email_vr": { "$eq": false }
        };

    }
    if (searchType == "PHOTO_UPLOAD_PENDING") {
        match = {
            "user_status": { "$eq": "ACTIVE" },
            "pic": { "$exists": false },
        };

    }
    if (searchType == "PHOTO_VR_PENDING") {
        match = {
            "user_status": { "$eq": "ACTIVE" },
            "pic.photo_type": { "$eq": "PROFILE" },
            "pic.photo_vr_msg": { "$eq": "PENDING_APPROVAL" },
            "pic.photo_vr": { "$eq": false }

        };

    }
    if (searchType == "PHOTO_VR_REJECTED") {
        match = {
            "user_status": { "$eq": "ACTIVE" },
            "pic.photo_type": { "$eq": "PROFILE" },
            "pic.photo_vr_msg": { "$eq": "REJECTED" },
            "pic.photo_vr": { "$eq": false }

        };

    }
    if (searchType == "PHOTO_VR_COMPLETED") {
        match = {
            "user_status": { "$eq": "ACTIVE" },
            "pic.photo_type": { "$eq": "PROFILE" },
            "pic.photo_vr_msg": { "$eq": "APPROVED" },
            "pic.photo_vr": { "$eq": true }

        };

    }
    if (searchType == "COMPLETED_PROFILES") {
        match = {
            "user_status": { "$eq": "ACTIVE" },
            "profile_complete_status": { "$eq": "COMPLETED" }


        };

    }
    if (searchType == "PENDING_PROFILES") {
        match = {
            "user_status": { "$eq": "ACTIVE" },
            "profile_complete_status": { "$eq": "PENDING" }


        };

    }

    var aggregate = User.aggregate([


        {
            
                    $match: {
            
                        "user_role": {
            
                            "$nin": ["ADMIN", "MARRAGE_BUREAU"]
            
                        }
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
        // { "$unwind": { "path": "$pic", "preserveNullAndEmptyArrays": true } },

        { "$unwind": { "path": "$country", "preserveNullAndEmptyArrays": true } },

        { "$unwind": { "path": "$state", "preserveNullAndEmptyArrays": true } },

        { "$unwind": { "path": "$city", "preserveNullAndEmptyArrays": true } },
        { "$unwind": { "path": "$pic", "preserveNullAndEmptyArrays": true } },
         { $match: { $or: [ { 'pic.photo_type': { $eq: "PROFILE", $exists: true } },{'pic':{$exists: false}} ] } },

        {
            $match: match
        },

        { $sort: { created_on: -1 } },

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
                "pic":"$pic",
                // pic: {
                //     $filter: {
                //         input: "$pic",
                //         as: "item",
                //         cond: { $eq: ["$$item.photo_type", "PROFILE"] }
                //     }
                // },
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