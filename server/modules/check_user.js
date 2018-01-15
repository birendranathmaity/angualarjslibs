var message = require('./model/message.model');
var block = require('./model/block.model');
var setting = require('./model/setting.model');
var request = require('./model/request.model');
exports.api={

isBlock:function(data,success){

    block.find(data,function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user.length>0) {

                success(true);
           
                
            }
            else{


                success(false);

               

            }
        }
    });
},
isSetting:function(data,success){
    setting.find(data,function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user.length>0) {
                if(user[0].message=="ALL"){
                    success(true);
                }
                else{
                    success(false);
                }

              
           
                
            }
            else{


                success(true);

               

            }
        }
    });
},
isRequest:function(data,success){
    request.find(data,function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user.length>0) {

                if(user[0].request_status=="ACCEPTED"){
                    success(true,'YES');
                }
                else{
                    success(false,'REMIND');
                }
           
                
            }
            else{


                success(false,'YES');

               

            }
        }
    });
}




}
