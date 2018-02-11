/* @ngInject */
module.exports = function headerNotiController($scope, $state, $location, $uibModal, $rootScope, useractions, messagesservice, loginservice, toastr) {

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
    controller.getUnreadMessages = function () {

        var reqMsg = {
            page: 1,
            limit: 10,
            user_id: $rootScope.login_user_id,
            dataType: "UNREADMSG",
            searchType: "INBOX"
        }
        messagesservice.get_messages(reqMsg, function (messages) {

            controller.messages = messages;

        }, function () {

        });


    };
    controller.getnotifications = function () {

        var reqNoti = {
            page: 1,
            limit: 10,
            user_id: $rootScope.login_user_id,
            status: "UNREAD"
        }
        useractions.get_notifications(reqNoti, function (notifications) {


            controller.notifications = notifications;




        }, function (error) {


        });


    };
    controller.getnotifications();
    controller.getUnreadMessages();
    var pics = loginservice.getProfilePic();

    controller.pic = pics.profile;
    controller.isOpenNoti = false;
    controller.isOpenMsg = false;

    controller.isOpenMsgBox = function () {

        if (controller.messages.total === 0) {
            $location.path("/mail");
            controller.isOpenMsg = false;
        }
        else {
            controller.isOpenMsg = true;


        }

    };
    controller.isOpenNotiBox = function () {
        var req = {
            user_id: $rootScope.login_user_id
        };
        if (controller.notifications.total === 0) {
            $location.path("/notifications");
            controller.isOpenNoti = false;
        }
        else {
            controller.isOpenNoti = true;
            useractions.update_notifications(req, function (notifications) {

                controller.notifications.total = 0;
            }, function (error) { });

        }

    };
    controller.viewall = function (TYPE) {
        if (TYPE === "NOTI") {
            $location.path("/notifications");

        }
        if (TYPE === "MSG") {

            $location.path("/mail");

        }

        controller.isOpenNoti = false;
    };
    controller.openReq = function (noti) {
        useractions.openReq(noti);

    };
    controller.viewMessage = function (config, msgId) {
        controller.isOpenMsg = false;

        messagesservice.readMsg(config, msgId);
    };
    var userMessageReadBroadcast = $rootScope.$on('userMessageReadBroadcast', function ($event, get_messages_count) {

        controller.getUnreadMessages();


    });
    var updateNotificationsCount = $rootScope.$on('updateNotificationsCount', function ($event, get_messages_count) {

        controller.getnotifications();

    });
    var userPhotoBoradcastToDisplay = $rootScope.$on('userPhotoBoradcastToDisplay', function ($event, msg) {
        
        controller.pic=msg;
        
            })
    
    $rootScope.$on('$destroy', function () {

        userPhotoBoradcastToDisplay();
        userMessageReadBroadcast();
        updateNotificationsCount();
    });

};