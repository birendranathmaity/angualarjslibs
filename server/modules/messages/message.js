var message = require('./../model/message.model');


exports.saveMessage = function (req, res) {


    var messageModel = new message(req.body);

    messageModel.save(function (err, msg) {
        //  saveUserProfileStatus(user.user_id, {email_vr: false, phone_vr: false,more_info_vr: false});
        res.json({
            success: true



        })
    });

}
exports.updateMessage = function (req, res) {


    // message.update({ _id: req.body.msg_id }, req.body, function (err, msg) {

    //     res.json({
    //         success: true,
    //         data: "ms gupdated"
    //     });
    // });
    message.update(
        {
            _id: { $in: req.body.ids }
        },

        {
            $set: req.body.fields

        },

        { multi: true },

        function (err, docs) {

            res.json({
                success: true,
                result: docs


            });
        });
}

exports.getMessagesByType = function (req, res) {
    var searchType = req.body.searchType;
    var match = {


    };
    var field;
    if (searchType == "SENT") {
        match = {

            "user_id": { "$eq": req.body.user_id },
            
            "creater_response": { "$nin": ["DELETEFORME", "DELETEFOREVRYONE"] }
        };
        field = "send_to";
    }
    if (searchType == "INBOX") {

        match = {

            "send_to": { "$eq": req.body.user_id },
            "message_type":{ "$nin": ["BLOCK"] },
            "creater_response": { "$nin": ["DELETEFOREVRYONE"] },
            "reciver_response": { "$ne": "DELETE" },
        };
        field = "user_id";
    }
    var aggregate = message.aggregate([

        { $sort: { send_on: -1 } },
        {
            $match: match
        },


        { $lookup: { from: "dbusers", localField: field, foreignField: "user_id", as: "user" } },
        { "$unwind": { "path": "$user", "preserveNullAndEmptyArrays": true } },
        { $lookup: { from: "userbasicinfos", localField: "user.user_id", foreignField: "user_id", as: "basicinfos" } },


        { "$unwind": { "path": "$basicinfos", "preserveNullAndEmptyArrays": true } },


        { $lookup: { from: "countries", localField: "basicinfos.country", foreignField: "id", as: "country" } },

        { $lookup: { from: "states", localField: "basicinfos.state", foreignField: "id", as: "state" } },

        { $lookup: { from: "cities", localField: "basicinfos.city", foreignField: "id", as: "city" } },

        { $lookup: { from: "userphotos", localField: "user.user_id", foreignField: "user_id", as: "pic" } },
        { $lookup: { from: "userintrests", localField: "user.user_id", foreignField: "user_id", as: "height" } },


        { "$unwind": { "path": "$height", "preserveNullAndEmptyArrays": true } },
        // { "$unwind": { "path": "$pic", "preserveNullAndEmptyArrays": true } },

        { "$unwind": { "path": "$country", "preserveNullAndEmptyArrays": true } },

        { "$unwind": { "path": "$state", "preserveNullAndEmptyArrays": true } },

        { "$unwind": { "path": "$city", "preserveNullAndEmptyArrays": true } },
        { "$unwind": { "path": "$pic", "preserveNullAndEmptyArrays": true } },
        { $match: { $or: [{ 'pic.photo_type': { $eq: "PROFILE", $exists: true } }, { 'pic': { $exists: false } }] } },



        {
            $project: {

                "_id": 1,
                "message_status": "$message_status",
                "message":"$message",
                "user": {

                    "user_id": "$"+field,

                    "first_name": "$user.first_name",

                    "last_name": "$user.last_name",

                    "age": "$user.age",

                    "height": "$height.height",

                    "country": "$country.name",

                    "state": "$state.name",

                    "city": "$city.name",
                    "pic": "$pic"
                },

                "send_on": "$send_on"



            }
        }





    ]);
    var options = {
        page: req.body.page,
        limit: req.body.limit
    };
    message.aggregatePaginate(aggregate, options, function (err, results, pageCount, count) {
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

}
exports.getAllMessages = function (req, res) {


    message.find({ user_id: req.body.user_id }, function (err, msgs) {

        res.json({
            success: true,
            msgs: msgs
        });
    });

}

exports.getMessagesCount = function (req, res) {


    var user_id = req.body.user_id;


    message.aggregate([

        {
            "$group": {
                "_id": null,
                "INBOX": {
                    "$sum": {
                        "$cond": [

                            {
                                "$and": [
                                    { "$eq": ["$send_to", user_id] },
                                    { "$ne": ["$message_type", "BLOCK"] },
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
                                    { "$ne": ["$creater_response", "DELETEFORME"] },
                                    { "$ne": ["$creater_response", "DELETEFOREVRYONE"] }

                                ]


                            }

                            , 1, 0]
                    }
                }

            }
        }], function (error, results) {


            res.json(results);
        });

}