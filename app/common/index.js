'use strict';
var angular = require('angular');
var routes = require('./common.routes');
//services//
var userAction=require('./user.actions.service');
var socket=require('./socket.service');
var toastr=require('./toaster.service.js');
var notificationText=require('./notification-text');
var userImg=require('./user-img');
var notiAction=require('./noti-action');
var searchBy=require('./searchby.dir.js');
var AccountSettingsController = require('./settings/settings.ctrl');
var notificationController = require('./notifications/notifications.ctrl');
var fullprofileController = require('./fullprofile/fullprofile.ctrl');
var serachByController = require('./serachby.dir.ctrl');
var noinformation = require('./noinformation');
var userProfile = require('./user.profile');
var timelineProfile = require('./timeline.profile');
module.exports = angular.module('app.ui.common', [])
.run(routes)
.directive('timelineProfile', timelineProfile)
.directive('notificationText', notificationText)
.directive('userProfile', userProfile)
.directive('userImg', userImg)
.directive('notiAction', notiAction)
.directive('searchBy', searchBy)
.directive('noinformation', noinformation)
.controller('AccountSettingsController', AccountSettingsController)
.controller('notificationController', notificationController)  
.controller('fullprofileController', fullprofileController) 
.controller('serachByControllerDir', serachByController) 
.factory("useractions",userAction)
.factory("socket",socket)
.factory('toastr',toastr)
.directive('onlyLettersInput', function onlyLettersInput() {
  return {
    require: 'ngModel',
    link: function(scope, element, attr, ngModelCtrl) {
      function fromUser(text) {
        var transformedInput = text.replace(/[^a-zA-Z]/g, '');
        //console.log(transformedInput);
        if (transformedInput !== text) {
          ngModelCtrl.$setViewValue(transformedInput);
          ngModelCtrl.$render();
        }
        return transformedInput;
      }
      ngModelCtrl.$parsers.push(fromUser);
    }
  };
}).directive('dontFill', function() {
    
      return {
    
        restrict: 'A',
    
        link: function link(scope, el, attrs) {
          // password fields need one of the same type above it (firefox)
          var type = el.attr('type') || 'text';
          // chrome tries to act smart by guessing on the name.. so replicate a shadow name
          var name = el.attr('name') || '';
          var shadowName = name + '_shadow';
          // trick the browsers to fill this innocent silhouette
          var shadowEl = angular.element('<input type="' + type + '" name="' + shadowName + '" style="display: none">');
    
          // insert before
          el.parent()[0].insertBefore(shadowEl[0], el[0]);
        }
    
      };
    
    });
