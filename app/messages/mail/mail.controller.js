/* @ngInject */
module.exports = function mailController($location, $scope, $timeout, $rootScope, loginservice, messagesservice) {
    var controller = this;

    controller.viewType = "INBOX";

    function loadCounts() {

        var reqCount = {
            user_id: $rootScope.login_user_id

        };
        messagesservice.get_messages_count(reqCount, function (result) {

            if (result.length > 0) {
                controller.msgCounts = result[0];
            }



        }, function (error) {

        });


    }
    loadCounts();
    controller.composemail = function () {

        var config = {

            type: "NEW"

        };

        messagesservice.composemail(config);
    };
    controller.loadType = function (type) {
        controller.viewType = type;
    };

    var userMessageDeleteBroadcast = $scope.$on('userMessageDeleteBroadcast', function ($event, get_messages_count) {

        loadCounts();


    });

    var userSendMessageBroadcast = $scope.$on('userSendMessageBroadcast', function ($event, get_messages_count) {

        loadCounts();


    });
    $scope.$on('$destroy', function () {

       
        userMessageDeleteBroadcast();
        userSendMessageBroadcast();

    });
};