var _ = require('lodash');

/* @ngInject */
module.exports = function PatientFormsController() {
    var controller = this;
    controller.toggleForm = toggleForm;


    activate();


    /**
     * Initiate Controller.
     */
    function activate() {
        controller.info = 'Patient Forms Controller';

        getPatientForms();
    }

    function toggleForm(form) {
        form.open = !form.open;
    }


    function getPatientForms() {
        controller.patientForms = [
            {
                "formName":"Form1",
                "description": "Form1 Description",
                "formPath":"form1.pdf",
                "agreeTermsAndConditions":false,
                "open": false
            },
            {
                "formName":"Form2",
                "description": "Form2 Description",
                "formPath":"form2.pdf",
                "agreeTermsAndConditions":false,
                "open": false
            },
            {
                "formName":"Form3",
                "description": "Form3 Description",
                "formPath":"form3.pdf",
                "agreeTermsAndConditions":false,
                "open": false
            }

        ];

    }


};
