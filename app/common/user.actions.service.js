/* @ngInject */
module.exports = function ($http,toastr, $sessionStorage, $localStorage, ServiceUrls, $location, $uibModal, $rootScope) {
    var service={
    
        send_request: function (data, success, error) {
            $http.post(ServiceUrls.BASEURL + ServiceUrls.SEND_REQUEST, data).success(success).error(error);
        },
        send_contact_request: function (data, success, error) {
            $http.post(ServiceUrls.BASEURL + ServiceUrls.SEND_MESSAGE, data).success(success).error(error);
        },
        send_photo_request: function (data, success, error) {
            $http.post(ServiceUrls.BASEURL + ServiceUrls.SEND_MESSAGE, data).success(success).error(error);
        },
        unblock_user: function (data, success, error) {
            $http.post(ServiceUrls.BASEURL + ServiceUrls.SEND_MESSAGE, data).success(success).error(error);
        },
        block_user: function (data, success, error) {
            $http.post(ServiceUrls.BASEURL + ServiceUrls.SEND_MESSAGE, data).success(success).error(error);
        },
       
    toaster_msg:function(msg){
        toastr.success(msg);
    
    },
        
    
    }
    return service;
    
    }    
    
    