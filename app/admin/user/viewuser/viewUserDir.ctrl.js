/* @ngInject */
module.exports = function viewUserDirCtrl($scope, $rootScope, $viewusers, loginservice, $admintaskservice, toastr) {

    var controller = this;
    controller.limit = 10;
    controller.total = 0;
    controller.page = 1;
    controller.pages = 0;
    controller.maxSize = 5;
    controller.userIds = [];
    controller.start = 0;
    controller.end = 0;
    var req = {
        page: controller.page,
        limit: controller.limit,
        searchType: ""
    };

    $scope.$watch('viewType', function (n, v) {
        if (!n) {return;}
        controller.viewType = n;
        req.searchType = n;
        controller.loadViewType();
    });
    controller.loadViewType = function () {
        controller.userIds = [];
        controller.selectedAll = false;


        $viewusers.getUsers(req, function (result) {

            setUserData(result);

        }, function () {

        });

    };


    controller.pageChanged = function () {

        controller.selectedAll = false;

        controller.page = controller.page;

        req.page = controller.page;
        controller.loadViewType();

    };


    function setUserData(result) {
        controller.users = [];
        controller.pages = result.pages;
        controller.total = result.total;
        controller.users = result.docs;

        controller.start = (controller.page - 1) * controller.limit + 1;
        controller.end = controller.start + result.docs.length - 1;
    }
    controller.checkAll = function () {
        controller.userIds = [];
        if (controller.selectedAll) {
            controller.selectedAll = true;
        } else {
            controller.selectedAll = false;
        }
        angular.forEach(controller.users, function (user) {
            user.Selected = controller.selectedAll;
            if (user.Selected) {
                controller.userIds.push(user.user_id);
            }

        });

    };
    controller.checkBoxSelect = function () {
        controller.userIds = [];
        angular.forEach(controller.users, function (user) {
            if (user.Selected) {
                controller.userIds.push(user.user_id);
            }


        });

    };


    var reqApprove = {
        user_ids: [],
        photo_type: "PROFILE",
        photo_vr: true,
        photo_approved_on: new Date(),
        photo_vr_msg: "APPROVED",

    };
    controller.accept = function (user) {

        reqApprove.user_ids = [user.user_id];
        acceptPhotoToServer(reqApprove, [user.user_id], "SINGLE");


    };
    controller.acceptAll = function () {

        reqApprove.user_ids = controller.userIds;
        acceptPhotoToServer(reqApprove, controller.userIds, "ALL");


    };
    function acceptPhotoToServer(reqData, users, type) {

        $admintaskservice.acceptPhoto(reqData, function (res) {


            if (res.result.nModified) {

                if (reqData.photo_vr_msg === "APPROVED") {
                    toastr.success('Successfully accepted');
                }
                if (reqData.photo_vr_msg === "REJECTED") {
                    toastr.success('Successfully rejected');
                }
                resetUserList(users, type);
                $rootScope.$broadcast('updateUserListCountEmit', {});

            }

        }, function () { });
    }
    function resetUserList(usersIds, type) {
        controller.loadViewType();

        // angular.forEach(usersIds, function (user_ID) {

        //     controller.users = $.grep(controller.users, function (e) {

        //         return e.user_id !== user_ID;
        //     });
        //     controller.end = controller.end - 1;


        // });
        if (type === "ALL") {
            controller.userIds = [];
        }


    }

    controller.reject = function (user) {
        $admintaskservice.openRejectModal(user);

    };
    controller.toFeet = function (ft) {
        if (!ft) {return "";}
        var inches = (ft * 0.393700787 * 30.48).toFixed(0);
        var feet = Math.floor(inches / 12);
        inches %= 12;

        return feet + " feet " + inches + ' Inc. ';
    };
    controller.openImageUploadWindow = function (user) {
        loginservice.openCropPopup(user);

    };

    controller.configScollBar = {
        autoHideScrollbar: true,
        theme: 'rounded-dark',
        axis: 'y',
        setHeight: 473,
        scrollInertia: 0,
        scrollButtons: {
            scrollAmount: 'auto', // scroll amount when button pressed 
            enable: true // enable scrolling buttons by default 
        },
        advanced: {
            updateOnContentResize: true
        }
    };

    controller.photoView = {
        pos:"right",
        templateUrl: './app/admin/user/viewuser/photo.view.html'

    };

    controller.popImg = function (index) {

        controller.ImgIndex = index;

    };

    var rejectPhoto=$rootScope.$on('rejectPhoto', function ($event, user) {
        var reqData = {
            user_ids: [user.user_id],
            photo_type: "PROFILE",
            photo_vr: false,
            photo_approved_on: new Date(),
            photo_vr_msg: "REJECTED",

        };
       
        acceptPhotoToServer(reqData, [user.user_id], "SINGLE");


    });

$rootScope.$on('$destroy', function () {
   
    rejectPhoto();
});

};