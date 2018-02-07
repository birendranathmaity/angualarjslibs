/* @ngInject */
module.exports = function () {
    return {
        restrict: 'E',
        templateUrl:'./app/matches/components/photo.button.html',
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
                controller.config=$scope.user.photo_btn;
            
            }]
        }
    }