'use strict';

var angular = require('angular');
var routes = require('./myhome.route');
var myhomecomponents = require('./components');
var DashboardController = require('./dashboard/Dashboard.controller');
var MyProfileController = require('./my-profile/MyProfile.controller');
var AddPhotosController = require('./add-photos/AddPhotos.controller');


module.exports = angular.module('app.ui.myhome', [myhomecomponents.name])
    .run(routes)
    .controller('DashboardController', DashboardController)
    .controller('MyProfileController', MyProfileController)
    .controller('AddPhotosController', AddPhotosController);
    