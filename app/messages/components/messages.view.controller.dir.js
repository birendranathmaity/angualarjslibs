/* @ngInject */
module.exports = function messagesViewDirCtrl($scope, $uibModal, $rootScope, messagesservice, loginservice, toastr) {

    var controller = this;
    controller.limit = 10;
    controller.total = 0;
    controller.page = 1;
    controller.pages = 0;
    controller.maxSize = 5;
    controller.messageIds = [];
    controller.start = 0;
    controller.end = 0;
    var req = {
        user_id: $rootScope.login_user_id,
        page: controller.page,
        limit: controller.limit,
        dataType:"ALL",
        searchType: ""
    };

    $scope.$watch('viewType', function (n, v) {

        if (!n) { return; }

        controller.viewType = n;
        req.searchType = n;
        req.page = 1;
        controller.loadViewType();
    });
    controller.loadViewType = function () {
        console.log("load " + controller.viewType);
        controller.messageIds = [];
        controller.selectedAll = false;


        messagesservice.get_messages(req, function (result) {

            setMessagesData(result);

        }, function () {

        });

    };


    controller.pageChanged = function () {

        controller.selectedAll = false;

        controller.page = controller.page;

        req.page = controller.page;
        controller.loadViewType();

    };


    function setMessagesData(result) {
        controller.messages = [];
        controller.pages = result.pages;
        controller.total = result.total;
        controller.messages = result.docs;

        controller.start = (controller.page - 1) * controller.limit + 1;
        controller.end = controller.start + result.docs.length - 1;
    }
    controller.checkAll = function () {
        controller.messageIds = [];
        if (controller.selectedAll) {
            controller.selectedAll = true;
        } else {
            controller.selectedAll = false;
        }
        angular.forEach(controller.messages, function (message) {
            message.Selected = controller.selectedAll;
            if (message.Selected) {
                controller.messageIds.push(message._id);
            }

        });

    };
    controller.checkBoxSelect = function () {
        controller.messageIds = [];
        angular.forEach(controller.messages, function (message) {
            if (message.Selected) {
                controller.messageIds.push(message._id);
            }


        });

    };




    controller.toFeet = function (ft) {
        if (!ft) { return ""; }
        var inches = (ft * 0.393700787 * 30.48).toFixed(0);
        var feet = Math.floor(inches / 12);
        inches %= 12;

        return feet + " feet " + inches + ' Inc. ';
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
        templateUrl: './app/admin/user/viewuser/photo.view.html'

    };

    controller.popImg = function (index) {

        controller.ImgIndex = index;

    };

    function broadcastComplete() {
        controller.loadViewType();
        $rootScope.$broadcast('userMessageDeleteBroadcast', {});
    }
    controller.delete = function (target) {
        var req = {
            ids: controller.messageIds,
            fields: {}


        };


        if (target === "DELETEFOREVRYONE") {
            req.fields = {
                "creater_response": "DELETEFOREVRYONE",

            };
        }
        if (target === "DELETEFORME") {
            req.fields = {
                "creater_response": "DELETEFORME",

            };
        }

        if (target === "DELETE") {


            req.fields = {
                "reciver_response": "DELETE",

            };
        }

        var modalInstance = $uibModal.open({
            animation: true,
            windowClass: "",
            templateUrl: './app/popuptemplates/delete.modal.html',
            controller: function ($scope) {
                var main = this;
                main.yes = function () {
                    finalDelete();
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

        function finalDelete() {
            messagesservice.update_message_status(req, function (result) {
                if (result.success) {
                    messagesservice.toaster_msg("Successfully Deleted");
                    modalInstance.dismiss('cancel');
                    broadcastComplete();
                }


            }, function () {

            });

        }

    };
    controller.markRead = function (type) {
        var req = {
            ids: controller.messageIds,
            fields: {
                message_status: "READ"
            }


        };
        messagesservice.update_message_status(req, function (result) {
            if (result.success) {
                messagesservice.toaster_msg("Successfully Marked");
                controller.loadViewType();
                
            }


        }, function () {

        });

    };
    controller.viewMessage = function (config, msgId) {

        if (controller.viewType === "SENT") {
            messagesservice.composemail(config);
            return;
        }
        messagesservice.readMsg(config, msgId);
   };
    var userSendMessageBroadcast = $rootScope.$on('userSendMessageBroadcast', function ($event, get_messages_count) {

        controller.loadViewType();


    });
    $rootScope.$on('$destroy', function () {


        userSendMessageBroadcast();

    });


};