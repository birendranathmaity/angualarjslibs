/* @ngInject */
module.exports = function (messagesservice, $uibModal,loginservice,$location, useractions, $rootScope) {
    return {
        restrict: 'E',
        templateUrl: 'app/matches/components/contact.button.html',
        controllerAs: '$ctrl',
        scope: {
            user: "="
        },

        controller: [
            '$scope',
            '$element',
            '$attrs',
            function ($scope, $element, $attrs) {
                var controller = this;
                $scope.$watch('user', function (newVal, oldVal) {
                    if (!newVal) {
                        return;
                    }
                    controller.config = $scope.user.contact_btn;
                    controller.isContacted = $scope.user.is_contacted;
                    controller.is_user_by_block = $scope.user.is_user_by_block;
                    controller.is_blocked_profile = $scope.user.is_blocked_profile;
                });
                controller.unBlock = function () {
                    var reqBlock = {
                        user_id: $rootScope.login_user_id,
                        block_user_id: $scope.user.user_id,
                        block_status: "UNBLOCK"

                    };


                    useractions.create_user_block(reqBlock, function (result) {
                        if (result.success) {
                            messagesservice.toaster_msg('SUCCESSFULLY_UNBLOKED');
                            controller.is_blocked_profile = false;
                            $rootScope.$broadcast('userUnblock');
                        }


                    }, function (error) { });
                };
                function alertPopup() {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        windowClass: "",
                        templateUrl: 'app/popuptemplates/delete.modal.html',
                        controller: function ($scope) {
                            var main = this;
                            main.type = "UNBLOCK";
                            main.yes = function () {
                                controller.unBlock();
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
                }
                controller.checkBlock = function (type, sendNoti) {
                    var isAuthenticated = loginservice.isAuthenticated();
                    if (!isAuthenticated.isAuth){
                        $location.path("/login");
                        return;
                    }
                    if (controller.is_blocked_profile) {
                        alertPopup();
                        return;
                    }
                    else {
                        if (type === 'VIEW') {

                            controller.viewContact(sendNoti);
                        }
                        if (type === 'REQ') {
                            controller.requestContact();
                        }

                    }


                };
                controller.isOpen = false;
                controller.contactpop = {
                    pos: "top",
                    templateUrl: 'app/matches/components/contact.pop.html'

                };


                function callReq(request_type) {
                    var reqContact = {
                        user_id: $rootScope.login_user_id,
                        request_user_id: $scope.user.user_id,
                        request_type: request_type,
                        request_status: (controller.is_user_by_block === "BLOCK" ? "BLOCK" : "UNREAD")

                    };

                    useractions.send_request(reqContact, function (result) {
                        if (result.success) {
                            if (request_type === "CONTACT") {
                                messagesservice.toaster_msg('SUCCESSFULLY_SENT');
                                controller.config = {
                                    view_contact: false,
                                    alreadysent: true,
                                    decline: false,
                                    send_request: false
                                };
                            }
                            if (request_type === "CONTACTED") {
                                controller.isContacted = "CONTACTED";
                            }

                        }


                    }, function (error) { });
                }
                controller.requestContact = function () {
                    callReq("CONTACT");
                };
                controller.viewContact = function (sendNoti) {
                    controller.isOpen = true;
                    if (sendNoti) {
                        if($rootScope.login_user_id!=$scope.user.user_id){
                            callReq("CONTACTED");
                        }
                        
                    }


                };
                var userBlockUnblock = $scope.$on('userBlockUnblock', function ($event, msg) {
                    if (msg.block) {
                        controller.is_blocked_profile = true;
                    }
                    else {
                        controller.is_blocked_profile = false;
                    }


                });

                $scope.$on('$destroy', function () {

                    userBlockUnblock();

                });

            }]
    };
};