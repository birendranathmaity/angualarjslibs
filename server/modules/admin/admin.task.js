var PhotoModel=require('./../model/user.photo.model');
var UserModel=require('./../model/user.model');
var requestModel = require('./../model/request.model');
var check = require('./../check_user');
var global = require('./../../setGlobal');
exports.admin_active_user=function(req,res){

  UserModel.findOneAndUpdate({ user_id: req.body.user_id }, { $set: { user_status: "ACTIVE" } }, { new: true }, (error, result) => {
    
            if (error) {
              res.json({success:false});
            } else {
if(result){
  res.json({success:true});
 
}
else{
  res.json({success:false});
}
            }
          
          });

}
exports.adminAcceptPhoto=function(req,res){
  
  function onlineUserEmitNoti(success) {
            var users=req.body.user_ids;
            var total = users.length;
            var count = 0;
            var main = this;
            for (var i = 0; i < total; i++) {
                (function (index) {
                  var item={
                    "user_id": req.body.loginuserid,
                    "request_user_id": users[index],
                    "request_status":"UNREAD",
                    "request_type":"ADMIN_PHOTO_APPROVAL",
                    "request_action":"",
                    "created_on":new Date()
                  
                  }
                  if(req.body.photo_type=="PROFILE" && req.body.photo_vr_msg=="APPROVED"){
                    item.request_action="ACPT";
                   
                  }
                  if(req.body.photo_type=="PROFILE" && req.body.photo_vr_msg=="REJECTED"){
                    item.request_action="REJECT";
                   }
                 
                  requestModel.update({
                    "user_id": req.body.loginuserid,
                    "request_user_id": users[index],
                    "request_type":"ADMIN_PHOTO_APPROVAL"
                  
                  },item,{upsert: true},function(err,result){});
                 
                  check.api.isOnline(users[index], function (isOnline) {
                        count++;

                        if (isOnline) {
                          var emitdata = {
                            _id: index,
                           "request_status":"UNREAD",
                            "request_type":"ADMIN_PHOTO_APPROVAL",
                            request_action: item.request_action,
                            "whosent": "SENT",
                            user:  {
                              "user_id": "Dholbaaje.com",
                              "first_name": "Admin",
                              "last_name": "",
                              pic:{
                                view:"CONFIRM",
                                displaypic:{
                                  photo_path:"admin.png",
                                  photo_vr:true
                                }
                              }
                         },
                            date: new Date()
                        }

                        global.emit(users[index] + "NOTI", emitdata);
    
                        }
    
                        if (count > total - 1) success(true); return;
    
                    });
    
    
                }(i));
            }
    
    
        }
PhotoModel.update(
    { user_id : {$in: req.body.user_ids},
      photo_type:req.body.photo_type,
    }, 

  {$set : {
    photo_vr:req.body.photo_vr,
    photo_approved_on:new Date(),
    photo_vr_msg:req.body.photo_vr_msg}},
 
  {multi:true},

  function(err, docs) {

    onlineUserEmitNoti(function (scc) {
      res.json({
        success: true,
        result:docs
       
      
    });

  });
    
  
});

};