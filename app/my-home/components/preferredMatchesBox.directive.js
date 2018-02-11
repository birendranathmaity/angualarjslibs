/* @ngInject */
module.exports = function (searchService ,loginservice,matcheservice,useractions,$rootScope) {
    return {
        restrict: 'E',
        templateUrl:'./app/my-home/components/preferredMatchesBox.html',
        controllerAs:'preferredMatchesBox',
        scope:{
             title:'='
        },
        controller: [
            '$scope',
            '$element',
            '$attrs',
            function ($scope, $element, $attrs) {
                var controller=this;
                controller.title=$scope.title;
                controller.formdata = loginservice.getFiledsData();
                controller.config = {
                          autoHideScrollbar: true,
                          theme: 'rounded-dark',
                          axis: 'y', 
                          setHeight: 230,
                          scrollInertia: 0,
                           scrollButtons: {
            scrollAmount: 'auto', // scroll amount when button pressed 
            enable: true // enable scrolling buttons by default 
        },
                           advanced:{
                                   updateOnContentResize: true
                              }
    };
    var req = {
        page: 1,
        limit: 10,
        gender:$rootScope.login_user_gender,
        fields:{}
        };
        controller.loadViewType = function () {
            
                            searchService.getSearchResult(req,function(result){
                                
                                controller.users = result.users;
                                controller.result = result;
                                         },function(error){});
                                        };
    matcheservice.get_partner_pre({ user_id: $rootScope.login_user_id }, function (result) {
        
                if (result) {
       req.fields=result.fields;
       controller.loadViewType();       
        
                }
                else{
                   
    useractions.get_default_search_config(function(fields){
       
        req.fields = fields;
        controller.loadViewType();
            });
                   
                }
            }, function (error) { });

               
               
            }
        ]
    };
};
