/* @ngInject */
module.exports = function composeMailController(config,$scope,loginservice,$uibModal,$uibModalInstance,$rootScope,countryService,messagesservice) {
    
var controller = this;
controller.UserType="SEND_MESSAGE";
controller.config=config;
      controller.user = $rootScope.current_user_de_all;
      
     controller.cancel = function () {
       $uibModalInstance.dismiss('cancel');
      };
      var country = $rootScope.current_user_de_all.basicinfos[0].country;
      var state = $rootScope.current_user_de_all.basicinfos[0].state;
      var city = $rootScope.current_user_de_all.basicinfos[0].city;
      var loc = {
          cn: country,
          st: state,
          ci: city
      };
     
      countryService.getUserLoc(loc, function (result) {
          controller.userLocation = result;
        
      }, function () { });

      var pic= loginservice.getProfilePic();

      controller.photo=pic.profile;
      controller.messageModel={
          
          "user_id": controller.user.user_id,
          "message_status": "UNREAD",
          "message_type": "NORMAL",
          "message": "",
          "send_to":"",
          "send_on":new Date(),
          "recived_on":new Date()
      }
      controller.onBlur=function($event){


        var req={
            user_id:controller.user.user_id,
            send_to:controller.messageModel.send_to,
            gender: $rootScope.login_user_gender
        }
        messagesservice.check_user_currentuser(req,function(result){
            
               console.log(result)
               if(result.type==="USER_NOT_EXITS"){
                   controller.UserType=result.type;

               }
               if(result.type==="USER_BY_BLOCK"){
                controller.UserType=result.type;
              }
              if(result.type==="TOUSER_BY_BLOCK"){
                controller.messageModel.message_status="BLOCK";

                controller.UserType="SEND_MESSAGE";
              }
              if(result.type==="SEND_MESSAGE_REQUEST"){
                controller.UserType=result.type;
              }
              if(result.type==="SEND_MESSAGE"){
                controller.UserType=result.type;
               // controller.errorMsg=result.type;
              }
            },function(error){});
        

      }

      controller.MsgWindow=function(type){

        if(type==="USER_NOT_EXITS"){
           

        }
        if(type==="USER_BY_BLOCK"){
         
       }
       if(type==="TOUSER_BY_BLOCK"){
        
       }
       if(type==="SEND_MESSAGE_REQUEST"){
        
       }
       if(type==="SEND_MESSAGE"){
        // controller.errorMsg=result.type;
       }




      }
    //   $scope.$watch("$ctrl.messageModel.send_to", function(newVal, oldVal) {
    //     if(!newVal){
    //         return;
    //     }
        
    //     var req={
    //         user_id:controller.user.user_id,
    //         send_to:newVal
    //     }
    //     messagesservice.check_user_currentuser(req,function(result){
            
               
            
    //         },function(error){});
        
    //   });
  controller.send=function(){

    if(controller.UserType==="USER_BY_BLOCK"){



    }

messagesservice.send_message(controller.messageModel,function(result){

    if(result.success){
        messagesservice.toaster_msg('Message Successfully send');
        controller.cancel();
        $rootScope.$broadcast('userSendMessageBroadcast', {});
    }

},function(error){});

  }

  if(config.type!="NEW"){
    controller.messageModel.send_to=config.user_id;

  }
  };