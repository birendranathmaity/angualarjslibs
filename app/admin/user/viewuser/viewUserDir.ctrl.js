/* @ngInject */
module.exports = function viewUserDirCtrl($scope, $rootScope,$viewusers, loginservice, $admintaskservice, toastr) {

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
        vr: false,
        searchtype: ""
    };

    $scope.$watch('viewType', function (n, v) {
        controller.viewType = n;
        controller.loadViewType();
    });
    controller.loadViewType = function () {
        controller.userIds = [];
        controller.selectedAll = false;
        if (controller.viewType === "PHOTO_PENDING_APPROVAL") {
            req.searchtype = "PENDING_APPROVAL";
            req.vr = false;
            $viewusers.getAllUsersGroupByPhotoStatus(req, function (result) {

                setUserData(result);

            }, function () {

            });
            return;

        }
        if (controller.viewType === "PHOTO_REJECTED") {
            req.searchtype = "REJECTED";
            req.vr = false;
            $viewusers.getAllUsersGroupByPhotoStatus(req, function (result) {

                setUserData(result);

            }, function () {

            });
            return;
        }
        if (controller.viewType === "PHOTO_APPROVED") {
            req.searchtype = "APPROVED";
            req.vr = true;
            $viewusers.getAllUsersGroupByPhotoStatus(req, function (result) {

                setUserData(result);

            }, function () {

            });
            return;
        }
        if (controller.viewType === "PENDING_EMAIL_VR") {

            $viewusers.getAllUsersGroupByEmailVr(req, function (result) {

                setUserData(result);

            }, function () {

            });
            return;
        }
        if (controller.viewType === "INCOMPLETE_PROFILES") {
            return;
        }
        if (controller.viewType === "COMPLETED_PROFILES") {
            return;
        }
        if (controller.viewType === "REJECTED_PROFILES") {
            return;
        }
        if (controller.viewType === "BLOCKED_PROFILES") {
            return;
        }
    };


    controller.pageChanged = function () {

        controller.selectedAll = false;

        controller.page = controller.page;

        req.page = controller.page
        controller.loadViewType();
        // controller.loadPageData(req);
    };


    function setUserData(result) {
        controller.users = [];
        controller.pages = result.pages;
        controller.total = result.total;
        controller.users = result.docs;

        controller.start = (controller.page - 1) * controller.limit + 1;
        controller.end = controller.start + result.docs.length - 1;
    };
    controller.loadPageData = function (req) {

        $viewusers.getAllUsersGroupByPhotoStatus(req, function (result) {

            setUserData(result);

        }, function () {

        });

        // $viewusers.getallActiveUsers(req, function (result) {

        //     //controller.page=result.page;


        // }, function () {

        // });
    };
    // controller.loadPageData(req);

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

    //     function setPohtoVr(index){


    //  console.log(controller.users[index])
    //  var photos=controller.users[index].pic;
    //  var i=0;
    //  for(var key in photos){

    //                 if(photos[i].photo_type==="PROFILE"){
    //                    photos[i].photo_vr=true;

    //                 }

    //                i++;
    //             }
    // controller.users[index].pic=photos;
    // console.log(controller.users);

    //     }
 var reqApprove= {
            user_ids: [],
            photo_type: "PROFILE",
            photo_vr: true,
            photo_approved_on: new Date(),
            photo_vr_msg: "APPROVED",

        };
    controller.accept = function (user) {

        reqApprove.user_ids=[user.user_id];
        acceptPhotoToServer(reqApprove,[user.user_id], "SINGLE");


    };
    controller.acceptAll = function () {

        reqApprove.user_ids=controller.userIds;
        acceptPhotoToServer(reqApprove,controller.userIds, "ALL");


    };
    function acceptPhotoToServer(reqData,users, type) {
       
        $admintaskservice.acceptPhoto(reqData, function (res) {
            
            if (res.result.nModified) {

                if(reqData.photo_vr_msg==="APPROVED"){
                     toastr.success('Successfully accepted');
                }
                if(reqData.photo_vr_msg==="REJECTED"){
                     toastr.success('Successfully rejected');
                }
                resetUserList(users, type);
                $rootScope.$emit('actionTypeFromViewUser',{
                       type:reqData.photo_vr_msg,
                        count:res.result.nModified

                    });

            }

        }, function () { });
    };
    function resetUserList(usersIds, type) {

        angular.forEach(usersIds, function (user_ID) {

            controller.users = $.grep(controller.users, function (e) {

                return e.user_id !== user_ID;
            });
            controller.end = controller.end - 1;


        });
        if (type === "ALL") {
            controller.userIds = [];
        }


    };

    controller.reject = function (user) {
        $admintaskservice.openRejectModal(user);

    };
    controller.toFeet = function (ft) {
        if (!ft) return 0;
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
        setHeight: 380,
        scrollInertia: 0,
        scrollButtons: {
            scrollAmount: 'auto', // scroll amount when button pressed 
            enable: true // enable scrolling buttons by default 
        },
        advanced: {
            updateOnContentResize: true
        }
    };
    //     controller.profilepic=function(pics)
    //     {
    //         var img={
    //               src:"dist/assets/img/emptyphoto.png",
    //               watermark:false,
    //               visible:false,

    //         };

    //         if(pics.length>0){
    //             for(var key in pics){
    //                 if(pics[key].photo_type==="PROFILE"){

    //                     img.src="http://"+pics[key].photo_path;
    //                     img.watermark=pics[key].photo_vr;
    //                     //img.visible=(pics[key].photo_vr && pics[key].photo_visibility_status) ? true :false;
    //                     img.visible=pics[key].photo_visibility_status;
    //                      return img;

    //                 }


    //             }
    //         }
    // else{
    //     return img;
    // }

    //     };

    controller.photoView = {

        templateUrl: './app/admin/user/viewuser/photo.view.html'

    };

    controller.popImg = function (index) {

        controller.ImgIndex = index;

    };

 $rootScope.$on('resetPhoto', function($event,user){
var reqData= {
            user_ids: [user.user_id],
            photo_type: "PROFILE",
            photo_vr: false,
            photo_approved_on: new Date(),
            photo_vr_msg: "REJECTED",

        };
 acceptPhotoToServer(reqData,[user.user_id], "SINGLE");


 });



};