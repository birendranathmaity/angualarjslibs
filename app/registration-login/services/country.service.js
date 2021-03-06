/* @ngInject */

module.exports =function($http,ServiceUrls){
       
    return {
            getCountries: function(success, error) {
                $http.get(ServiceUrls.BASEURL + ServiceUrls.COUNTRIES).success(success).error(error);
            },
            getStates: function(data, success, error) {
                $http.get(ServiceUrls.BASEURL + ServiceUrls.STATES+"/"+data).success(success).error(error);
            },
            getCities: function(data,success, error) {
                $http.get(ServiceUrls.BASEURL + ServiceUrls.CITIES+"/"+data).success(success).error(error);
            },
            getUserLoc:function(data,success,error){
                 $http.get(ServiceUrls.BASEURL + ServiceUrls.GET_USER_LOC+"/"+data.cn+"/"+data.st+"/"+data.ci).success(success).error(error);
            }
            
        };
    };
   