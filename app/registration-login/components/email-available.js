/* @ngInject */
module.exports = function ($timeout, $filter,loginservice) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, element, attrs, ngModel) {
      element.bind('blur', function (e) {
        if (!ngModel || !element.val()) return;
       
      
       loginservice.checkemail({"email": element.val()}, function(res) {
         
         
         if(res.success){

         ngModel.$setValidity('unique', false);
         }
        else{
        
         
           ngModel.$setValidity('unique', true);
        }
         $timeout( function(){
        
         var elmChild=element.parent().children('.validationMessage');

         if(elmChild.text()===""){
           elmChild.text($filter('translate')('EMAIL_VALIDATION_MESSAGE_USER'));
         }
             }, 100 );
       
    }, function() {
              
            });
        
       
      });
    }
  }
};