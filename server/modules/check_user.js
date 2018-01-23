var message = require('./model/message.model');
var block = require('./model/block.model');
var setting = require('./model/setting.model');
var request = require('./model/request.model');
exports.api={
getFinalUsersData:function(results,user_id,success){
    if(results.length==0){
        success(results);
    }

    var total = results.length;
    var count = 0;
    var main=this;
    for(var i = 0; i < total; i++){
        (function(index){
           
           main.checkPhotoVisibiltyUser(results[index].user,user_id,function(user){
                
                  results[index].user=user;
                  count++;
                  if (count > total - 1) success(results);
             });

        }(i));
    }
    
    


},

checkPhotoVisibiltyUser:function(user,user_id,success){
    
   var pic=this.isPhotoUploaded(user.pic);

    if(pic.view=="CONFIRM"){
    
    
        if(user.setting){
            
                if(user.setting.photo){
    
                    user.pic=pic;
                    success(user);
            
                }
                else{
                  
                    var dataReq={
                        user_id: user_id,
                        request_user_id: user.user_id,
                        request_type: "PHOTO"
    
                    }
                   
    
                       
                        this.isRequest(dataReq, function (isrequested, remind) {
                           
                                     
                                                if(isrequested){
                                                    user.pic=pic; 
                                                    success(user);
                                                }
                                                else{
                            
                                                    user.pic={
                                                        view:"BLUR",
                                                        displaypic:{}
                                    
                                                    }
                                                    success(user);
                                                }
                            
                            
                                            });
                    
                   
    
                   
                }
            }
            else{
                user.pic=pic; 
                success(user);
            }
    
    }
    else{
        user.pic=pic;
        success(user);
    }
    
   
       
    
    
    },
isPhotoUploaded:function(pics){
var temp=[];
    if(pics.length>0){

        for(var i=0;i<pics.length;i++){

            if(pics[i].photo_type=="PROFILE" && pics[i].photo_vr){

                temp.push( {
                    view:"CONFIRM",
                    displaypic:pics[i]
                });
               
            }
            else if(pics[i].photo_type=="PROFILE" && !pics[i].photo_vr){

                temp.push( {
                    view:"EMPTY",
                    displaypic:{}
                });
               

            }
        }
        if(temp.length>0){

            return temp[0];
        }
        else{
            return {
                view:"EMPTY",
                displaypic:{}
            }
        }
    }
    else{
        return {
            view:"EMPTY",
            displaypic:{}
        }
    }

},
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
                if(user[0].message){
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

                if(user[0].request_action=="ACCEPTED"){
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
