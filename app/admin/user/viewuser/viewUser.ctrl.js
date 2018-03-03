/* @ngInject */
module.exports = function viewUserController($rootScope, $viewusers, $scope,loginservice, $admintaskservice, toastr, $stateParams) {
    var controller = this;

    controller.actionCountPR = 0;
    controller.actionCountRP = 0;
    controller.actionCountAP = 0;
    controller.actionCountPEV = 0;
    controller.userStatusList = [];

controller.isEditUser=false;
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
        controller.isEditUser=false;


    };
    controller.activeClass = function (type) {
        if (type === controller.loadUserStatusType) {
            return "active-list";
        }

    };
    
    var backUserFromEditMode = $scope.$on('backUserFromEditMode', function ($event, userId) {

       controller.editUserId="";
       controller.isEditUser=false;
       //controller.loadusersCountList();
      // controller.loadUserStatusType=controller.loadUserStatusType;
       

    });
    var userEditBoradcast =$scope.$on('userEditBoradcast', function ($event, userId) {

       controller.editUserId=userId;
       controller.isEditUser=true;
       

    });

    var updateUserListCountEmit =$scope.$on('updateUserListCountEmit', function ($event, actionTypeCount) {

        controller.loadusersCountList();


    });
    $scope.$on('$destroy', function () {

        updateUserListCountEmit();
        userEditBoradcast();
        backUserFromEditMode();
    });
};