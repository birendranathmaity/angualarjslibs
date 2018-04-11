var block = require('./model/block.model');
var setting = require('./model/setting.model');
var request = require('./model/request.model');
var commonQuery = require('./common.query');
var check = require('./check_user');
var reportAbuseModel = require('./model/report.abuse.model');
exports.checkOnline=function(req,res){
    check.api.isOnline(req.user_id,function(isOnline){

if(isOnline){
    res.json({online:true});
}
else{
    res.json({online:false});
}

    });
}

exports.createReportAbuse=function(req,res){
   
    
    if(req.body.actionType=="CREATE"){
        req.body.reportabuse_status="UNREAD";
        req.body.created_on=new Date();
    }
    if(req.body.actionType=="UPDATE"){
        req.body.reportabuse_status="READ";
        req.body.recived_on=new Date();
        req.body.action_by=req.body.action_by;
    }
    var query={
        "user_id": req.body.user_id,
        "reportabuse_user_id": req.body.reportabuse_user_id
    }
    reportAbuseModel.update(query,req.body,{upsert:true},function(error,result){
        res.json({success:true})
    });  
}
exports.CreateUserBlock = function (req, res) {

    var query = {
        user_id: req.body.user_id,
        block_user_id: req.body.block_user_id

    }
    block.findOne(query, function (err, result) {

        if (!result) {

            req.body.created_on = new Date();
            req.body.block_status="BLOCK";
            var blockModel = new block(req.body);
            blockModel.save(function (result) {
                res.json({
                    success: true,
                    msg: "SUCCESS_BLOCK"
                })
            });

        }
        else{
            block.update(
                {
        
                    user_id: req.body.user_id,
                    block_user_id: req.body.block_user_id
        
                },
        
                {
                    $set: {
                        block_status:req.body.block_status,
                        updated_on:new Date()
                    }
        
                },
        
        
        
                function (err, docs) {
        
                    res.json({
                        success: true,
                        msg: "UPDATE_SUCCESS",
                        result: docs
        
        
                    });
                });

        }

    });



}
exports.updateUserBlock = function (req, res) {
   
    block.update(
        {

            user_id: req.body.user_id,
            block_user_id: req.body.block_user_id

        },

        {
            $set: {
                block_status:"UNBLOCK",
                updated_on:new Date()
            }

        },



        function (err, docs) {

            res.json({
                success: true,
                msg: "UPDATE_SUCCESS",
                result: docs


            });
        });

}

