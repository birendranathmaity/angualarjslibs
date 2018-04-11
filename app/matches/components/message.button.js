/* @ngInject */
module.exports = function (messagesservice, $uibModal, useractions, $rootScope) {
    return {
        restrict: 'E',
        templateUrl: 'app/matches/components/message.button.html',
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
                    controller.config = $scope.user.message_btn;
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
                controller.checkBlock = function (type) {
                    if (controller.is_blocked_profile) {
                        alertPopup();
                        return;
                    }
                    else {
                        if (type === 'MSG') {
                            controller.sendMsg();
                        }
                        if (type === 'REQ') {
                            controller.sendReq();
                        }

                    }


                };
                controller.sendMsg = function () {
                    var config = {
                        type: "SEND",
                        user_id: $scope.user.user_id

                    };
                    messagesservice.composemail(config);
                };
                controller.sendReq = function () {

                    var reqMsg = {
                        user_id: $rootScope.login_user_id,
                        request_user_id: $scope.user.user_id,
                        request_type: "MESSAGE",
                        request_status: (controller.is_user_by_block === "BLOCK" ? "BLOCK" : "UNREAD")

                    };

                    useractions.send_request(reqMsg, function (result) {
                        if (result.success) {
                            messagesservice.toaster_msg('SUCCESSFULLY_SENT');
                            controller.config = {
                                send_msg: false,
                                alreadysent: true,
                                decline: false,
                                send_request: false
                            };

                        }


                    }, function (error) { });

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