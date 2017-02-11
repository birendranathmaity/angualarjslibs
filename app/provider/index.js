'use strict';

var angular = require('angular');
var routes = require('./provider.route');

var ProviderDashboardController = require('./dashboard/providerDashboard.controller');

module.exports = angular.module('app.ui.provider', [])
    .run(routes)
    .controller('ProviderDashboardController', ProviderDashboardController);
