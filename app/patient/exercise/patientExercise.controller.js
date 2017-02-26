var _ = require('lodash');

/* @ngInject */
module.exports = function PatientExerciseController() {
    var controller = this;


    activate();


    /**
     * Initiate Controller.
     */
    function activate() {
        controller.info = 'Add Patient Controller';
        controller.oneAtATime = true;
        getPatientExercises();
    }


    function getPatientExercises() {
        controller.patientExercises = [
            {
                "heading":"Exercise for lower back pain Relief",
                "for":"Do this exercise daily twice for back pain?",
                "url" : "https://www.youtube.com/embed/SEcVfBRGFxI",
                "open": false
            },
            {
                "heading":"Exercise for Shoulder pain Relief",
                "for":"Do this exercise daily once for neck pain?",
                "url" : "https://www.youtube.com/embed/MmzbnT-poAo",
                "open": false
            },
            {
                "heading":"Exercise for Ankle Pain Relief",
                "for":"Do this exercise daily twice for Leg pain?",
                "url" : "https://www.youtube.com/embed/nZiTGOf3zw0",
                "open": false
            }
        ];

    }


};
