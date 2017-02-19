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
};
