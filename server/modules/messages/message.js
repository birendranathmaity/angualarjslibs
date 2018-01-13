var message = require('./../model/message.model');
var block = require('./../model/block.model');
var check = require('./../check_user');
var User = require('./../model/user.model');
exports.checkSendTouser=function(req, res){
    var query1={
        user_id:req.body.user_id,
        block_user_id:req.body.send_to,
        block_status:"BLOCK"
    }
    var query2={
        user_id:req.body.send_to,
        block_user_id:req.body.user_id,
        block_status:"BLOCK"
    }
    var gender=req.body.gender;
    if(req.body.user_id!=req.body.send_to){
         gender=(req.body.gender =="MALE" ? "FEMALE" : "MALE");
    }
    
   
    User.find({user_id:req.body.send_to,gender:gender},function(err, users) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (users.length>0) {
               
                chkUser(users[0].first_name);
                
            }
            else{

                res.json({
                    success: false,
                    type:"USER_NOT_EXITS",
                    msg: "user does not exits"
                });
               

               

            }
        }
    });
function chkUser(name){
    check.api.isBlock(query1,function(block){

        if(block){
            res.json({
                success: false,
                name:name,
                type:"USER_BY_BLOCK",
                msg:"unblock this user"
    
    
    
            });

        }
        else{
            //
            check.api.isBlock(query2,function(unblock){
                
                        if(unblock){
                            res.json({
                                success: true,
                                name:name,
                                type:"TOUSER_BY_BLOCK",
                                msg:"measssge status block"
                    
                    
                    
                            });
                
                        }
                        else{
                            //
                            check.api.isSetting({ 
                                user_id:req.body.send_to
                               
                            },function(result){
                                
                                        if(result){
                                            res.json({
                                                success: true,
                                                name:name,
                                                type:"SEND_MESSAGE",
                                                msg:"send msg"
                                    
                                    
                                    
                                            });
                                
                                        }
                                        else{

                                            //
                                            var dataReq={ 
                                                user_id:req.body.user_id,
                                                request_user_id:req.body.send_to,
                                                request_type:"MESSAGE",
                                                request_status:"APPROVED"
                                            }
                                            check.api.isRequest(dataReq,function(isrequested){
                                                if(isrequested){
                                                    res.json({
                                                        success: true,
                                                        type:"SEND_MESSAGE",
                                                        name:name
                                            
                                            
                                            
                                                    });
                                        
                                                }
                                                else{
                                                    res.json({
                                                        success: false,
                                                        name:name,
                                                        type:"SEND_MESSAGE_REQUEST",
                                                        msg:"send msg request"
                                            
                                            
                                            
                                                    });

                                                }

                                            });

                                            //
                                
                                            
                                        }
                                        
                                    });
                            //
                
                            
                        }
                        
                    });
                    //

        }
        
    });


}


}
exports.saveMessage = function (req, res) {


    var query1={
        user_id:req.body.user_id,
        block_user_id:req.body.send_to
    }
    var query2={
        user_id:req.body.send_to,
        block_user_id:req.body.user_id
    } 
   

    function addMsg(data){
        var messageModel = new message(data);
        messageModel.save(function (err, msg) {
            res.json({
                success: true
    
    
    
            })
        });

    }
    function isBlock(query){
        block.find(query,function(err, user) {
            if (err) {
                res.json({
                    type: false,
                    data: "Error occured: " + err
                });
            } else {
                if (user.length>0) {

                    req.body.message_type="BLOCK";
    
                    addMsg(req.body);
                    
                    
                }
                else{

                    addMsg(req.body);
                   
    
                }
            }
        });
    }
        block.find(query1,function(err, user) {
            if (err) {
                res.json({
                    type: false,
                    data: "Error occured: " + err
                });
            } else {
                if (user.length>0) {
    
    
                    return  res.json({
                                 success: false,
                                 msg: "Please unblock this user"
                  });
                    
                }
                else{


                    isBlock(query2);

                   
    
                }
            }
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