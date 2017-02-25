var _ = require('lodash');

/* @ngInject */
module.exports = function PatientReminderController() {
    var controller = this;
    controller.toggleReminder = toggleReminder;
    controller.dismissReminder = dismissReminder;


    activate();


    /**
     * Initiate Controller.
     */
    function activate() {
        controller.info = 'Patient Reminder Controller';

        getPatientReminders();
    }

    function toggleReminder(reminder) {
        reminder.done = !reminder.done;
        reminder.dismissed = false;
    }

    function dismissReminder(reminder) {

        reminder.dismissed = true;
    }



    function getPatientReminders() {
        controller.patientReminders = [
            {
                "name":"Excercise",
                "time": "6 am",
                "done": false,
                "dismissed": true
            },
            {
                "name":"Tylonol medicine",
                "time": "10 am",
                "done": true,
                "dismissed": false
            },
            {
                "name":"Meditation",
                "time": "5 pm",
                "done": false,
                "dismissed": false
            },
            {
                "name":"Medicine xxxx",
                "time": "9 pm",
                "done": false,
                "dismissed": false
            }

        ];

    }


};
