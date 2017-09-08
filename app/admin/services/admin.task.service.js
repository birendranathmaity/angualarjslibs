/* @ngInject */
module.exports =function($http,ServiceUrls){
       
    return {
            acceptPhoto: function(data,success, error) {
                $http.post(ServiceUrls.BASEURL + ServiceUrls.ADMIN_ACCEPT_PHOTO,data).success(success).error(error);
            }
            
        };
    };