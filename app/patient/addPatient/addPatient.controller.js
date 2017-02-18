/* @ngInject */
module.exports = function AddPatientController() {
    var controller = this;
    controller.createNewPatient = createNewPatient;

    activate();


    /**
     * Initiate Controller.
     */
    function activate() {
        controller.info = 'Add Patient Controller';
        createNewPatientsModel();
    }
    
    function createNewPatientsModel() {
        var newPatients = [];
        newPatients.push(addNewPatient());
        controller.newPatients = newPatients;
    }

    function createNewPatient() {
        controller.newPatients.push(addNewPatient());
    }

    function addNewPatient() {
        return {
          "patient": {
              "email":"",
              "phone":""
          }
        };
    }
};
