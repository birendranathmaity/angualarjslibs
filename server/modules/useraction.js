var message = require('./model/message.model');
var block = require('./model/block.model');
var setting = require('./model/setting.model');
var request = require('./model/request.model');

exports.sendRequest=function(re,res){

    var requestModel=new request(req.body);
    requestModel.save(function(result){
res.json({
    success:true,
    msg:"SEND_SUCCESS"
})
    });

}
exports.updateRequest=function(re,res){

    request.update(
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
                msg:"UPDATE_SUCCESS",
                result: docs


            });
        });
    
    
    }
    exports.CreateUserBlock=function(re,res){

        var blockModel=new block(req.body);
        blockModel.save(function(result){
res.json({
    success:true,
    msg:"SUCCESS_BLOCK_MSG"
})
    });
        
        }
        exports.updateUserBlock=function(re,res){
            block.update(
                {
                    _id: req.body.block_id,
                    user_id:req.body.block_user_id,

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