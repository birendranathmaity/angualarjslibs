var PhotoModel=require('./../model/user.photo.model');
var requestModel = require('./../model/request.model');
exports.adminAcceptPhoto=function(req,res){
var tm=[];
for(var i=0;i<req.body.user_ids.length;i++){
    var item={
      "user_id": req.body.loginuserid,
      "request_user_id": req.body.user_ids[i],
      "request_status":"UNREAD",
      "request_type":"ADMIN_PHOTO_APPROVAL",
      "request_action":"",
      "created_on":new Date()
    
    }
    if(req.body.photo_type=="PROFILE" && req.body.photo_vr_msg=="APPROVED"){
      item.request_action="ACPT";
      var rest=new requestModel(item);
      rest.save(function(){});
     // tm.push(item)
    }
    if(req.body.photo_type=="PROFILE" && req.body.photo_vr_msg=="REJECTED"){
      item.request_action="REJECT";
      var rest=new requestModel(item);
      rest.save(function(){});
      
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
    
   res.json({
                success: true,
                result:docs
               
              
            });
});

};