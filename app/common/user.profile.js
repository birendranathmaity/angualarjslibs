/* @ngInject */
module.exports = function ($crypto,$state,loginservice) {
    return {
        restrict: 'E',
        templateUrl:'app/common/user.profile.html',
        controllerAs:'$ctrl',
        scope:{
           type:"@",
           user:"="
        },
        
        controller: [
            '$scope',
            '$element',
            '$attrs',
            function ($scope, $element, $attrs) {
                var controller=this;
                $scope.$watch('user', function (newVal, oldVal) {
                    if (!newVal) {
                        return;
                    }
                   
                    controller.user = newVal;
                    controller.formdata = loginservice.getFiledsData();
                    controller.type = $scope.type;
                });
                controller.goToFullProfile=function(id){
                    
                     $state.go("root.fullprofile",{
                         id: $crypto.encrypt(id),
                         isblock:false
                     });
                   };
               

            }]
        };
    };