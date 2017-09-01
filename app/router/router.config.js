/* @ngInject */
module.exports = function ($stateProvider, $urlRouterProvider,$locationProvider,$httpProvider) {
    var config = {
        $stateProvider: $stateProvider,
        $urlRouterProvider: $urlRouterProvider
    };
    $locationProvider.html5Mode(true);
//    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
       
//             return {
//                 'request': function (config) {
//                     config.headers = config.headers || {};
//                     if ($localStorage.token) {
//                         config.headers.Authorization = 'Bearer ' + $localStorage.token;
//                     }
//                      console.log("fine with header token")
//                     return config;
//                 },
//                 'responseError': function(response) {
//                     console.log("error");
//                     if(response.status === 401 || response.status === 403) {
//                         $location.path('/signin');
//                     }
//                     return $q.reject(response);
//                 }
//             };
//         }]);
    this.$get = function () {
        return {
            config: config
        };
    };
};