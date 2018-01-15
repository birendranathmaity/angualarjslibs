/* @ngInject */
module.exports = function ($http,toastr, $sessionStorage, $localStorage, ServiceUrls, $location, $uibModal, $rootScope) {
    var service={
    
        send_request: function (data, success, error) {
            $http.post(ServiceUrls.BASEURL + ServiceUrls.SEND_REQUEST, data).success(success).error(error);
        },
        update_request: function (data, success, error) {
            $http.post(ServiceUrls.BASEURL + ServiceUrls.UPDATE_REQUEST, data).success(success).error(error);
        },
        create_user_block: function (data, success, error) {
            $http.post(ServiceUrls.BASEURL + ServiceUrls.CREATE_USER_BLOCK, data).success(success).error(error);
        },
        update_user_block: function (data, success, error) {
            $http.post(ServiceUrls.BASEURL + ServiceUrls.UPDATE_USER_BLOCK, data).success(success).error(error);
        },
       
    toaster_msg:function(msg){
        toastr.success(msg);
    
    },
        
    
    }
    return service;
    
    }    
    
    