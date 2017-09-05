// Import angular dependencies
var angular = require('angular');
var uiRouter = require('angular-ui-router');
var ngCookies = require('angular-cookies');
var ngAnimate = require('angular-animate');
var ngMessages = require('angular-messages');
var moment = window.moment = require('moment');

require('ui-router-extras');
require('../node_modules/@iamadamjowett/angular-click-outside/clickoutside.directive');
require('ng-password-strength');
require('moment-range');
require('ng-device-detector');
require('ng-idle');
require('ng-mask');
require('angular-ui-switch');
require('angular-ui-bootstrap');
require('angular-sanitize');
require('ui-select');
require('angular-toastr');
require('ng-scrollbars');
require('ngstorage');
require('ng-file-upload');
// App UI modules
var LoadingBarModule = require('./loading-bar');
var routerModule = require('./router');
var publicModule = require('./public');
var layoutsModule = require('./layouts');
var translateModule = require('./translate');
var myHomeModule = require('./my-home');
var registrationLoginModule = require('./registration-login');
var adminModule = require('./admin');


angular.module('app.ui', [
    uiRouter,
    ngCookies,
    ngAnimate,
    ngMessages,
    'ui.bootstrap',
    'ngSanitize',
    'ui.select',
    'toastr',
    'angular-click-outside',
    'ct.ui.router.extras',
    'ngPasswordStrength',
    'ng.deviceDetector',
    'ngIdle',
    'ngMask',
    'uiSwitch',
    'ngScrollbars',
    'ngStorage',
    'ngFileUpload',
    LoadingBarModule.name,
    translateModule.name,
    routerModule.name,
    publicModule.name,
    layoutsModule.name,
    myHomeModule.name,
    registrationLoginModule.name,
    adminModule.name
  
]);
