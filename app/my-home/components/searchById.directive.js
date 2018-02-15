/* @ngInject */
module.exports = function ( $state, $crypto) {
    return {
        restrict: 'E',
        templateUrl:'./app/my-home/components/searchById.html',
        controller: [
            '$scope',
            '$element',
            '$attrs',
            function ($scope, $element, $attrs) {
                var controller=this;
                $scope.searchValue="";
                $scope.disabled=function(){
                    if(!$scope.searchValue){
                        return true;
                    }

                };
                $scope.search=function(){

                    $state.go("root.fullprofile",{id: $crypto.encrypt($scope.searchValue)});
                };
               
            }
        ]
    };
};
