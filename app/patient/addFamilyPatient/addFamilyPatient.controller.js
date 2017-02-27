var _ = require('lodash');

/* @ngInject */
module.exports = function AddFamilyPatientController() {
    var controller = this;
    controller.createNewPatient = createNewPatient;
    controller.removePatient = removePatient;

    activate();


    /**
     * Initiate Controller.
     */
    function activate() {
        controller.info = 'Add Patient Controller';
        createNewPatientsModel();
    }
    
    function createNewPatientsModel() {
        controller.newPatients = [];
        controller.newPatients.push(addNewPatient());
    }

    function createNewPatient() {
        controller.newPatients.push(addNewPatient());
    }

    function removePatient(patient) {

        _.remove(controller.newPatients, patient);
    }

    function addNewPatient() {
        return {
          "patient": {
              "id": controller.newPatients.length ,
              "email":"",
              "phone":""
          }
        };
    }
};
