var angular = require('angular');
var profileView = require('./profile-view');


module.exports = angular.module('app.ui.matches.components',[])
    
    .directive('profileView', profileView);
    