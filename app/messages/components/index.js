var angular = require('angular');
var mailCount = require('./mail-count');


module.exports = angular.module('app.ui.messages.components',[])
    
    .directive('mailCount', mailCount);
    