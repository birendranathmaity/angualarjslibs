/* @ngInject */
module.exports = function (messagesservice, $rootScope, $state) {
    return {
        templateUrl: './app/my-home/components/messagesbox.html',
        replace: true,
        controllerAs: "$ctrl",
        controller: [
            '$scope',
            '$element',
            '$attrs',
            function ($scope, $element, $attrs) {
                var controller = this;
                controller.status = { open: true };

                //messages//
                var msgCount = {
                    user_id: $rootScope.login_user_id

                };
                controller.msgCounts = {
                    INBOX: 0,
                    SENT: 0
                }
                messagesservice.get_messages_count(msgCount, function (result) {

                    if (result.length > 0) {
                        controller.msgCounts = result[0];

                    }
                    else {
                        controller.msgCounts.INBOX = 0;
                        controller.msgCounts.SENT = 0;
                    }

                }, function (error) {

                });
                controller.composemail = function () {
                    var config = {
                        type: "NEW"
                    };
                    messagesservice.composemail(config);
                };
                //requests///
                controller.accRequests = [

                    {
                        type: "PHOTO",
                        transKey: "PHOTO_REQUEST",

                    },
                    {
                        type: "MESSAGE",
                        transKey: "MESSAGE_REQUEST",

                    },
                    {
                        type: "CONTACT",
                        transKey: "CONTACT_REQUESTS",

                    }
                ];
                controller.reqCounts = {
                    RECEIVED: 0,
                    SENT: 0,
                    ACCEPTED: 0,
                    REJECTED: 0,
                    PENDING: 0
                }
                function loadCounts(type) {

                    var reqCount = {
                        user_id: $rootScope.login_user_id,
                        request_type: type

                    };
                    messagesservice.get_requests_count(reqCount, function (result) {

                        if (result.length > 0) {
                            controller.reqCounts = result[0];
                        }
                        else {
                            controller.reqCounts = {

                                RECEIVED: 0,
                                SENT: 0,
                                ACCEPTED: 0,
                                REJECTED: 0,
                                PENDING: 0
                            }
                        }
                    }, function (error) {

                    });


                }
                controller.reqType = function (isopen, type) {

                    if (isopen) {

                        loadCounts(type);
                    }

                };
                controller.goState = function (c, viewType, request_type) {
                    if (c === 0) {
                        return;
                    }
                    var stateUrl = "";

                    if (request_type === "PHOTO") {
                        stateUrl = "root.photo_request";

                    }
                    if (request_type === "MESSAGE") {
                        stateUrl = "root.message_request";

                    }
                    if (request_type === "CONTACT") {
                        stateUrl = "root.contact_request";

                    }
                    $state.go(stateUrl, { 'requestType': request_type, 'viewType': viewType });

                };


            }
        ]
    };
};
