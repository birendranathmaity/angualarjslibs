var request = require('./../model/request.model');
//console.log(new Date())

exports.getRequestsCount = function (req, res) {

    var user_id = req.body.user_id;
    var request_type = req.body.request_type;

    request.aggregate([

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
        }], function (error, results) {


            res.json(results);
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
            request_action:{$nin: ["ACCEPTED","REJECTED","PENDING"]}
        };

        fields = {
            request_status:"READ",
            recived_on:new Date()

        }
    }
    else {
        query = {
            _id: { $in: req.body.ids }
        };
        req.body.fields.request_status="UNREAD";
        req.body.fields.recived_on=new Date();
        fields = req.body.fields;
    }
    request.update(
        query,

        {
            $set: fields

        },

        { multi: true },

        function (err, docs) {

            res.json({
                success: true,
                result: docs


            });
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
            "request_status":{ "$eq": "READ" },
            "request_type":{ "$eq": req.body.request_type }, 
            "reciver_response":{ "$ne": "DELETE" },
            "creater_response": { "$nin": ["DELETEFORME", "DELETEFOREVRYONE"] }
        };
        field = "user_id";
        dateType="created_on";
    }
    if (searchType == "ACCEPTED") {
        match = {

            "request_user_id": { "$eq": req.body.user_id },
            "request_action":{ "$eq": "ACCEPTED" },
            "request_type":{ "$eq": req.body.request_type }, 
            "reciver_response":{ "$ne": "DELETE" },
            "creater_response": { "$nin": ["DELETEFORME", "DELETEFOREVRYONE"] }
        };
        field = "user_id";
        dateType="recived_on";
    }
    if (searchType == "REJECTED") {
        match = {

            "request_user_id": { "$eq": req.body.user_id },
            "request_action":{ "$eq": "REJECTED" },
            "request_type":{ "$eq": req.body.request_type }, 
            "reciver_response":{ "$ne": "DELETE" },
            "creater_response": { "$nin": ["DELETEFORME", "DELETEFOREVRYONE"] }
        };
        field = "user_id";
        dateType="recived_on";
    }
    if (searchType == "PENDING") {
        match = {

            "request_user_id": { "$eq": req.body.user_id },
            "request_action":{ "$eq": "PENDING" },
            "request_type":{ "$eq": req.body.request_type }, 
            "reciver_response":{ "$ne": "DELETE" },
            "creater_response": { "$nin": ["DELETEFORME", "DELETEFOREVRYONE"] }
        };
        field = "user_id";
        dateType="created_on";
    }
    if (searchType == "SENT") {
        match = {

            "user_id": { "$eq": req.body.user_id },
            "request_type":{ "$eq": req.body.request_type },
            "creater_response": { "$nin": ["DELETEFORME", "DELETEFOREVRYONE"] }
        };
        field = "request_user_id";
        dateType="created_on";
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
    
    var date={};
    date[dateType]=-1;
    var aggregate = request.aggregate([

        { $sort: date },
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
                "request_status": "$request_status",
                "request_type": "$request_type",
                "request_action": "$request_action",
                "user": {

                    "user_id": "$" + field,

                    "first_name": "$user.first_name",

                    "last_name": "$user.last_name",

                    "age": "$user.age",

                    "height": "$height.height",

                    "country": "$country.name",

                    "state": "$state.name",

                    "city": "$city.name",
                    "pic": "$pic"
                },

                "created_on": "$" + dateType,



            }
        }





    ]);
    var options = {
        page: req.body.page,
        limit: req.body.limit
    };
    request.aggregatePaginate(aggregate, options, function (err, results, pageCount, count) {
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
