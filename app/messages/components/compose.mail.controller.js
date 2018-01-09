/* @ngInject */
module.exports = function composeMailController(config,loginservice,$uibModal,$uibModalInstance,$rootScope,countryService,messagesservice) {
    
var controller = this;
console.log(config)
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


  controller.send=function(){
//console.log(controller.messageModel)
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