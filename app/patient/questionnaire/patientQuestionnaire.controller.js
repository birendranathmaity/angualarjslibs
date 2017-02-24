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
                    "options" : [
                        {
                            "label": "Yes",
                            "value": "yes"
                        },
                        {
                            "label": "No",
                            "value": "no"
                        }
                    ],
                     "selectedValue" : ""

                },
                "open": true
            },
            {
                "heading":"Meditation?",
                "question":"How many times are you doing meditation?",
                "answer" : {
                    "type" : "number",
                    "selectedValue" : ""
                },
                "open": false
            },
            {
                "heading":"Problems?",
                "question":"Explain current problems?",
                "answer" : {
                    "type" : "textarea",
                    "selectedValue" : "",
                    "show": false
                },
                "open": false
            }
        ];

    }


};
