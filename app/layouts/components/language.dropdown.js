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
    controller.languages = ['English', 'Hindi'];
    
    controller.updateLanguage = function() {
    $translate.use(controller.language.toLowerCase());
      $rootScope.$broadcast('myEventName');
  
// var currentPageTemplate =$state.current.views["@"].templateUrl;
// $templateCache.remove(currentPageTemplate);
// $state.current.views["@"].templateUrl=$state.current.views["@"].templateUrl;
// $state.reload();
  };
            }
        ]
    };
};
