/* @ngInject */
module.exports = function () {
    return {
        restrict: 'E',
        templateUrl:'./app/matches/components/like.button.html',
        controllerAs:'$ctrl',
        scope:{
           user:"=",
           

        },
        
        controller: [
            '$scope',
            '$element',
            '$attrs',
            function ($scope, $element, $attrs) {
                var controller=this;
                controller.is_liked_profile=$scope.user.is_liked_profile;
               

            }]
        }
    }