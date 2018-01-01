/* @ngInject */
module.exports = function (loginservice,messagesservice) {
    return {
        restrict: 'E',
        scope:{
user:"="
        },
        templateUrl:'./app/messages/components/mail-count.html',
        controllerAs:'$ctrl',
        controller: [
            '$scope',
            '$element',
            '$attrs',
            function ($scope, $element, $attrs) {
               
                var controller=this;
                controller.composemail=function(){

                    messagesservice.composemail("lg");
                }
              
                
            }
        ]
    };
};
