'use strict';
var angular = require('angular');

//services//
var activitesservice=require('./activites.service');

module.exports = angular.module('app.ui.activites.service', [])

.factory("activitesservice",activitesservice);
