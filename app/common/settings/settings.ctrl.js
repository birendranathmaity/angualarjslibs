/* @ngInject */
module.exports = function AccountSettingsController($location, useractions, $scope, $timeout, $rootScope, loginservice, messagesservice) {

    var controller = this;
    controller.modulename = "PROFILE_SETTING";
    controller.delreason = "";
    controller.deleteprofileresons = [
        {
            name: "Marriage Fixed",
            value: "MARRIAGE_FIXED"
        },
        {
            name: "To Many Promotional Cals",
            value: "TO_MANY_PROMOTIONAL_CALS"
        },
        {
            name: "Prefer to Search later",
            value: "PREFER_TO_SEARCH_LATER"
        },
        {
            name: "Not Getting enough matches",
            value: "NOT_GETTING_ENOUGH_MATCHES"
        },
        {
            name: "Partner Search later",
            value: "PARTNER_SEARCH_LATER"
        }
    ];
    controller.loadModule = function (modulename) {
        controller.modulename = modulename;
    };

    //  changeProfileStatus  var aa=$scope.$watch('$ctrl.setting', function(newVal, oldVal){
    //         console.log(newVal);
    //         // useractions.save_settings(newVal,function(res){

    //         //     console.log(res);
    //         // },function(error){});


    //     }, true);

    controller.save = function () {
        useractions.save_settings(controller.setting, function (res) {

            messagesservice.toaster_msg('SUCCESSFULLY_SAVED');
        }, function (error) { });

    };
    controller.setting = {
        user_id: $rootScope.login_user_id,
        message: true,
        photo: true,
        contact: true,
        email: true,
        notification: true

    };
    useractions.get_settings({ user_id: $rootScope.login_user_id }, function (res) {

        if (res.settings) {
            controller.setting = res.settings;
        }

    }, function (error) { });

};