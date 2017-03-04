var angular = require('angular');

var servicesModule = require('./services');
var resourcesModule = require('./resources');
var componentsModule = require('./components');

module.exports = angular.module('app.ui.shared', [
    servicesModule.name,
    resourcesModule.name,
    componentsModule.name
]);