exports.getNotifications = function (req, res) {
    var and = [];
    if (req.body.status == "READ") {
        and = [
            { "$eq": ["$request_user_id", req.body.user_id] },
            { "$ne": ["$request_status", "BLOCK"] },
            { "$ne": ["$request_action", "PENDING"] },
            // { "$ne": ["$request_action", "ACCEPTED"] },
            // { "$ne": ["$request_action", "REJECTED"] },
            { "$ne": ["$reciver_response", "DELETE"] },
            { "$ne": ["$creater_response", "DELETEFOREVRYONE"] }

        ];

    }
    if(req.body.status == "UNREAD"){

        and = [
            { "$eq": ["$request_user_id", req.body.user_id] },
            { "$eq": ["$request_status", req.body.status] },
            { "$ne": ["$request_action", "PENDING"] },
            { "$ne": ["$request_action", "ACCEPTED"] },
            { "$ne": ["$request_action", "REJECTED"] },
            { "$ne": ["$reciver_response", "DELETE"] },
            { "$ne": ["$creater_response", "DELETEFOREVRYONE"] }

        ];
    }


    var aggregate = request.aggregate([

        {
            "$project": {


                "request_status": "$request_status",
                "request_type": "$request_type",
                "request_action": "$request_action",
                "customfield": {



                    "$cond": {



                        "if": {



                            "$and": [

                                { "$eq": ["$user_id", req.body.user_id] },

                                { "$eq": ["$request_status", req.body.status] },
                                { "$ne": ["$request_action", "PENDING"] },
                                { "$ne": ["$creater_response", "DELETEFORME"] },
                                { "$ne": ["$creater_response", "DELETEFOREVRYONE"] },
                                {

                                    "$or": [
                                        { "$eq": ["$request_action", "ACCEPTED"] },
                                        { "$eq": ["$request_action", "REJECTED"] }
                                    ]
                                }


                            ]









                        },



                        "then": {

                            id: "$request_user_id",
                            whosent: "SENT",

                            date: "$recived_on"

                        },



                        "else": {



                            "$cond": {



                                "if": {



                                    "$and": and






                                },



                                "then": {

                                    id: "$user_id",
                                    whosent: "FROM",
                                    date: "$created_on" 
                                    // date: "$recived_on" ? "$recived_on" : "$created_on" 





                                },



                                else: "$noval"



                            }



                        }



                    }



                }



            }
        },

        {

            $match: {

                "customfield": { $exists: true },

            }

        },



        { $sort: { "customfield.date": -1 } },

        { $lookup: { from: "dbusers", localField: "customfield.id", foreignField: "user_id", as: "user" } },
        { "$unwind": { "path": "$user", "preserveNullAndEmptyArrays": true } },
        //basic info//
        { $lookup: { from: "userbasicinfos", localField: "user.user_id", foreignField: "user_id", as: "basicinfos" } },
        { "$unwind": { "path": "$basicinfos", "preserveNullAndEmptyArrays": true } },
        { $lookup: { from: "countries", localField: "basicinfos.country", foreignField: "id", as: "country" } },
        { $lookup: { from: "states", localField: "basicinfos.state", foreignField: "id", as: "state" } },
        { $lookup: { from: "cities", localField: "basicinfos.city", foreignField: "id", as: "city" } },

        { "$unwind": { "path": "$country", "preserveNullAndEmptyArrays": true } },
        { "$unwind": { "path": "$state", "preserveNullAndEmptyArrays": true } },
        { "$unwind": { "path": "$city", "preserveNullAndEmptyArrays": true } },

        //user setting//
        { $lookup: { from: "settings", localField: "user.user_id", foreignField: "user_id", as: "setting" } },
        { "$unwind": { "path": "$setting", "preserveNullAndEmptyArrays": true } },

        //user photos//
        { $lookup: { from: "userphotos", localField: "user.user_id", foreignField: "user_id", as: "pic" } },
        //user height
        { $lookup: { from: "userintrests", localField: "user.user_id", foreignField: "user_id", as: "height" } },
        { "$unwind": { "path": "$height", "preserveNullAndEmptyArrays": true } },



        {
            $project: {

                "_id": 1,
                "request_status": "$request_status",
                "request_type": "$request_type",
                "request_action": "$request_action",
                "date": "$customfield.date",
                "whosent": "$customfield.whosent",
                "user": {
                    "user_id": "$customfield.id",
                    "user_role":"$user.user_role",
                    "first_name": "$user.first_name",
                    "last_name": "$user.last_name",
                    "age": "$user.age",
                    "height": "$height.height",
                    "country": "$country.name",
                    "state": "$state.name",
                    "city": "$city.name",
                    "pic": "$pic",
                    "setting": "$setting"

                },

            }

        }
    ]);
    var options = {
        page: req.body.page,
        limit: req.body.limit,
        allowDiskUse: true
    };
    request.aggregatePaginate(aggregate, options, function (err, results, pageCount, count) {
        if (err) {
            res.json(err);
            console.err(err)
        }
        else {

            check.api.getFinalUsersData(results, req.body.user_id, function (users) {

                var docs = {
                    docs: users,
                    pages: pageCount,
                    total: count

                };
                res.json(docs);


            });





        }
    });



}

exports.readNotifications = function (req, res) {


    var query = {
        $or: [{
            "$and": [

                { "user_id": { "$eq": req.body.user_id } },

                { "request_status": { "$eq": "UNREAD" } },
                { "request_action": { "$ne": "PENDING" } },
                {

                    "$or": [
                        { "request_action": { "$eq": "ACCEPTED" } },
                        { "request_action": { "$eq": "REJECTED" } },

                    ]
                }


            ]
        }, {
            "$and": [

                { "request_user_id": { "$eq": req.body.user_id } },

                { "request_status": { "$eq": "UNREAD" } },
                { "request_action": { "$ne": "PENDING" } },
                { "request_action": { "$ne": "ACCEPTED" } },
                { "request_action": { "$ne": "REJECTED" } }

            ]

        }

        ]



    }
    request.update(
        query,

        {
            $set: {
                request_status: "READ"

            }

        },

        { multi: true },

        function (err, docs) {

            res.json({
                success: true,
                msg: "UPDATE_SUCCESS"



            });
        });
}
exports.get_settings=function(req,res){
    var query = {
        user_id: req.body.user_id
        
    }
    setting.findOne(query, {_id:0},function (err, result) {
        res.json({
            success: true,
            settings: result
        })


    });
};
exports.save_settings=function(req,res){
    req.body.created_on = new Date();
    var query = {
        user_id: req.body.user_id
        
    }
    setting.findOne(query, function (err, result) {

        if (!result) {

            var settingModel = new setting(req.body);
            settingModel.save(function (result) {
                res.json({
                    success: true,
                    msg: "SAVE_SUCCESS"
                });
            });

        }
        else {
            req.body.updated_on=new Date();
            res.json({
                success: true,
                msg: "SEND_SUCCESS"
            });
            setting.update(
                query,

                {
                    $set: req.body

                },



                function (err, docs) {

                    res.json({
                        success: true,
                        msg:"UPDATE_SUCCESS",
                        result: docs


                    });
                });

        }

    });
};