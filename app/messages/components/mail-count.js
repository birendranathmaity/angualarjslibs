/* @ngInject */
module.exports = function (loginservice,$rootScope,messagesservice) {
    return {
        restrict: 'E',
        scope:{
            viewType:"="
       },
        templateUrl:'./app/messages/components/mail-count.html',
        controllerAs:'$ctrl',
        controller: [
            '$scope',
            '$element',
            '$attrs',
            function ($scope, $element, $attrs) {
               
                var controller=this;

                $scope.$watch('viewType', function (n, v) {
                    
                            if (!n) { return; }
                    
                            controller.viewType = n;
                           
                        });
               
                controller.composemail=function(){

                    messagesservice.composemail("lg");
                }
                var req={
                    user_id:$rootScope.login_user_id,
                    searchType: "SENT"
                }
                messagesservice.get_messages_count(req,function(result){

                    console.log(result)
                },function(error){

                });
                
            }
        ]
    };
};
