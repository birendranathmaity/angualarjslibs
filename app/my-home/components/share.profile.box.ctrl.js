/* @ngInject */
module.exports = function shareProfileBoxCtrl($crypto,messagesservice,loginservice,$uibModalInstance,$filter,$rootScope,useractions) {
    var controller = this;
     //modal close button//
     controller.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    var pic = loginservice.getProfilePic();
    controller.pic = pic.profile;
    controller.shareProfilModel={
        user_id:$rootScope.login_user_id,
        receiver_email:"",
        share_id:$crypto.encrypt($rootScope.login_user_id),
        name:"",
        msg:""
    };
    controller.emailValidator = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!re.test(email)) {
            return $filter('translate')('EMAIL_VALIDATION_MESSAGE');
        }

        return true;

    };
    controller.required = function (key) {
        return $filter('translate')(key);
    };
    controller.shareProfile = function () {
        // 
        useractions.share_profile(controller.shareProfilModel, function (result) {
            if (result.success) {
                messagesservice.toaster_msg('SUCCESSFULLY_SENT');
            }

        }, function (error) { });
    };
}