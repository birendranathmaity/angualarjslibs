/* @ngInject */
module.exports = function (loginservice) {
    return {
        restrict: 'E',
        scope:{
user:"="
        },
        templateUrl:'./app/matches/components/profile-view.html',
        controllerAs:'$ctrl',
        controller: [
            '$scope',
            '$element',
            '$attrs',
            function ($scope, $element, $attrs) {
               
                var controller=this;
                controller.formdata = loginservice.getFiledsData();
                console.log($scope.user)
                controller.user=$scope.user;
                
            }
        ]
    };
};
