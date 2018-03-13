/* @ngInject */
module.exports = function searchResultController($rootScope,$state, countryService, loginservice,messagesservice, searchService) {
    var controller = this;
    controller.fields=$state.params.fields;
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
        fields:controller.fields
        };
    controller.searchFields=function(fields){
        controller.fields=fields;
        req.fields=fields;
        req.gender=$rootScope.login_user_gender;
        serachResult();
    };
    controller.pageChanged = function () {
        
                controller.selectedAll = false;
        
                controller.page = controller.page;
        
                req.page = controller.page;
                controller.loadViewType();
        
            };
function serachResult(){

    searchService.getSearchResult(req,function(result){
        
         setUserData(result);
                 },function(error){});
}
            controller.loadViewType = function () {

                if(controller.fields){
                    serachResult();
                }
               
               
               else{
                searchService.getSearch({ user_id: $rootScope.login_user_id }, function (result) {
                    if (result) {
                        req.fields=result;
                        controller.fields=result;
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
    controller.saveResult={
            user_id: $rootScope.login_user_id,
            name:"",
            fields:controller.fields
    };
    controller.saveNameDisbaled=function(){

if(!controller.saveResult.name){
return true;
}
    };
    controller.saveSearchResult=function(){
        controller.saveResult.fields=controller.fields;
        searchService.saveSearchResult(controller.saveResult,function(result){
            controller.saveResult.name="";
            messagesservice.toaster_msg("Successfully saved");


                     },function(error){});
    };

    };