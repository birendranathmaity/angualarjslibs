/* @ngInject */
module.exports = function () {
    return {
        restrict: 'E',
        templateUrl:'./app/my-home/components/completeYourProfile.html',
        scope:{
             profileType:"@"
        },
        controllerAs:'completeYourProfile',
        controller: [
            '$scope',
            '$element',
            '$attrs',
            function ($scope, $element, $attrs) {
                var controller=this;

               controller.profileType=$scope.profileType;
                
            }
        ]
    };
};
