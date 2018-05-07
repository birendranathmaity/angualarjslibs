var angular = require('angular');
var searchById = require('./searchById.directive');
var messagesBox = require('./messagesBox.directive');
var basicSearchBox = require('./basicSearchBox.directive');
var myPocket = require('./myPocket.directive');
var completeYourProfile = require('./completeYourProfile.directive');
var calendarBox = require('./calendarBox.directive');
var preferredMatchesBox = require('./preferredMatchesBox.directive');
var userActionsTabs = require('./userActionsTabs.directive');
var albumGalary = require('./album.galary');
var shareProfile = require('./share.profile');
var shareProfileBoxCtrl=require('./share.profile.box.ctrl');
module.exports = angular.module('app.ui.myhome.components',[])
    .controller('shareProfileBoxCtrl', shareProfileBoxCtrl)
    .directive('shareProfile', shareProfile)
    .directive('searchById', searchById)
    .directive('albumGalary', albumGalary)
    .directive('messagesBox', messagesBox)
    .directive('basicSearchBox', basicSearchBox)
    .directive('myPocket', myPocket)
    .directive('completeYourProfile', completeYourProfile)
    .directive('calendarBox', calendarBox)
    .directive('preferredMatchesBox', preferredMatchesBox)
    .directive('userActionsTabs', userActionsTabs);
    