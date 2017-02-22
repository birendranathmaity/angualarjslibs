var angular = require('angular');
var routes = require('./layout.route.js');

var HeaderController = require('./header.controller');
var SidebarController = require('./sidebar.controller');

module.exports = angular.module('app.ui.layouts', [])
    .run(routes)
    .controller('HeaderController', HeaderController)
    .controller('SidebarController', SidebarController);