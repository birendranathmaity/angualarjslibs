/* @ngInject */
module.exports = function photoRequestController($state,$location, $scope, $timeout, $rootScope, loginservice, messagesservice) {
    var controller = this;


    controller.viewType = "RECEIVED";
    controller.requestType = $state.params.requestType;

    function loadCounts() {

        var reqCount = {
            user_id: $rootScope.login_user_id,
            request_type: controller.requestType

        }
        messagesservice.get_requests_count(reqCount, function (result) {
           
            if (result.length > 0) {
                controller.reqCounts = result[0];
            }



        }, function (error) {

        });


    }
    function readall() {
        var reqUpdate = {
            user_id: $rootScope.login_user_id,
            update_type: "READALL",
            request_type: controller.requestType,
            fields: {

            }
        }

        messagesservice.update_requests(reqUpdate, function (result) {
            

            loadCounts();

        }, function (error) {

        });
    }

    readall();
    controller.loadType = function (type) {
        controller.viewType = type;
    }

    var userRequestsBroadcastUpdate = $rootScope.$on('userRequestsBroadcastUpdate', function ($event, get_messages_count) {

        loadCounts();


    });

   
    $rootScope.$on('$destroy', function () {

        userRequestsBroadcastUpdate();
       

    });
}