var _=require('lodash');

/* @ngInject */
module.exports = function AddPatientNetworkController() {
    var controller = this;
    controller.createNewPatientNetwork = createNewPatientNetwork;
    controller.removePatientNetwork = removePatientNetwork;

    activate();


    /**
     * Initiate Controller.
     */
    function activate() {
        controller.info = 'Add PatientNetwork Controller';
        createNewPatientNetworksModel();
        controller.patientNetworks = getPatientNetworks();
    }
    
    function createNewPatientNetworksModel() {
        controller.newPatientNetworks = [];
        controller.newPatientNetworks.push(addNewPatientNetwork());
    }

    function createNewPatientNetwork() {
        controller.newPatientNetworks.push(addNewPatientNetwork());
    }

    function removePatientNetwork(patientNetwork) {

        _.remove(controller.newPatientNetworks, patientNetwork);
    }


    function addNewPatientNetwork() {
        return {
          "patientNetwork": {
              "id": controller.newPatientNetworks.length ,
              "email":"",
              "phone":""
          }
        };
    }

    function getPatientNetworks() {
        return [
            {
                "network": "Baylor",
                "enabled": true
            },
            {
                "network": "Texas Med clinic",
                "enabled": true
            },
            {
                "network": "Medical center",
                "enabled": true
            }
        ];
    }
};
