/* @ngInject */
module.exports = function headerNotiController($scope, $location,$uibModal, $rootScope, useractions, loginservice, toastr) {

    var controller = this;

    controller.notifn = {
        notiUrl: './app/layouts/components/noti.html',
        msgUrl: "./app/layouts/components/msg.html",
        proUrl: './app/layouts/components/profileDropDown.html',
        position: 'bottom',
        proPos: 'bottom'
    };
    controller.profileSettingsData = [{
        name: "",
        translateKey: "MY_PROFILE",
        route: "",
        icon: "glyphicon glyphicon-user"
    },
    {
        name: "",
        translateKey: "ADD_PHOTO",
        route: "",
        icon: "glyphicon glyphicon-picture"
    },
    {
        name: "",
        translateKey: "ACCOUNT_SETTINGS",
        route: "",
        icon: "glyphicon glyphicon-cog"
    },
    {
        name: "",
        translateKey: "CHANGE_PASSWORD",
        route: "",
        icon: "glyphicon glyphicon-lock"
    },
    {
        name: "",
        translateKey: "WHO_CAN_VIEW_MY_PROFILE",
        route: "",
        icon: "glyphicon glyphicon-eye-open"
    },
    {
        name: "",
        translateKey: "COMPLETE_YOUR_PROFILE",
        route: "",
        icon: "glyphicon glyphicon-star"
    },
    {
        name: "",
        translateKey: "LOG_OUT",
        route: "",

        icon: "glyphicon glyphicon-log-out"
    }

    ];
    controller.logout = function () {
        loginservice.logout(function (res) {

            if (res.success) {
                $location.path('/');
            }

        }, function () {

        });
    };
    controller.configScollBar = {
        autoHideScrollbar: false,
        theme: 'rounded-dark',
        axis: 'y',
        setHeight: "250px",

        scrollButtons: {
            scrollAmount: 'auto', // scroll amount when button pressed 
            enable: true // enable scrolling buttons by default 
        },
        advanced: {
            updateOnContentResize: true
        }
    };

    controller.getnotifications = function () {

        var req = {
            page: 1,
            limit: 10,
            user_id: $rootScope.login_user_id,
            status: "UNREAD"
        }
        useractions.get_notifications(req, function (notifications) {


            controller.notifications = notifications;




        }, function (error) {


        });


    }
    controller.getnotifications();
    controller.isOpenNoti=false;

    controller.isOpenNotiBox=function(){
        //controller.isOpenNoti=true;
        $location.path("/notifications");
    }



}