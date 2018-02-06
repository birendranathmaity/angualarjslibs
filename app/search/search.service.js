/* @ngInject */

module.exports =function($http,ServiceUrls){
    
 return {
         saveSearch: function(data,success, error) {
             $http.post(ServiceUrls.BASEURL + ServiceUrls.SET_SEARCH,data).success(success).error(error);
         },
         getSearch: function(data,success, error) {
            $http.post(ServiceUrls.BASEURL + ServiceUrls.GET_SEARCH,data).success(success).error(error);
        },
        getSearchResult: function(data,success, error) {
            $http.post(ServiceUrls.BASEURL + ServiceUrls.GET_SEARCH_RESULT,data).success(success).error(error);
        }
        
         
     };
 };