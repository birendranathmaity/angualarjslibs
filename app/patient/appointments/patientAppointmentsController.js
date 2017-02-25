var moment = require('moment');
var fullcalendar = require('fullcalendar');

/* @ngInject */
module.exports = function PatientNotificationController(uiCalendarConfig) {
    var controller = this;

    activate();

    /**
     * Initiate Controller.
     */
    function activate() {
        setCalendarConfig(uiCalendarConfig);
    }

    function setCalendarConfig(uiCalendarConfig) {
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();

        controller.changeTo = 'Hungarian';
        /* event source that pulls from google.com */
        controller.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            className: 'gcal-event',           // an option!
            currentTimezone: 'America/Chicago' // an option!
        };
        /* event source that contains custom events on the scope */
        controller.events = [
            {title: 'All Day Event',start: new Date(y, m, 1)},
            {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
            {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
            {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
            {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
            {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
        ];
        /* event source that calls a function on every view switch */
        controller.eventsF = function (start, end, timezone, callback) {
            var s = new Date(start).getTime() / 1000;
            var e = new Date(end).getTime() / 1000;
            var m = new Date(start).getMonth();
            var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
            callback(events);
        };

        controller.calEventsExt = {
            color: '#f00',
            textColor: 'yellow',
            events: [
                {type:'party',title: 'Lunch',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
                {type:'party',title: 'Lunch 2',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
                {type:'party',title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
            ]
        };
        /* alert on eventClick */
        controller.alertOnEventClick = function( date, jsEvent, view){
            controller.alertMessage = (date.title + ' was clicked ');
        };
        /* alert on Drop */
        controller.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
            controller.alertMessage = ('Event Droped to make dayDelta ' + delta);
        };
        /* alert on Resize */
        controller.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
            controller.alertMessage = ('Event Resized to make dayDelta ' + delta);
        };
        /* add and removes an event source of choice */
        controller.addRemoveEventSource = function(sources,source) {
            var canAdd = 0;
            angular.forEach(sources,function(value, key){
                if(sources[key] === source){
                    sources.splice(key,1);
                    canAdd = 1;
                }
            });
            if(canAdd === 0){
                sources.push(source);
            }
        };
        /* add custom event*/
        controller.addEvent = function() {
            controller.events.push({
                title: 'Open Sesame',
                start: new Date(y, m, 28),
                end: new Date(y, m, 29),
                className: ['openSesame']
            });
        };
        /* remove event */
        controller.remove = function(index) {
            controller.events.splice(index,1);
        };
        /* Change View */
        controller.changeView = function(view,calendar) {
            uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
        };
        /* Change View */
        controller.renderCalender = function(calendar) {
            if(uiCalendarConfig.calendars[calendar]){
                uiCalendarConfig.calendars[calendar].fullCalendar('render');
            }
        };
        /* Render Tooltip */
        controller.eventRender = function( event, element, view ) {
            element.attr({'tooltip': event.title,
                'tooltip-append-to-body': true});
            //$compile(element)($scope);
        };
        /* config object */
        controller.uiConfig = {
            calendar:{
                height: 600,
                editable: true,
                header:{
                    left: 'title',
                    center: '',
                    right: 'today prev,next'
                },
                eventClick: controller.alertOnEventClick,
                eventDrop: controller.alertOnDrop,
                eventResize: controller.alertOnResize,
                eventRender: controller.eventRender
            }
        };

        controller.changeLang = function() {
            if(controller.changeTo === 'Hungarian'){
                controller.uiConfig.calendar.dayNames = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
                controller.uiConfig.calendar.dayNamesShort = ["Vas", "Hét", "Kedd", "Sze", "Csüt", "Pén", "Szo"];
                controller.changeTo= 'English';
            } else {
                controller.uiConfig.calendar.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                controller.uiConfig.calendar.dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                controller.changeTo = 'Hungarian';
            }
        };
        /* event sources array*/
        controller.eventSources = [controller.events, controller.eventSource, controller.eventsF];
        controller.eventSources2 = [controller.calEventsExt, controller.eventsF, controller.events];
    }
    /* EOF */

};
