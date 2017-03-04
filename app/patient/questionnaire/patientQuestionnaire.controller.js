var _ = require('lodash');

/* @ngInject */
module.exports = function PatientQuestionnaireController() {
    var controller = this;
    controller.toggleQuestion = toggleQuestion;


    activate();


    /**
     * Initiate Controller.
     */
    function activate() {
        controller.info = 'Add Patient Controller';
        controller.oneAtATime = true;
        getPatientQuestionnaires();
    }

    function toggleQuestion(questionnaire) {
        questionnaire.open = !questionnaire.open;
    }
    function getPatientQuestionnaires() {
        controller.patientQuestionnaires = [
            {
                "heading":"Medicine",
                "question":"Did you take medicine today?",
                "answer" : {
                    "type" : "radio",
                     "selectedValue" : false

                },
                "open": true
            },
            {
                "heading":"Meditation?",
                "question":"Are you doing meditation?",
                "answer" : {
                    "type" : "radio",

                    "selectedValue" : true

                },
                "open": false
            },
            {
                "heading":"Problems?",
                "question":"Are you doing exercise daily?",
                "answer" : {
                    "type" : "radio",

                    "selectedValue" : true

                },
                "open": false
            }
        ];

    }


};
