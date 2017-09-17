/* @ngInject */
module.exports = function viewUserController($rootScope, $viewusers, loginservice, $admintaskservice, toastr, $stateParams) {
    var controller = this;

    controller.actionCountPR = 0;
    controller.actionCountRP = 0;
    controller.actionCountAP = 0;
    controller.actionCountPEV = 0;
    controller.userStatusList = [];


    if ($stateParams.userLoadType) {
        controller.loadUserStatusType = $stateParams.userLoadType;
    }
    else {
        controller.loadUserStatusType = "TOTAL_USERS";
    }
    controller.loadusersCountList = function () {


        $viewusers.get_all_users_status_count(function (result) {

            controller.userStatusList = result[0];


        }, function () {

        });
    };
    controller.loadusersCountList();
    controller.setUserType = function (userStatus) {
        controller.loadUserStatusType = userStatus;


    };
    controller.activeClass = function (type) {
        if (type === controller.loadUserStatusType) {
            return "active-list";
        }

    };
    var updateUserListCountEmit = $rootScope.$on('updateUserListCountEmit', function ($event, actionTypeCount) {

        controller.loadusersCountList();


    });
    $rootScope.$on('$destroy', function () {

        updateUserListCountEmit();
    });
};