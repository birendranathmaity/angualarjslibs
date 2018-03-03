var request = require('./../model/request.model');
var check = require('./../check_user');
var global = require('./../../setGlobal');
exports.sendRequest = function (req, res) {
    req.body.created_on = new Date();
    var query = {
        user_id: req.body.user_id,
        request_user_id: req.body.request_user_id,
        request_type: req.body.request_type
    }
    request.findOne(query, function (err, result) {

        if (!result) {

            var requestModel = new request(req.body);
            requestModel.save(function (error, result) {

                check.api.isOnline(req.body.request_user_id, function (isOnline) {

                    if (isOnline) {
                        check.api.getOnlineUser(req.body.user_id, req.body.request_user_id, function (user) {

                            if (user) {
                                var emitdata = {
                                    _id: result._id,
                                    "request_status": result.request_status,
                                    "request_type": req.body.request_type,
                                    "request_action": "",
                                    "whosent": "FROM",
                                    user: user.user,
                                    date: req.body.created_on
                                }

                                global.emit(req.body.request_user_id + "NOTI", emitdata);

                            }

                        });

                    }


                });
                res.json({
                    success: true,
                    msg: "SEND_SUCCESS"
                })
            });

        }
        else {
            res.json({
                success: false,
                msg: "SEND_FALIURE"
            });


        }

    });



}
exports.updateRequests = function (req, res) {

    var query = {};
    var fields = {};

    if (req.body.update_type == "READALL") {

        query = {
            request_status: "UNREAD",
            request_user_id: req.body.user_id,
            request_type: req.body.request_type,
            request_action: { $nin: ["ACCEPTED", "REJECTED", "PENDING"] }
        };

        fields = {
            request_status: "READ",
            recived_on: new Date()

        }
    }
    else {
        query = {
            _id: { $in: req.body.ids },
            request_type: req.body.request_type
        };
        req.body.fields.recived_on = new Date();
        fields = req.body.fields;

    }
    function onlineUserEmitNoti(success) {

        var users = req.body.usersIds;
        var total = users.length;
        var count = 0;
        var main = this;
        for (var i = 0; i < total; i++) {
            (function (index) {
                check.api.isOnline(users[index], function (isOnline) {
                    count++;
                    if (isOnline) {
                        check.api.getOnlineUser(req.body.user_id, users[index], function (user) {

                            if (user) {
                                var emitdata = {
                                    _id: req.body.ids[index],
                                    "request_status": req.body.fields.request_status,
                                    "request_type": req.body.request_type,
                                    "request_action": req.body.fields.request_action,
                                    "whosent": "SENT",
                                    user: user.user,
                                    date: req.body.fields.recived_on
                                }

                                global.emit(users[index] + "NOTI", emitdata);

                            }

                        });

                    }

                    if (count > total - 1) success(true); return;

                });


            }(i));
        }


    }

    request.update(
        query,

        {
            $set: fields

        },

        { multi: true, safe: true },

        function (err, docs) {

            if (req.body.fields.request_action == "ACCEPTED" || req.body.fields.request_action == "REJECTED") {

                onlineUserEmitNoti(function (scc) {
                    res.json({
                        success: true,
                        result: docs


                    });

                });
            }
            else {
                res.json({
                    success: true,
                    result: docs


                });
            }

        });
}
exports.getRequestsCount = function (req, res) {

    var user_id = req.body.user_id;
    var request_type = req.body.request_type;
    var agg = request.aggregate([

        {
            "$group": {
                "_id": null,
                "RECEIVED": {
                    "$sum": {
                        "$cond": [

                            {
                                "$and": [
                                    { "$eq": ["$request_user_id", user_id] },
                                    { "$eq": ["$request_type", request_type] },
                                    { "$eq": ["$request_status", "READ"] },
                                    { "$ne": ["$request_action", "ACCEPTED"] },
                                    { "$ne": ["$request_action", "REJECTED"] },
                                    { "$ne": ["$request_action", "PENDING"] },
                                    { "$ne": ["$reciver_response", "DELETE"] },
                                    { "$ne": ["$creater_response", "DELETEFOREVRYONE"] }

                                ]


                            }

                            , 1, 0]
                    }
                },
                "SENT": {
                    "$sum": {
                        "$cond": [

                            {
                                "$and": [
                                    { "$eq": ["$user_id", user_id] },
                                    { "$eq": ["$request_type", request_type] },
                                    { "$ne": ["$creater_response", "DELETEFORME"] },
                                    { "$ne": ["$creater_response", "DELETEFOREVRYONE"] }

                                ]


                            }

                            , 1, 0]
                    }
                },
                "ACCEPTED": {
                    "$sum": {
                        "$cond": [

                            {
                                "$and": [
                                    { "$eq": ["$request_user_id", user_id] },
                                    { "$eq": ["$request_type", request_type] },
                                    { "$eq": ["$request_action", "ACCEPTED"] },
                                    { "$ne": ["$reciver_response", "DELETE"] }
                                    // { "$ne": ["$creater_response", "DELETEFOREVRYONE"] }

                                ]


                            }

                            , 1, 0]
                    }
                },
                "REJECTED": {
                    "$sum": {
                        "$cond": [

                            {
                                "$and": [
                                    { "$eq": ["$request_user_id", user_id] },
                                    { "$eq": ["$request_type", request_type] },
                                    { "$eq": ["$request_action", "REJECTED"] },

                                    { "$ne": ["$reciver_response", "DELETE"] }
                                    // { "$ne": ["$creater_response", "DELETEFOREVRYONE"] }

                                ]


                            }

                            , 1, 0]
                    }
                },
                "PENDING": {
                    "$sum": {
                        "$cond": [

                            {
                                "$and": [
                                    { "$eq": ["$request_user_id", user_id] },
                                    { "$eq": ["$request_type", request_type] },
                                    { "$eq": ["$request_action", "PENDING"] },

                                    { "$ne": ["$reciver_response", "DELETE"] }
                                    // { "$ne": ["$creater_response", "DELETEFOREVRYONE"] }

                                ]


                            }

                            , 1, 0]
                    }
                }

            }
        }]);
    var options = { page: 0, limit: 0, allowDiskUse: true }
    request.aggregatePaginate(agg, options, function (err, results, pageCount, count) {
        if (err) {
            res.json(err);
            console.err(err)
        }
        else {
            res.json(results);
        }

    });

}

