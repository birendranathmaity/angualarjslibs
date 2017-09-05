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
    .directive('emailAvailable', emailAvailable);