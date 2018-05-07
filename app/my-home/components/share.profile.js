/* @ngInject */
module.exports = function ( $state, $uibModal) {
    return {
        restrict: 'E',
        templateUrl:'app/my-home/components/share.profile.html',
        controllerAs: '$ctrl',
        controller: [
            '$scope',
            '$element',
            '$attrs',
            function ($scope, $element, $attrs) {
                var controller=this;
                controller.shareProBox= function () {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        windowClass: "",
                        templateUrl:'app/my-home/components/share.profile.box.html',
                        controller: 'shareProfileBoxCtrl',
                        controllerAs: 'ctrl',
                        size: "lg",
                        backdrop: 'static',
                        keyboard: false,
                        resolve: {
                            
                        }
        
                    });
                };
               
            }
        ]
    };
};