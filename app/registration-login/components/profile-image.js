/* @ngInject */
module.exports = function () {
    return {

         require:"ngModel",
        restrict: 'A',
       link : function(scope, el, attrs, ngModel) {
     
      el.bind('change', function(event) {
       
         var file=event.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
       
         scope.$apply(function() {
          ngModel.$setViewValue(evt.target.result);
          ngModel.$render();
        });
      };
      reader.readAsDataURL(file);
      
      });
    }
    }};