var PhotoModel=require('./../model/user.photo.model');
exports.adminAcceptPhoto=function(req,res){

PhotoModel.update(
    { user_id : {$in: req.body.user_ids},
      photo_type:req.body.photo_type,
    }, 

  {$set : {photo_vr:true,photo_vr_msg:"APPROVED"}},
 
  {multi : true},

  function(err, docs) {
   res.json({
                success: true,
                users:docs
              
            });
});

};