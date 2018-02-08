/* @ngInject */
module.exports = function searchByController($rootScope, $state,countryService, loginservice, searchService) {
    var controller = this;
   
    searchService.getSearch({ user_id: $rootScope.login_user_id }, function (result) {
        
                if (result) {
        
                    controller.fields = result;
                  
        
        
        
                }
                else {
                    controller.fields = "FIRST";
        
                }
            }, function (error) { });
    
    };