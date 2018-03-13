'use strict';

var angular = require('angular');
var routes = require('./matches.route');
var matchescomponents = require('./components');
var PreMatchesController = require('./pre_matches/pre_matches.controller');
var matchesService = require('./service');
module.exports = angular.module('app.ui.matches', [matchesService.name,matchescomponents.name])
    .run(routes)
    .controller('PreMatchesController', PreMatchesController);