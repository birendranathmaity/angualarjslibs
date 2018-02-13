'use strict';

var angular = require('angular');
var activitesRoutes = require('./activites.route');
//var matchescomponents = require('./components');
var PreLocationController = require('./pre_location/pre.location.ctrl');

var activitesService = require('./service');
module.exports = angular.module('app.ui.activites', [activitesService.name])
    .run(activitesRoutes)
    .controller('PreLocationController', PreLocationController);
    