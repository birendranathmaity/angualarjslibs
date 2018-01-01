var message = require('./../model/message.model');


exports.saveMessage=function(req,res){


    var messageModel = new message(req.body);
    
    messageModel.save(function(err, msg) {
      //  saveUserProfileStatus(user.user_id, {email_vr: false, phone_vr: false,more_info_vr: false});
       res.json({
success:true



       })
       });

}
exports.updateMessage=function(req,res){
    
    
    message.update({ _id: req.body.msg_id},req.body,function(err,msg){
        
         res.json({
                                success: true,
                                data: "ms gupdated"
                            });
            });
    
    }

    exports.getMessage=function(req,res){
        
        
        message.find({ _id: req.body.msg_id},function(err,msg){
            
             res.json({
                                    success: true,
                                    msg: msg
                                });
                });
        
        }
        exports.getAllMessages=function(req,res){
            
            
            message.find({ user_id: req.body.user_id},function(err,msgs){
                
                 res.json({
                                        success: true,
                                        msgs: msgs
                                    });
                    });
            
            }