exports.getRequestsByType = function (req, res) {
    var searchType = req.body.searchType;
    var match = {


    };
    var field;
    var dateType;
    if (searchType == "RECEIVED") {
        match = {

            "request_user_id": { "$eq": req.body.user_id },
            "request_status": { "$eq": "READ" },
            "request_type": { "$eq": req.body.request_type },
            "request_action": { "$nin": ["ACCEPTED", "REJECTED", "PENDING"] },
            "reciver_response": { "$ne": "DELETE" },
            "creater_response": { "$nin": ["DELETEFORME", "DELETEFOREVRYONE"] }
        };
        field = "user_id";
        dateType = "created_on";
    }
    if (searchType == "ACCEPTED") {
        match = {

            "request_user_id": { "$eq": req.body.user_id },
            "request_action": { "$eq": "ACCEPTED" },
            "request_type": { "$eq": req.body.request_type },
            "reciver_response": { "$ne": "DELETE" },
            "creater_response": { "$nin": ["DELETEFORME", "DELETEFOREVRYONE"] }
        };
        field = "user_id";
        dateType = "recived_on";
    }
    if (searchType == "REJECTED") {
        match = {

            "request_user_id": { "$eq": req.body.user_id },
            "request_action": { "$eq": "REJECTED" },
            "request_type": { "$eq": req.body.request_type },
            "reciver_response": { "$ne": "DELETE" },
            "creater_response": { "$nin": ["DELETEFORME", "DELETEFOREVRYONE"] }
        };
        field = "user_id";
        dateType = "recived_on";
    }
    if (searchType == "PENDING") {
        match = {

            "request_user_id": { "$eq": req.body.user_id },
            "request_action": { "$eq": "PENDING" },
            "request_type": { "$eq": req.body.request_type },
            "reciver_response": { "$ne": "DELETE" },
            "creater_response": { "$nin": ["DELETEFORME", "DELETEFOREVRYONE"] }
        };
        field = "user_id";
        dateType = "created_on";
    }
    if (searchType == "SENT") {
        match = {

            "user_id": { "$eq": req.body.user_id },
            "request_type": { "$eq": req.body.request_type },
            "creater_response": { "$nin": ["DELETEFORME", "DELETEFOREVRYONE"] }
        };
        field = "request_user_id";
        dateType = "created_on";
    }
    // if (searchType == "INBOX") {

    //     match = {

    //         "send_to": { "$eq": req.body.user_id },
    //         "message_type": { "$nin": ["BLOCK"] },
    //         "creater_response": { "$nin": ["DELETEFOREVRYONE"] },
    //         "reciver_response": { "$ne": "DELETE" },
    //     };
    //     field = "user_id";
    // }

    var date = {};
    date[dateType] = -1;
    var aggregate = request.aggregate([

        { $sort: date },
        {
            $match: match
        },


        { $lookup: { from: "dbusers", localField: field, foreignField: "user_id", as: "user" } },

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
                "user": {
                    "user_id": "$" + field,
                    "first_name": "$user.first_name",
                    "last_name": "$user.last_name",
                    "user_role":"$user.user_role",
                    "age": "$user.age",
                    "height": "$height.height",
                    "country": "$country.name",
                    "state": "$state.name",
                    "city": "$city.name",
                    "pic": "$pic",
                    "setting": "$setting"

                },
                // "request_status": "$request_status",
                // "request_type": "$request_type",
                // "request_action": "$request_action",
                // "user": {

                //     "user_id": "$" + field,

                //     "first_name": "$user.first_name",

                //     "last_name": "$user.last_name",

                //     "age": "$user.age",

                //     "height": "$height.height",

                //     "country": "$country.name",

                //     "state": "$state.name",

                //     "city": "$city.name",
                //     "pic": "$pic"
                // },

                "date": "$" + dateType,



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
