'use strict';

var angular = require('angular');
var registercomponents = require('./components');
var regisLoginRoutes = require('./registration-login.route');
var LoginController = require('./login-modal/login.controller');
var RegistrationController = require('./registration/registration.controller');
var ForgetPasswordController = require('./forget-password/forgetPassword.controller');
var MoreInfoController = require('./more-info/moreInfo.controller');
var OtpVrController = require('./otp-verification/otp.controller');
var HelpMeWriteController = require('./help-me-write/help-me-write');
var CropModalController = require('./crop-modal/crop-modal');
var cropDirective = require('./crop-modal/ng-img-crop');
var goToMoreController=require('./goto-moreinfo-modal/goto-moreinfo-modal');
var loginCtrl = require('./login-modal/afterlogout');
//services//
var registrationLoginServices = require('./services');
module.exports = angular.module('app.ui.registration.login', [registercomponents.name,'ngImgCrop',registrationLoginServices.name])
    .run(regisLoginRoutes)
    .controller('LoginController',LoginController)
    .controller('RegistrationController', RegistrationController)
    .controller('ForgetPasswordController', ForgetPasswordController)
    .controller('MoreInfoController', MoreInfoController)
    .controller('OtpVrController', OtpVrController)
    .controller('HelpMeWriteController', HelpMeWriteController)
    .controller('CropModalController', CropModalController)
    .controller('goToMoreController', goToMoreController)
    .controller('loginCtrl', loginCtrl);
   
    