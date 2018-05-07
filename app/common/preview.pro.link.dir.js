/* @ngInject */
module.exports = function ($state,$crypto) {
    return {
        restrict: 'E',
        template:'<a ng-click="$ctrl.goToPreProfile()" class="hand"> <i class="fa fa-eye" aria-hidden="true"></i> Preview Your Profile </a>',
        controllerAs:'$ctrl',
        scope:{
            userId:"="
            },
        
        controller: [
            '$scope',
            '$element',
            '$attrs',
            function ($scope, $element, $attrs) {
                var controller=this;
                $scope.$watch('userId', function (newVal, oldVal) {
                    if (!newVal) {
                        return;
                    }
                    controller.userId=$scope.userId;
                    
                });
                controller.goToPreProfile=function(){
                    
                     $state.go("root.previewprofile",{
                         id: $crypto.encrypt(controller.userId)
                        
                     });
                   };
            }]
        };
    };