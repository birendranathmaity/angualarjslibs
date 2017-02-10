var angular = require('angular');
var uiRouter = require('angular-ui-router');

var routerConfig = require('./router.config');
var Router = require('./router.service');

module.exports = angular.module('app.ui.router', [uiRouter])
    .provider('routerConfig', routerConfig)
    .factory('Router', Router);