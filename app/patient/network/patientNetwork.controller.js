/**
 * Created by ShankarYeshala on 2/19/17.
 */
/* @ngInject */
module.exports = function PatientNetworkController() {
    var controller = this;


    activate();


    /**
     * Initiate Controller.
     */
    function activate() {
        controller.info = 'Toggle PatientNetwork Controller';
        controller.patientNetworks = getPatientNetworks();


    }

    function getPatientNetworks() {
        return [
            {
                "network": "Network1",
                "enabled": true
            },
            {
                "network": "Network2",
                "enabled": true
            },
            {
                "network": "Network3",
                "enabled": true
            }
        ];
    }
};
