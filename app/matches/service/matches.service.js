/* @ngInject */
module.exports = function ($http, $sessionStorage, $localStorage, ServiceUrls, $location, $uibModal, $rootScope) {
var service={

    get_pre_matches: function (data, success, error) {
        $http.post(ServiceUrls.BASEURL + ServiceUrls.GET_PRE_MATCHES, data).success(success).error(error);
    }  


}
return service;

}    