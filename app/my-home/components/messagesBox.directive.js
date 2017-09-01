/* @ngInject */
module.exports = function () {
    return {
        templateUrl:'./app/my-home/components/messagesbox.html',
        replace:true,
        controller: [
            '$scope',
            '$element',
            '$attrs',
            function ($scope, $element, $attrs) {
               
                $scope.status={open:true};

            }
        ]
    };
};
