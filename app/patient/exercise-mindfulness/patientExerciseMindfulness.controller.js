var _ = require('lodash');

/* @ngInject */
module.exports = function PatientExerciseMindfulnessController() {
    var controller = this;


    activate();


    /**
     * Initiate Controller.
     */
    function activate() {
        controller.info = 'Add Patient Controller';
        controller.oneAtATime = true;
        getPatientExerciseMindfulness();
    }


    function getPatientExerciseMindfulness() {
        controller.patientExercisesMindfulness = [
            {
                "heading":"Mindfulness Exercise for Breathing",
                "for":"Do this exercise daily twice.",
                "path" : "/audio/mindfulness/FreeMindfulness3MinuteBreathing.mp3",
                "open": false
            },
            {
                "heading":"Mindfulness Exercise for Breathing 5 min",
                "for":"Do this exercise daily once.",
                "path" : "/audio/mindfulness/MARC5MinuteBreathing.mp3",
                "open": false
            },
            {
                "heading":"Mindfulness Exercise for body scan",
                "for":"Do this exercise daily twice.",
                "path" : "/audio/mindfulness/UCSD20MinuteBodyScan.mp3",
                "open": false
            }
        ];

    }


};
