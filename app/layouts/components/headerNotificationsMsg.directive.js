/* @ngInject */
module.exports = function (loginservice, $location) {
    return {
        restrict: 'E',
        templateUrl:'app/layouts/components/header-notifications-msg.html',
        controllerAs:'hdnm',
        controller: 'headerNotiController',
    };
};
