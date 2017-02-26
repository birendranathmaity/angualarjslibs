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
                "firstName":"Josh",
                "lastName": "Boyd",
                "emergencyNeededOn":"02/24/2017",
                "action": "Need Ambulance"
            },
            {
                "firstName":"Ester",
                "lastName": "Hmual",
                "emergencyNeededOn":"02/22/2017",
                "action": "Need pain killer"
            },
            {
                "firstName":"Wall",
                "lastName": "K",
                "emergencyNeededOn":"02/22/2017",
                "action": "Need quick help"
            }

        ];

    }


};
