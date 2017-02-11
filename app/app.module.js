// Import angular dependencies
var angular = require('angular');
var uiRouter = require('angular-ui-router');
var ngCookies = require('angular-cookies');
var ngAnimate = require('angular-animate');
var ngMessages = require('angular-messages');
var moment = window.moment = require('moment');

require('ui-router-extras');
require('angular-ui-bootstrap');
require('../node_modules/@iamadamjowett/angular-click-outside/clickoutside.directive');
require('ng-password-strength');
require('moment-range');
require('ng-device-detector');
require('ng-idle');

// App UI modules
var routerModule = require('./router');
var publicModule = require('./public');
var layoutsModule = require('./layouts');
var patientModule = require('./patient');
var providerModule = require('./provider');

angular.module('app.ui', [
    uiRouter,
    ngCookies,
    ngAnimate,
    ngMessages,
    'ui.bootstrap',
    'angular-click-outside',
    'ct.ui.router.extras',
    'ngPasswordStrength',
    'ng.deviceDetector',
    'ngIdle',
    routerModule.name,
    publicModule.name,
    layoutsModule.name,
    patientModule.name,
    providerModule.name
]);
