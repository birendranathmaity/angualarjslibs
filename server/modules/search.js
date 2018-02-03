var searchBy = require('./model/searchBy.model');
exports.saveSearch=function(req,res){
    searchBy.findOne({
        user_id: req.body.user_id
       
    }, function (err, search) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (search) {
                req.body.updated_on = new Date();
                searchBy.update({ user_id: req.body.user_id }, req.body, function (err, user) {
            
                    res.json({
                        success: true,
                        data: "search updated"
                    });
                });
            } else {
req.body.created_on=new Date();
var searchByModel=new searchBy(req.body);
searchByModel.save(function(err,result){

    res.json({success:true})
});

            }
        }});
};
exports.getSearch=function(req,res){
    searchBy.findOne(req.body,{_id:0},function(err,result){

        res.json(result);
    });


};