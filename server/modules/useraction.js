var message = require('./model/message.model');
var block = require('./model/block.model');
var setting = require('./model/setting.model');
var request = require('./model/request.model');

exports.sendRequest=function(req,res){
    req.body.created_on=new Date();
var query={
    user_id:req.body.user_id,
    request_user_id:req.body.request_user_id,
    request_type:req.body.request_type
}
    request.findOne(query,function(err,result){

        if(!result){
           
            var requestModel=new request(req.body);
            requestModel.save(function(result){
        res.json({
            success:true,
            msg:"SEND_SUCCESS"
        })
            });

        }
        else{
            // request.update(
            //     query,
        
            //     {
            //         $set: req.body.fields
        
            //     },
        
               
        
            //     function (err, docs) {
        
            //         res.json({
            //             success: true,
            //             msg:"UPDATE_SUCCESS",
            //             result: docs
        
        
            //         });
            //     });

        }

    });

    

}
exports.updateRequest=function(re,res){

    request.update(
        {
            _id: { $in: req.body.ids }
            // user_id:req.body.user_id,
            // request_user_id:req.body.request_user_id,
            // request_type:req.body.request_type
        },

        {
            $set: req.body.fields

        },

        { multi: true },

        function (err, docs) {

            res.json({
                success: true,
                msg:"UPDATE_SUCCESS",
                result: docs


            });
        });
    
    
    }
    exports.CreateUserBlock=function(re,res){

        var query={
            user_id:req.body.user_id,
            block_user_id:req.body.block_user_id
           
        }
        block.findOne(query,function(err,result){
        
                if(!result){

                    req.body.created_on=new Date();
                    var blockModel=new block(req.body);
                    blockModel.save(function(result){
            res.json({
                success:true,
                msg:"SUCCESS_BLOCK"
            })
                });
        
                }
        
            });

        
        
        }
        exports.updateUserBlock=function(req,res){
            req.body.fields.created_on=new Date();
            block.update(
                {
                   
                    user_id:req.body.user_id,
                    block_user_id:req.body.block_user_id

                },
        
                {
                    $set: req.body.fields
        
                },
        
               
        
                function (err, docs) {
        
                    res.json({
                        success: true,
                        msg:"UPDATE_SUCCESS",
                        result: docs
        
        
                    });
                });
            
            }