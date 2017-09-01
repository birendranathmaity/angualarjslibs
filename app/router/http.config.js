/* @ngInject */
module.exports = function ($httpProvider) {
     $httpProvider.interceptors.push(['$q', '$location', '$sessionStorage', function($q, $location, $sessionStorage) {
      
            return {
                'request': function (config) {
                    
                    config.headers = config.headers || {};
                    if ($sessionStorage.token) {
                         console.log("ok")
                        config.headers.Authorization = 'Bearer ' + $sessionStorage.token;
                    }
                    return config;
                },
                'responseError': function(response) {
                     
                    if(response.status === 401 || response.status === 403) {
                        console.log("error")
                       
                        $location.path('/register');
                    }
                    return $q.reject(response);
                }
            };
        }]);
  
};