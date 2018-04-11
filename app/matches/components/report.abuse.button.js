/* @ngInject */
module.exports = function ($uibModal, messagesservice, loginservice, useractions, $rootScope) {
    return {
        restrict: 'E',
        templateUrl: 'app/matches/components/report.abuse.button.html',
        controllerAs: '$ctrl',
        scope: {
            user: "=",
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
                    controller.is_blocked_profile = $scope.user.is_blocked_profile;
                    controller.user = $scope.user;
                });
                function isResonSelected(reportAbuse) {
                    var selectedIds = [];
                    for (var i = 0; i < reportAbuse.length; i++) {
                        if (reportAbuse[i].selected) {
                            selectedIds.push(reportAbuse[i].value);
                        }

                    }
                    return selectedIds;
                }
                controller.ReportAbuse = function () {

                    var modalInstance = $uibModal.open({
                        animation: true,
                        windowClass: "",
                        templateUrl: 'app/matches/components/report.abuse.popup.html',
                        controller: function ($scope) {
                            var main = this;
                            main.reportAbuse = loginservice.getFiledsData('reportAbuse');
                            main.msg = "";
                            main.user = controller.user;
                            main.disabled = function () {
                                if (isResonSelected(main.reportAbuse).length === 0) {
                                    return true;
                                }
                                if (!main.msg) {
                                    return true;
                                }
                            };
                            main.Continue = function () {
                                Continue(main.reportAbuse, main.msg);

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
                    function Continue(reportAbuse, msg) {
                        var modalInstanceConfirm = $uibModal.open({
                            animation: true,
                            windowClass: "",
                            templateUrl: 'app/popuptemplates/delete.modal.html',
                            controller: function ($scope) {
                                var main = this;
                                main.type = "REPORT_ABUSE";
                                main.yes = function () {
                                    finalcall(reportAbuse, msg);
                                    modalInstanceConfirm.dismiss('cancel');
                                    modalInstance.dismiss('cancel');
                                };
                                main.no = function () {
                                    modalInstanceConfirm.dismiss('cancel');
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
                    function finalcall(reportAbuse, msg) {
                        var selectedIds = isResonSelected(reportAbuse);
                        if (selectedIds.length === 0) {
                            return;
                        }
                        if (!msg) {
                            return;
                        }
                        var reqReortAbuse = {
                            user_id: $rootScope.login_user_id,
                            reportabuse_user_id: controller.user.user_id,
                            actionType: "CREATE",
                            reason: selectedIds,
                            message: msg

                        };

                        var reqBlock = {
                            user_id: $rootScope.login_user_id,
                            block_user_id: controller.user.user_id,
                            block_status: "BLOCK"


                        };

                        useractions.create_report_abuse(reqReortAbuse, function (result) {
                            if (result.success) {
                                messagesservice.toaster_msg('SUCCESSFULLY_SENT');
                                $rootScope.$broadcast('userBlockUnblock', { block: true });
                                $rootScope.$broadcast('userBlock', { block: true });
                                controller.is_blocked_profile = "BLOCK";
                            }
                        }, function (error) { });
                        useractions.create_user_block(reqBlock, function (result) {
                            if (result.success) {
                                //  messagesservice.toaster_msg('SUCCESSFULLY_BLOKED');
                                $rootScope.$broadcast('userBlockUnblock', { block: true });
                                controller.is_blocked_profile = "BLOCK";
                            }


                        }, function (error) { });

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