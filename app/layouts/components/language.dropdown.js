/* @ngInject */
module.exports = function ($translate) {
    return {
        restrict: 'E',
        templateUrl:'./app/layouts/components/language.dropdown.html',
        controllerAs:'lang',
        controller: [
            '$scope',
            '$element',
            '$attrs',
            function ($scope, $element, $attrs) {
                var controller=this;
        controller.language = 'English';
    controller.languages = ['English', 'Hindi'];
    controller.updateLanguage = function() {
    $translate.use(controller.language.toLowerCase());
  };
            }
        ]
    };
};
