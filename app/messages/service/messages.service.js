/* @ngInject */
module.exports = function ($http,toastr, $sessionStorage, $localStorage, ServiceUrls, $location, $uibModal, $rootScope) {
var service={

    send_message: function (data, success, error) {
        $http.post(ServiceUrls.BASEURL + ServiceUrls.SEND_MESSAGE, data).success(success).error(error);
    },
   get_messages: function (data, success, error) {
        $http.post(ServiceUrls.BASEURL + ServiceUrls.GET_MESSAGES, data).success(success).error(error);
    },

    update_message_status: function (data, success, error) {
        $http.post(ServiceUrls.BASEURL + ServiceUrls.CHANGE_MESSAGE_STATUS, data).success(success).error(error);
    },
    get_messages_count: function (data, success, error) {
        $http.post(ServiceUrls.BASEURL + ServiceUrls.GET_MESSAGES_COUNT, data).success(success).error(error);
    },
    get_requests_count: function (data, success, error) {
        $http.post(ServiceUrls.BASEURL + ServiceUrls.GET_REQUESTS_COUNT, data).success(success).error(error);
    },
    get_requests: function (data, success, error) {
        $http.post(ServiceUrls.BASEURL + ServiceUrls.GET_REQUESTS, data).success(success).error(error);
    },
    update_requests: function (data, success, error) {
        $http.post(ServiceUrls.BASEURL + ServiceUrls.UPDATE_REQUESTS, data).success(success).error(error);
    },
    check_user_currentuser: function (data, success, error) {
        $http.post(ServiceUrls.BASEURL + ServiceUrls.CHECK_USER_CURRENTUSER, data).success(success).error(error);
    },
toaster_msg:function(msg){
    toastr.success(msg);

},
    composemail:function (config) {
        var modalInstance = $uibModal.open({
        animation: true,
       
        templateUrl: './app/messages/components/compose.mail.html',
        controller: 'composeMailController',
        controllerAs: '$ctrl',
        size: "lg",
        backdrop: 'static',
        keyboard: false,
        resolve: {
            config: function () {
                return config;
            }
        }
    
   });
 }


}
return service;

}    

