/* @ngInject */
module.exports = function notificationController($location, useractions, $scope, $timeout, $rootScope, loginservice, messagesservice) {
    var controller = this;
    controller.limit = 10;
    controller.total = 0;
    controller.page = 1;
    controller.pages = 0;
    controller.maxSize = 5;
    controller.requestIds = [];
    controller.start = 0;
    controller.end = 0;
    var req = {
        user_id: $rootScope.login_user_id,
        page: controller.page,
        limit: controller.limit,
        status: "READ"

    };
    controller.loadViewType = function () {

        controller.requestIds = [];
        controller.selectedAll = false;


        useractions.get_notifications(req, function (notifications) {

            setMessagesData(notifications);

        }, function () {

        });

    };

    controller.loadViewType();
    controller.pageChanged = function () {

        controller.selectedAll = false;

        controller.page = controller.page;

        req.page = controller.page;
        controller.loadViewType();

    };


    function setMessagesData(result) {
        controller.notificatins = [];
        controller.pages = result.pages;
        controller.total = result.total;
        controller.notificatins = result.docs;

        controller.start = (controller.page - 1) * controller.limit + 1;
        controller.end = controller.start + result.docs.length - 1;
    }




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



    function broadcastComplete() {
        controller.loadViewType();
        $rootScope.$broadcast('userRequestsBroadcastUpdate', {});
    }
    controller.action = function (target, ids) {
        var req = {
            ids: ids,
            update_type: "UPDATE",
            request_type: $scope.requestType,
            fields: {}


        };

        if (target === "ACCEPTED") {
            req.fields = {
                "request_action": "ACCEPTED",
                "recived_on": new Date()

            };
        }
        if (target === "PENDING") {
            req.fields = {
                "request_action": "PENDING",
                "recived_on": new Date()

            };
        }
        if (target === "REJECTED") {
            req.fields = {
                "request_action": "REJECTED",
                "recived_on": new Date()

            };
        }
        if (target === "DELETEFOREVRYONE") {
            req.fields = {
                "creater_response": "DELETEFOREVRYONE",
                "recived_on": new Date()

            };
        }
        if (target === "DELETEFORME") {
            req.fields = {
                "creater_response": "DELETEFORME",
                "recived_on": new Date()

            };
        }

        if (target === "DELETE") {


            req.fields = {
                "reciver_response": "DELETE",
                "recived_on": new Date()

            };
        }

        var modalInstance = $uibModal.open({
            animation: true,
            windowClass: "",
            templateUrl: 'app/popuptemplates/delete.modal.html',
            controller: function ($scope) {
                var main = this;
                main.type = "PROCEED";
                main.yes = function () {
                    finalaction();
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

        function finalaction() {
            messagesservice.update_requests(req, function (result) {
                if (result.success) {
                    messagesservice.toaster_msg("SUCCESSFULLY_UPDATED");
                    modalInstance.dismiss('cancel');
                    broadcastComplete();
                }


            }, function () {

            });

        }

    };

    controller.openReq = function (noti) {
        useractions.openReq(noti);

    };

};