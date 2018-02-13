/* @ngInject */
module.exports = function ($httpProvider) {
     $httpProvider.interceptors.push(['$q', '$location', '$sessionStorage', function($q, $location, $sessionStorage) {
      
            return {
                'request': function (config) {
                    
                    config.headers = config.headers || {};
                    if ($sessionStorage.token) {
                       
                        config.headers.Authorization = 'Bearer ' + $sessionStorage.token;
                    }
                   
                    return config;
                },
                'responseError': function(response) {
                    console.log(response.status)
                    if(response.status === 401 || response.status === 403) {
                     
                     
                        $location.path('/404');
                    }
                    return $q.reject(response);
                }
            };
        }]);
  
};