/* @ngInject */
module.exports = function AddPatientController() {
    var controller = this;

    activate();

    /**
     * Initiate Controller.
     */
    function activate() {
        controller.info = 'Add Patient Controller';
    }
};
