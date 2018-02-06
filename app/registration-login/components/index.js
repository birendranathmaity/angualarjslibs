var angular = require('angular');
var registerForm = require('./register.form');
var angularValidator=require('./validation');
var profileImage=require('./profile-image');
var basicInfo=require('./basic.info.ctrl');
var webcam=require('./webcam');
var emailAvailable=require('./email-available');

module.exports = angular.module('app.ui.registr.components',[])
    
    .directive('registerForm', registerForm)
    .directive('angularValidator', angularValidator)
    .directive('profileImage', profileImage)
    .directive('basicInfo', basicInfo)
    .directive('webcam', webcam)
    .directive('emailAvailable', emailAvailable)
    .directive('convertToNumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {

      if(attrs.convertToNumber==="height"){
        ngModel.$parsers.push(function(val) {
          console.log(parseFloat(val))
          return val !== null ? parseFloat(val) : null;
        });
        ngModel.$formatters.push(function(val) {
          return val !== null ? '' + parseFloat(val) : null;
        });
      }else{
        ngModel.$parsers.push(function(val) {
          return val !== null ? parseInt(val, 10) : null;
        });
        ngModel.$formatters.push(function(val) {
          return val !== null ? '' + val : null;
        });
      }
     
    }
  };
});