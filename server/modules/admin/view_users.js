var User = require('./../model/user.model');
var PhotoModel = require('./../model/user.photo.model');
exports.getallActiveUsers = function (req, res) {


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
        limit: req.body.limit
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

exports.getallinActiveUsers = function (req, res) {
    var aggregate = User.aggregate(
        [
            { "$sort": { created_on: -1 } },
            {
                "$project": {

                    "user_id": "$user_id",
                    "first_name": "$first_name",
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
                $unwind: "$height"
            },
            { $addFields: { "height": "$height.height" } }

            //    { $match:
            //        { 
            //             age : {'$gte' : 40 } 
            //        }
            //    }
        ]
    );
    // . aggregate.match({age : {'$gt' : 40 } })
    // .aggregate.lookup({
    //         from: "userintrests",
    //         localField: "user_id",
    //         foreignField: "user_id",
    //         as: "height"
    //     });
    //  .aggregate.$sort( { created_on: -1 });
    var options = {
        page: 1,
        limit: 5
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

    // User.aggregate(
    //     [

    //     {
    //     $lookup: {
    //            from: "userintrests",
    //             localField: "user_id",
    //             foreignField: "user_id",
    //             as: "height"
    //         }
    // }
    //     ],
    //     function(err,result) {
    //  res.json(aggregate);
    //        // Result is an array of documents
    //     }
    // );
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

        { $lookup: { from: "userintrests", localField: "user_id", foreignField: "user_id", as: "height" } },

        { $match: { height: { "$ne": [] } } },

        { $unwind: "$height" },

        { $lookup: { from: "userbasicinfos", localField: "user_id", foreignField: "user_id", as: "basicinfos" } },

        { $match: { basicinfos: { "$ne": [] } } },

        { $unwind: "$basicinfos" },

        { $lookup: { from: "countries", localField: "basicinfos.country", foreignField: "id", as: "country" } },

        { $lookup: { from: "states", localField: "basicinfos.state", foreignField: "id", as: "state" } },

        { $lookup: { from: "cities", localField: "basicinfos.city", foreignField: "id", as: "city" } },

        { $lookup: { from: "userphotos", localField: "user_id", foreignField: "user_id", as: "pic" } },


        { $match: { pic: { "$ne": [] } } },

        { $unwind: "$pic" },
        {
            "$match": {
                "pic.photo_type": { "$eq": "PROFILE" },
                "pic.photo_vr_msg": { "$eq": req.body.searchtype },
                "pic.photo_vr": { "$eq": req.body.vr }
            }
        },
        { $unwind: "$country" },

        { $unwind: "$state" },

        { $unwind: "$city" },



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
        limit: req.body.limit
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



{$sort: { created_on: -1 }},

{$match: { user_status: "ACTIVE" ,
           email_vr: false} },



{$lookup:{from: "userbasicinfos",localField: "user_id",foreignField: "user_id",as: "basicinfos"}},


{ "$unwind": { "path": "$basicinfos", "preserveNullAndEmptyArrays": true }},


{$lookup: {from: "countries", localField: "basicinfos.country", foreignField: "id", as: "country"} },

{$lookup: {from: "states", localField: "basicinfos.state", foreignField: "id", as: "state"} },

{$lookup: {from: "cities", localField: "basicinfos.city", foreignField: "id", as: "city"} },

{$lookup: {from: "userphotos", localField: "user_id", foreignField: "user_id", as: "pic"} },
{$lookup:{from: "userintrests",localField: "user_id",foreignField: "user_id",as: "height"}},


{ "$unwind": { "path": "$height", "preserveNullAndEmptyArrays": true }},
{ "$unwind": { "path": "$pic", "preserveNullAndEmptyArrays": true }},

{ "$unwind": { "path": "$country", "preserveNullAndEmptyArrays": true }},

{ "$unwind": { "path": "$state", "preserveNullAndEmptyArrays": true }},

{ "$unwind": { "path": "$city", "preserveNullAndEmptyArrays": true }},


{ $project: {

            "_id":1,

            "user_id": "$user_id",

            "first_name" :"$first_name",

            "last_name":"$last_name",

            "age":"$age",

            "height": "$height.height",

            "country": "$country.name",

            "state": "$state.name",

            "city": "$city.name",

            "pic":"$pic",
            "created_on":"$created_on"

    } }



 

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