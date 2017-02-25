var _ = require('lodash');

/* @ngInject */
module.exports = function ProviderEmergencyController() {
    var controller = this;



    activate();


    /**
     * Initiate Controller.
     */
    function activate() {
        controller.info = 'Provider Emergency Controller';

        getEmergencyPatients();
    }


    function getEmergencyPatients() {
        controller.emergencyPatients = [
            {
                "firstName":"Patient FirstName 1",
                "lastName": "Patient LastName 1",
                "emergencyNeededOn":"02/24/2017",
                "action": "Need Ambulance"
            },
            {
                "firstName":"Patient FirstName 2",
                "lastName": "Patient LastName 2",
                "emergencyNeededOn":"02/22/2017",
                "action": "Need pain killer"
            },
            {
                "firstName":"Patient FirstName 3",
                "lastName": "Patient LastName 3",
                "emergencyNeededOn":"02/22/2017",
                "action": "Need quick help"
            }

        ];

    }


};
