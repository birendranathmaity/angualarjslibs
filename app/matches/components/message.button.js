/* @ngInject */
module.exports = function () {
    return {
        restrict: 'E',
        templateUrl:'./app/matches/components/message.button.html',
        controllerAs:'$ctrl',
        scope:{
           user:"="
           

        },
        
        controller: [
            '$scope',
            '$element',
            '$attrs',
            function ($scope, $element, $attrs) {
                var controller=this;
                controller.config=$scope.user.message_btn;
               

            }]
        }
    }