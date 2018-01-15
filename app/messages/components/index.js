var angular = require('angular');
var mailCount = require('./mail-count');
var messagesView = require('./messages.view.directive');
var messagesViewDirCtrl = require('./messages.view.controller.dir');
var requestsView = require('./requests.view.directive');
var requestsViewDirCtrl = require('./requests.view.controller');
module.exports = angular.module('app.ui.messages.components',[])
.controller('messagesViewDirCtrl', messagesViewDirCtrl) 
.directive('messagesView', messagesView)
.directive('mailCount', mailCount)
.controller('requestsViewDirCtrl', requestsViewDirCtrl) 
.directive('requestsView', requestsView);
    