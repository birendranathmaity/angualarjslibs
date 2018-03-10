'use strict';

var angular = require('angular');
var activitesRoutes = require('./activites.route');
//var matchescomponents = require('./components');
var activityController = require('./activity/activity.ctrl');

var activitesService = require('./service');
module.exports = angular.module('app.ui.activites', [activitesService.name])
    .run(activitesRoutes)
    .controller('activityController', activityController);
    