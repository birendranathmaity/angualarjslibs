/* @ngInject */
module.exports =function($http,ServiceUrls){
       
    return {
            getallActiveUsers: function(data,success, error) {
                $http.post(ServiceUrls.BASEURL + ServiceUrls.GETALL_ACTIVE_USERS,data).success(success).error(error);
            }
            
        };
    };