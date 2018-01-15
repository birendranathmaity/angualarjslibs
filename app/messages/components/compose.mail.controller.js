/* @ngInject */
module.exports = function composeMailController(useractions, config, $scope, loginservice, $uibModal, $uibModalInstance, $rootScope, countryService, messagesservice) {
  var controller = this;
  controller.UserType = "SEND_MESSAGE";
  controller.config = config;
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

  var pic = loginservice.getProfilePic();

  controller.photo = pic.profile;
  controller.messageModel = {

    "user_id": controller.user.user_id,
    "message_status": "UNREAD",
    "message_type": "NORMAL",
    "message": "",
    "send_to": "",
    "send_on": new Date(),
    "recived_on": new Date()
  }
  controller.onBlur = function ($event) {

    if (!controller.messageModel.send_to) {
      return;
    }
    var req = {
      user_id: controller.user.user_id,
      send_to: controller.messageModel.send_to,
      gender: $rootScope.login_user_gender
    }
    messagesservice.check_user_currentuser(req, function (result) {
      controller.messageModel.message_type = "NORMAL";
      controller.UserType = result.type;
      //  if(result.type==="USER_NOT_EXITS"){
      //      controller.UserType=result.type;

      //  }
      //  if(result.type==="USER_BY_BLOCK"){
      //   controller.UserType=result.type;
      // }
      if (result.type === "TOUSER_BY_BLOCK") {
        controller.messageModel.message_type = "BLOCK";

        controller.UserType = "SEND_MESSAGE";
      }
      // if(result.type==="SEND_MESSAGE_REQUEST"){
      //   controller.UserType=result.type;
      // }
      // if(result.type==="SEND_MESSAGE"){
      //   controller.UserType=result.type;
      //  // controller.errorMsg=result.type;
      // }
    }, function (error) { });


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
  controller.send = function () {

    if (controller.UserType === "USER_BY_BLOCK") {
      var reqBlcok = {
        user_id: controller.user.user_id,
        block_user_id: controller.messageModel.send_to,
        fields: {
          block_status: "UNBLOCK"
        }

      }


      useractions.update_user_block(req, function (result) {
        if (result.success) {
          messagesservice.toaster_msg('Successfully unbloked');
          controller.onBlur();

        }


      }, function (error) { });
      return;

    }
    if (controller.UserType === "SEND_MESSAGE_REQUEST") {

      var reqMsg = {
        user_id: controller.user.user_id,
        request_user_id: controller.messageModel.send_to,
        request_type: "MESSAGE",
        request_status: "UNREAD"

      }

      useractions.send_request(reqMsg, function (result) {
        if (result.success) {
          messagesservice.toaster_msg('Successfully sent');
          controller.cancel();

        }


      }, function (error) { });
      return;

    }
    if (controller.UserType === "SEND_MESSAGE") {
      messagesservice.send_message(controller.messageModel, function (result) {

        if (result.success) {
          messagesservice.toaster_msg('Message Successfully send');
          controller.cancel();
          $rootScope.$broadcast('userSendMessageBroadcast', {});
        }

      }, function (error) { });
    }

  }

  if (config.type != "NEW") {
    controller.messageModel.send_to = config.user_id;
    controller.onBlur();
  }
};