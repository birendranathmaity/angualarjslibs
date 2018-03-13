'use strict';

var angular = require('angular');
var activitesRoutes = require('./activites.route');
//var matchescomponents = require('./components');
var activityController = require('./activity/activity.ctrl');
module.exports = angular.module('app.ui.activites', [])
    .run(activitesRoutes)
    .controller('activityController', activityController);
    