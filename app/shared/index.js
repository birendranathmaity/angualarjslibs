var angular = require('angular');

var servicesModule = require('./services');
var resourcesModule = require('./resources');


module.exports = angular.module('app.ui.shared', [
    servicesModule.name,
    resourcesModule.name
]);