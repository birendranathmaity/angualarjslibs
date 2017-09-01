var angular = require('angular');
var uiRouter = require('angular-ui-router');
var ServiceUrls = require('./http.urls');
var routerConfig = require('./router.config');
var Router = require('./router.service');
var httpConfig= require('./http.config');
module.exports = angular.module('app.ui.router', [uiRouter])
    .config(httpConfig)
    .provider('routerConfig', routerConfig)
    .factory('Router', Router)
    .factory('ServiceUrls', ServiceUrls);