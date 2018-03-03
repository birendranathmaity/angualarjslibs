var message = require('./model/message.model');
var block = require('./model/block.model');
var setting = require('./model/setting.model');
var request = require('./model/request.model');
var user = require('./model/user.model');
var Token = require('./model/user.token.model');
exports.api = {
    getFinalUsersData: function (results, user_id, success) {
        if (results.length == 0) {
            success(results);
            return;
        }

        var total = results.length;
        var count = 0;
        var main = this;
        for (var i = 0; i < total; i++) {
            (function (index) {

                main.checkPhotoVisibiltyUser(results[index].user, user_id, function (user) {

                    if(user.user_role=="ADMIN"){
                        results[index].user =  {
                            "user_id": "Dholbaaje.com",
                            "user_role":"ADMIN",
                            "first_name": "Admin",
                            "last_name": "",
                            pic:{
                              view:"CONFIRM",
                              displaypic:{
                                photo_path:"admin.png",
                                photo_vr:true
                              }
                            }
                       }
                    }
                    else{
                        results[index].user = {
                            "user_id":  user.user_id,
                            "first_name": user.first_name,
                            "last_name": user.last_name,
                            "age": user.age,
                            "height": user.height,
                            "country": user.country,
                            "state": user.state,
                            "city":  user.city,
                            "pic":  user.pic
                            };
                    }
                     
                    count++;
                    if (count > total - 1) success(results);return;
                });

            }(i));
        }




    },

    checkPhotoVisibiltyUser: function (user, user_id, success) {

        var pic = this.isPhotoUploaded(user.pic);

        if (pic.view == "CONFIRM") {


            if (user.setting) {

                if (user.setting.photo) {

                    user.pic = pic;
                    success(user);
                    return;
                }
                else {

                    var dataReq = {
                        user_id: user_id,
                        request_user_id: user.user_id,
                        request_type: "PHOTO"

                    }



                    this.isRequest(dataReq, function (isrequested, remind) {


                        if (isrequested) {
                            user.pic = pic;
                            success(user);
                            return;
                        }
                        else {

                            user.pic = {
                                view: "BLUR",
                                displaypic: {}

                            }
                            success(user);
                            return;
                        }


                    });




                }
            }
            else {
                user.pic = pic;
                success(user);
                return;
            }

        }
        else {
            user.pic = pic;
            success(user);
            return;
        }





    },
    isPhotoUploaded: function (pics) {
        var temp = [];
        if (pics.length > 0) {

            for (var i = 0; i < pics.length; i++) {

                if (pics[i].photo_type == "PROFILE" && pics[i].photo_vr) {

                    temp.push({
                        view: "CONFIRM",
                        displaypic: pics[i]
                    });

                }
                else if (pics[i].photo_type == "PROFILE" && !pics[i].photo_vr) {

                    temp.push({
                        view: "EMPTY",
                        displaypic: {}
                    });


                }
            }
            if (temp.length > 0) {

                return temp[0];
            }
            else {
                return {
                    view: "EMPTY",
                    displaypic: {}
                }
            }
        }
        else {
            return {
                view: "EMPTY",
                displaypic: {}
            }
        }

    },
    isBlock: function (data, success) {

        block.find(data, function (err, user) {
            if (err) {
                res.json({
                    type: false,
                    data: "Error occured: " + err
                });
            } else {
                if (user.length > 0) {

                    success(true);
                    return;

                }
                else {


                    success(false);
                    return;


                }
            }
        });
    },
    isSetting: function (data, success) {
        setting.find(data, function (err, user) {
            if (err) {
                res.json({
                    type: false,
                    data: "Error occured: " + err
                });
            } else {
                if (user.length > 0) {
                    if (user[0].message) {
                        success(true);
                        return;
                    }
                    else {
                        success(false);
                        return;
                    }




                }
                else {


                    success(true);
                    return;


                }
            }
        });
    },
    isRequest: function (data, success) {
        request.find(data, function (err, user) {
            if (err) {
                res.json({
                    type: false,
                    data: "Error occured: " + err
                });
            } else {
                if (user.length > 0) {

                    if (user[0].request_action == "ACCEPTED") {
                        success(true, 'YES');
                        return;
                    }
                    else {
                        success(false, 'REMIND');
                        return;
                    }


                }
                else {


                    success(false, 'YES');
                    return;



                }
            }
        });
    },
    isOnline:function(user_id,success){
        Token.findOne({user_id:user_id,online:'Y'},function(err,user){

if(user){
    success(true);

}else{
    success(false);
}

        });
    },
    getOnlineUser:function(informationId,CompareId,success){
        var main=this;
        user.aggregate([
            
                 
                    {
                        $match: {
                            user_id:informationId
                        
                        }
                    },
            
            
                    { $lookup: { from: "dbusers", localField: "user_id", foreignField: "user_id", as: "user" } },
            
                    { "$unwind": { "path": "$user", "preserveNullAndEmptyArrays": true } },
            //basic info//
            // { $lookup: { from: "userbasicinfos", localField: "user.user_id", foreignField: "user_id", as: "basicinfos" } },
            // { "$unwind": { "path": "$basicinfos", "preserveNullAndEmptyArrays": true } },
            // { $lookup: { from: "countries", localField: "basicinfos.country", foreignField: "id", as: "country" } },
            // { $lookup: { from: "states", localField: "basicinfos.state", foreignField: "id", as: "state" } },
            // { $lookup: { from: "cities", localField: "basicinfos.city", foreignField: "id", as: "city" } },
            
            // { "$unwind": { "path": "$country", "preserveNullAndEmptyArrays": true } },
            // { "$unwind": { "path": "$state", "preserveNullAndEmptyArrays": true } },
            // { "$unwind": { "path": "$city", "preserveNullAndEmptyArrays": true } },
            
            //user setting//
            { $lookup: { from: "settings", localField: "user.user_id", foreignField: "user_id", as: "setting" } },
            { "$unwind": { "path": "$setting", "preserveNullAndEmptyArrays": true } },
            
            //user photos//
            { $lookup: { from: "userphotos", localField: "user.user_id", foreignField: "user_id", as: "pic" } },
            //user height
            // { $lookup: { from: "userintrests", localField: "user.user_id", foreignField: "user_id", as: "height" } },
            // { "$unwind": { "path": "$height", "preserveNullAndEmptyArrays": true } },
            
                    {
                        $project: {
                            _id:0,
                               "user": {
                                 "user_id": "$user.user_id",
                                 "user_role":"$user.user_role",
                                 "first_name": "$user.first_name",
                                 "last_name": "$user.last_name",
                                 "pic": "$pic",
                                 "setting": "$setting"
                            }
            
                           
            
            
            
                        }
                    }
            
            
            
            
            
                ],function(error,result){
                    main.getFinalUsersData(result,CompareId,function(user){
                        if(user.length>0){
                            success(user[0]);
                        }
                        else{
                            success(null);
                        }
                       
                        
                        
                                    });
                   
                });
    }




}
