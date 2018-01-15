/* @ngInject */
module.exports = function ($translate,$templateCache,$state, $rootScope) {
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
    controller.languages = ['English', 'Hindi','Gujarati'];
  //  $translate.use(controller.language.toLowerCase());
    
    
    controller.updateLanguage = function() {
    $translate.use(controller.language.toLowerCase());
    
  
// var currentPageTemplate =$state.current.views["@"].templateUrl;
// $templateCache.remove(currentPageTemplate);
// $state.current.views["@"].templateUrl=$state.current.views["@"].templateUrl;
// $state.reload();
  };
            }
        ]
    };
};
