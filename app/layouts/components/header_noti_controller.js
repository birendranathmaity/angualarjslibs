/* @ngInject */
module.exports = function headerNotiController($scope,socket, $state,toaster, $location, $uibModal, $rootScope, useractions, messagesservice, loginservice) {

    var controller = this;
controller.goState=function(state){
    $state.go(state);

};
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
        route: "root.myprofile",
        icon: "glyphicon glyphicon-user"
    },
    {
        name: "",
        translateKey: "ADD_PHOTO",
        route: "root.addphotos",
        
        icon: "glyphicon glyphicon-picture"
    },
    {
        name: "",
        translateKey: "ACCOUNT_SETTINGS",
        route: "root.settings",
        icon: "glyphicon glyphicon-cog"
    },
    {
        name: "",
        translateKey: "CHANGE_PASSWORD",
        route: "root.changepassword",
        icon: "glyphicon glyphicon-lock"
    },
    // {
    //     name: "",
    //     translateKey: "WHO_CAN_VIEW_MY_PROFILE",
    //     route: "",
    //     icon: "glyphicon glyphicon-eye-open"
    // },
    // {
    //     name: "",
    //     translateKey: "COMPLETE_YOUR_PROFILE",
    //     route: "",
    //     icon: "glyphicon glyphicon-star"
    // },
    {
        name: "",
        translateKey: "LOG_OUT",
        route: "root.logout",

        icon: "glyphicon glyphicon-log-out"
    }

    ];
    controller.logout = function () {
        loginservice.logout(function (res) {

            if (res) {
                $state.go('login');
            }

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
            $state.go("root.mail");
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
            $state.go("root.notifications");
            controller.isOpenNoti = false;
        }
        else {
           
            useractions.update_notifications(req, function (notifications) {
                controller.isOpenNoti = true;
                controller.notifications.total = 0;
            }, function (error) { });

        }

    };
    controller.viewall = function (TYPE) {
        if (TYPE === "NOTI") {
            $state.go("root.notifications");

        }
        if (TYPE === "MSG") {

            $state.go("root.mail");

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
    controller.sounds = {};
    
    controller.play = function(){
    };
    
  
  
  controller.open=function(data){
  
    toaster.pop({
        type: 'custom',
        body:JSON.stringify({
            template: 'app/layouts/components/alert.html', 
            data:data
        
        }),
        
        bodyOutputType: 'templateWithData',
        timeout: 3000
  })

  //  toaster.pop('custom', "", "{template: './app/layouts/components/alert.html', data: 'MyData'}", 900000, 'templateWithData',"toast-top-center");

  }
      //$scope.sounds.sound.play();
    socket.on($rootScope.login_user_id+"MSG",function(data){
    //    console.log(data)
     //   controller.getUnreadMessages();
     controller.messages.docs.unshift(data);
     controller.messages.total++;
     controller.open(data);
        controller.sounds.sound.play();
       
      //  toastr.pop('info', "Hi ", "{template: './app/layouts/components/alert.html', data: 'MyData'}", 15000, 'templateWithData');

    });
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