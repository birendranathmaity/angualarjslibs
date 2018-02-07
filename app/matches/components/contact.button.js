/* @ngInject */
module.exports = function () {
    return {
        restrict: 'E',
        templateUrl:'./app/matches/components/contact.button.html',
        controllerAs:'$ctrl',
        scope:{
           user:"="
         },
        
        controller: [
            '$scope',
            '$element',
            '$attrs',
            function ($scope, $element, $attrs) {
                var controller=this;
                controller.config=$scope.user.contact_btn;
                controller.isContacted=$scope.user.is_contacted;
                console.log(controller.config)

            }]
        }
    }