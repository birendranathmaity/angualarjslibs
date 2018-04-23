/* @ngInject */
module.exports = function viewUserDirCtrl($scope, $rootScope, $viewusers, $uibModal, loginservice, $admintaskservice, toastr) {

    var controller = this;
    controller.limit = 10;
    controller.total = 0;
    controller.page = 1;
    controller.pages = 0;
    controller.maxSize = 5;
    controller.ActiveUserIds = [];
    controller.PhotoUserIds = [];
    controller.start = 0;
    controller.end = 0;
    var req = {
        page: controller.page,
        limit: controller.limit,
        searchType: null
    };

    $scope.$watch('fields', function (n, v) {
        if (!n) { return; }
        controller.viewType = n;
        req.searchType = n;
        req.page = 1;
        controller.loadViewType();
        controller.userTypeMsgFn();
    });
    controller.userTypeMsgFn = function () {
        controller.userTypeMsg = null;
        controller.userDateMsg = "";
        var type = controller.viewType.photoType;
        if (!controller.viewType.photoType && !controller.viewType.userType) {
            //controller.userTypeMsg =null;
            controller.userDateMsg = "Created on";
        }
        if (controller.viewType.userType && !controller.viewType.photoType) {

            if (controller.viewType.userType === "ACTIVE") {
                controller.userTypeMsg = "Active user";
                controller.userDateMsg = "Activated on";
            }
            if (controller.viewType.userType === "INCOMPLETE") {
                controller.userTypeMsg = "Icomplete user";
                controller.userDateMsg = "Created on";
            }
            if (controller.viewType.userType === "INPROGRESS") {
                controller.userTypeMsg = "Inprogess user";
                controller.userDateMsg = "Created on";
            }
        }
        //  console.log(angular.isDefined(controller.viewType.photoType))
        if (type === "NOT_UPLOADED") {
            controller.userTypeMsg = "Profile photo not uploaded";
            controller.userDateMsg = "Activated on";
        }
        if (type === "PENDING_APPROVAL") {
            controller.userTypeMsg = "Pending for photo approval";
            controller.userDateMsg = "Action on";
        }
        if (type === "APPROVED") {
            controller.userTypeMsg = "Photo verification completed";
            controller.userDateMsg = "Action on";

        }
        if (type === "REJECTED") {
            controller.userTypeMsg = "Photo verification rejected";
            controller.userDateMsg = "Action on";
        }
    }
    controller.loadViewType = function () {


        controller.ActiveUserIds = [];
        controller.PhotoUserIds = [];
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
    function addUserIds() {

        controller.ActiveUserIds = [];
        controller.PhotoUserIds = [];

        angular.forEach(controller.users, function (user) {
            if (user.Selected) {
                if (user.photostatus === "PENDING_APPROVAL") {

                    controller.PhotoUserIds.push(user.user_id);

                }
                if (user.user_status === "INPROGRESS") {

                    controller.ActiveUserIds.push(user.user_id);

                }
            }


        });

    }
    controller.checkAll = function () {

        if (controller.selectedAll) {
            controller.selectedAll = true;
        } else {
            controller.selectedAll = false;
        }
        angular.forEach(controller.users, function (user) {
            if (user.photostatus === "PENDING_APPROVAL") {

                user.Selected = controller.selectedAll;

            }
            if (user.user_status === "INPROGRESS") {
                user.Selected = controller.selectedAll;
            }

        });
        addUserIds();
    };
    controller.checkBoxSelect = function () {

        addUserIds();

    };


    var reqApprove = {
        loginuserid: $rootScope.login_user_id,
        user_ids: [],
        photo_type: "PROFILE",
        photo_vr: true,
        photo_approved_on: new Date(),
        photo_vr_msg: "APPROVED",

    };
    controller.accept = function (user) {

        reqApprove.user_ids = [user.user_id];
        acceptPhotoToServer(reqApprove, [user.user_id], "SINGLE", user.reffresh);


    };
    controller.acceptAll = function (type) {
       
       if (type === "PHOTO") {
            reqApprove.user_ids = controller.PhotoUserIds;
            acceptPhotoToServer(reqApprove,  controller.PhotoUserIds, "ALL", true);
        }

        if (type === "ACTIVE") {
            reqApprove.user_ids = controller.ActiveUserIds;
            controller.activate(controller.ActiveUserIds);
        }
       


    };
    function acceptPhotoToServer(reqData, users, type, reffresh) {

        $admintaskservice.acceptPhoto(reqData, function (res) {


            if (res.result.nModified) {

                if (reqData.photo_vr_msg === "APPROVED") {
                    toastr.success('Successfully accepted');
                }
                if (reqData.photo_vr_msg === "REJECTED") {
                    toastr.success('Successfully rejected');
                }
                if (reffresh) {
                    controller.loadViewType();
                }

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
            // controller.userIds = [];
            controller.ActiveUserIds = [];
            controller.PhotoUserIds = [];
        }


    }
    controller.activate = function (ids) {
        var modalInstance = $uibModal.open({
            animation: true,
            windowClass: "",
            templateUrl: 'app/popuptemplates/delete.modal.html',
            controller: function ($scope) {
                var main = this;
                main.type = "ACTIVATE";
                main.yes = function () {
                    controller.activeAll(ids);
                    modalInstance.dismiss('cancel');
                };
                main.no = function () {
                    modalInstance.dismiss('cancel');
                };


            },
            controllerAs: '$ctrl',
            size: "lg",
            backdrop: 'static',
            keyboard: false,
            resolve: {

            }

        });

    };
    controller.activeAll=function(ids){
        $admintaskservice.activeUser({ user_ids: ids }, function (res) {
            
                            if (res.success) {
                                toastr.success('Successfully activated');
                            }
                            else {
                                toastr.error('not activated');
                            }
            
            
            
                        }, function () { });

    };
    controller.reject = function (user) {
        $admintaskservice.openRejectModal(user);

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
        pos: "top",
        templateUrl: 'app/admin/user/viewuser/photo.view.html'

    };

    controller.popImg = function (index) {

        controller.ImgIndex = index;

    };
    controller.edit = function (user_ID) {

        $rootScope.$broadcast('userEditBoradcast', user_ID);

    };
    var backUserFromEditMode = $scope.$on('backUserFromEditMode', function ($event, user) {
        controller.loadViewType();

    });
    var userPhotoApprove = $scope.$on('userPhotoApprove', function ($event, user) {
        controller.accept(user);

    });
    var rejectPhoto = $scope.$on('rejectPhoto', function ($event, user) {
        var reqData = {
            loginuserid: $rootScope.login_user_id,
            user_ids: [user.user_id],
            photo_type: "PROFILE",
            photo_vr: false,
            photo_approved_on: new Date(),
            photo_vr_msg: "REJECTED",

        };
        console.log("reject Photo");
        acceptPhotoToServer(reqData, [user.user_id], "SINGLE", user.reffresh);


    });

    $scope.$on('$destroy', function () {

        rejectPhoto();
        backUserFromEditMode();
        userPhotoApprove();
    });

};