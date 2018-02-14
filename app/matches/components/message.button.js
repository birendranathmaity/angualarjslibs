/* @ngInject */
module.exports = function (messagesservice, useractions, $rootScope) {
    return {
        restrict: 'E',
        templateUrl: './app/matches/components/message.button.html',
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
                });


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
                        request_status: "UNREAD"

                    };

                    useractions.send_request(reqMsg, function (result) {
                        if (result.success) {
                            messagesservice.toaster_msg('Successfully sent');
                            controller.config = {
                                send_msg: false,
                                alreadysent: true,
                                decline: false,
                                send_request: false
                            };

                        }


                    }, function (error) { });

                };


            }]
    };
};