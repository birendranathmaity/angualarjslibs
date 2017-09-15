/* @ngInject */
module.exports = function viewUserController($rootScope, $viewusers, loginservice, $admintaskservice, toastr) {
    var controller = this;
    //controller.loadUserStatusType = "PHOTO_PENDING_APPROVAL";
    var req = {
        page: 1,
        limit: 3
    };
    controller.actionCountPR = 0;
    controller.actionCountRP = 0;
    controller.actionCountAP = 0;
    controller.actionCountPEV = 0;
    controller.loadPageData = function (req) {
        $viewusers.getAllUsersGroupByPhotoStatusCount(function (result) {
            controller.photoStatusCountResult = result;
            if (result.length > 0) {


                controller.loadUserStatusType = "PHOTO_" + result[0]._id;
            }



        }, function () {

        });

        $viewusers.getAllUsersGroupByEmailVrCount(function (result) {
            controller.emailVrCountResult = result;



        }, function () {

        });
        $viewusers.pendingProfilesCount(function (result) {
            controller.pendingProfilesCountResult = result;




        }, function () {

        });
    };
    controller.loadPageData(req);
    controller.loadUsers = function (userStatus) {
        controller.loadUserStatusType = userStatus;


    };
    controller.activeClass = function (type) {
        if (type === controller.loadUserStatusType) {
            return "active-list";
        }

    };
    $rootScope.$on('actionTypeFromViewUser', function ($event, actionTypeCount) {

        if (actionTypeCount.type === "APPROVED") {
            controller.actionCountAP = actionTypeCount.count;
            return;

        }
        if (actionTypeCount.type=== "REJECTED") {
            controller.actionCountRP = actionTypeCount.count;
            return;
        }
        if (controller.loadUserStatusType === "PHOTO_APPROVED") {
           
            return;
        }
        if (controller.loadUserStatusType === "PENDING_EMAIL_VR") {
            controller.actionCountPEV = actionTypeCount.count;
            return;
        }
        if (controller.loadUserStatusType === "INCOMPLETE_PROFILES") {
            return;
        }
        if (controller.loadUserStatusType === "COMPLETED_PROFILES") {
            return;
        }
        if (controller.loadUserStatusType === "REJECTED_PROFILES") {
            return;
        }
        if (controller.loadUserStatusType === "BLOCKED_PROFILES") {
            return;
        }


    });
};