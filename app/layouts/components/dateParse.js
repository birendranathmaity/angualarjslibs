/* @ngInject */
module.exports = function () {
    return {
        restrict: 'E',
        template:'<i class="fa fa-clock-o" aria-hidden="true"></i> {{$ctrl.date}}',
        controllerAs:'$ctrl',
        scope:{
            date:"="

        },
        
        controller: [
            '$scope',
            '$element',
            '$attrs',
            function ($scope, $element, $attrs) {
                var controller=this;

                moment.fn.fromNowOrNow = function (a) {
                    if (Math.abs(moment().diff(this)) < 25000) { // 25 seconds before or after now
                        return 'just now';
                    }
                    return this.fromNow(a);
                }
               
                controller.date=moment($scope.date).fromNowOrNow();

            }]
        }
    }