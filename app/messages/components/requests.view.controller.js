/* @ngInject */
module.exports = function requestsViewDirCtrl($scope, $uibModal, $rootScope, messagesservice, loginservice, toastr) {
    
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
            searchType: "",
            request_type:$scope.requestType
        };
    
        $scope.$watch('viewType', function (n, v) {
    
            if (!n) { return; }
    
            controller.viewType = n;
            controller.requestType=$scope.requestType;
            req.searchType = n;
            req.page = 1;
            controller.loadViewType();
        });
        controller.loadViewType = function () {
            
            controller.requestIds = [];
            controller.selectedAll = false;
    
    
            messagesservice.get_requests(req, function (result) {
   
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
            controller.requests = [];
            controller.pages = result.pages;
            controller.total = result.total;
            controller.requests = result.docs;
    
            controller.start = (controller.page - 1) * controller.limit + 1;
            controller.end = controller.start + result.docs.length - 1;
        }
        controller.checkAll = function () {
            controller.requestIds = [];
            if (controller.selectedAll) {
                controller.selectedAll = true;
            } else {
                controller.selectedAll = false;
            }
            angular.forEach(controller.requests, function (req) {
                req.Selected = controller.selectedAll;
                if (req.Selected) {
                    controller.requestIds.push(req._id);
                }
    
            });
    
        };
        controller.checkBoxSelect = function () {
            controller.requestIds = [];
            angular.forEach(controller.requests, function (req) {
                if (req.Selected) {
                    controller.requestIds.push(req._id);
                }
    
    
            });
    
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
    
        
    
        function broadcastComplete() {
            controller.loadViewType();
            $rootScope.$broadcast('userRequestsBroadcastUpdate', {});
        }
        controller.action = function (target,ids) {
            var req = {
                ids: ids,
                update_type:"UPDATE",
                request_type:$scope.requestType,
                fields: {}
    
    
            };
    
            if (target === "ACCEPTED") {
                req.fields = {
                    "request_action": "ACCEPTED",
                    "recived_on":new Date()
    
                }
            }
            if (target === "PENDING") {
                req.fields = {
                    "request_action": "PENDING",
                    "recived_on":new Date()
    
                }
            }
            if (target === "REJECTED") {
                req.fields = {
                    "request_action": "REJECTED",
                    "recived_on":new Date()
    
                }
            }
            if (target === "DELETEFOREVRYONE") {
                req.fields = {
                    "creater_response": "DELETEFOREVRYONE",
                    "recived_on":new Date()
    
                }
            }
            if (target === "DELETEFORME") {
                req.fields = {
                    "creater_response": "DELETEFORME",
                    "recived_on":new Date()
    
                }
            }
    
            if (target === "DELETE") {
    
    
                req.fields = {
                    "reciver_response": "DELETE",
                    "recived_on":new Date()
    
                }
            }
    
            var modalInstance = $uibModal.open({
                animation: true,
                windowClass: "",
                templateUrl: './app/popuptemplates/delete.modal.html',
                controller: function ($scope) {
                    var main = this;
                    main.yes = function () {
                        finalaction();
                    }
                    main.no = function () {
                        modalInstance.dismiss('cancel');
                    }
    
    
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
                        messagesservice.toaster_msg("Successfully updated");
                        modalInstance.dismiss('cancel');
                        broadcastComplete();
                    }
    
    
                }, function () {
    
                });
    
            }
    
        }
       
     
    
    
    };