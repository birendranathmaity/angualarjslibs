/* @ngInject */
module.exports = function searchResultController($rootScope,$state, countryService, loginservice, searchService) {
    var controller = this;
    var fields=$state.params.fields;
     controller.limit = 10;
    controller.total = 0;
    controller.page = 1;
    controller.pages = 0;
    controller.maxSize = 5;
    controller.userIds = [];
    controller.start = 0;
    controller.end = 0;
    var req = {
        page: controller.page,
        limit: controller.limit,
        gender:$rootScope.login_user_gender,
        fields:fields
        };
    
    controller.pageChanged = function () {
        
                controller.selectedAll = false;
        
                controller.page = controller.page;
        
                req.page = controller.page;
                controller.loadViewType();
        
            };
function serachResult(){

    searchService.getSearchResult(req,function(result){
        
         setUserData(result)
                 },function(error){});
}
            controller.loadViewType = function () {

                if(fields){
                    serachResult();
                }
               
               
               else{
                searchService.getSearch({ user_id: $rootScope.login_user_id }, function (result) {
                    if (result) {
                        req.fields=result;
                        req.gender=$rootScope.login_user_gender;
                        serachResult();
                    }
                        
                        },function(error){});
               }
        
            };

            
    function setUserData(result) {
        controller.users = [];
        controller.pages = result.pages;
        controller.total = result.total;
        controller.users = result.users;

        controller.start = (controller.page - 1) * controller.limit + 1;
        controller.end = controller.start + result.users.length - 1;
    }

    controller.loadViewType();

    };