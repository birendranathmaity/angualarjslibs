var angular = require('angular');
var routes = require('./layout.route.js');

var HeaderController = require('./header.controller');

module.exports = angular.module('app.ui.layouts', [])
    .run(routes)
    .controller('HeaderController', HeaderController);