'use strict';

var angular = require('angular');
var routes = require('./matches.route');
var matchescomponents = require('./components');
var DailyMatchesController = require('./dailymatches/dailyMatches.controller');
var PreMatchesController = require('./pre_matches/pre_matches.controller');
var matchesService = require('./service');
module.exports = angular.module('app.ui.matches', [matchesService.name,matchescomponents.name])
    .run(routes)
    .controller('DailyMatchesController', DailyMatchesController) 
    .controller('PreMatchesController', PreMatchesController);