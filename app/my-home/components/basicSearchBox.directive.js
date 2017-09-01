/* @ngInject */
module.exports = function () {
    return {
        restrict: 'E',
        templateUrl:'./app/my-home/components/basicSearchBox.html',
        controllerAs:'basic',
        controller: [
            '$scope',
            '$element',
            '$attrs',
            function ($scope, $element, $attrs) {
                var controller=this;
               
                controller.status={open:false};
            }
        ]
    };
};
