/* @ngInject */
module.exports = function () {
    return {
        restrict: 'E',
        templateUrl:'./app/my-home/components/calendarBox.html',
        controllerAs:'calendarBox',
        controller: [
            '$scope',
            '$element',
            '$attrs',
            function ($scope, $element, $attrs) {
                var controller=this;
                controller.today = function() {
    controller.dt = new Date();
  };
   controller.options = {
    
   
    showWeeks: false
  };
  controller.today();
                
            }
        ]
    };
};
