var angular = require('angular');
var masonryWallComponent = require('./masonryWall.directive');

module.exports = angular.module('app.ui.components',[])
    .component('masonryWallComponent', masonryWallComponent);