/* @ngInject */
module.exports = function () {
    return {
        restrict: 'EA',
        scope:{
             viewType:"=",
             requestType:"="
        },
        templateUrl: 'app/messages/components/requests.view.directive.html',
        controller: 'requestsViewDirCtrl',
        controllerAs:'$ctrl',
        link:function($scope, $element, $attrs){




        }
    };
};