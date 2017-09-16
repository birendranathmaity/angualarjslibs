var PhotoModel=require('./../model/user.photo.model');
exports.adminAcceptPhoto=function(req,res){

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