/* @ngInject */
module.exports = function PatientRegistrationController() {
    var controller = this;

    activate();

    /**
     * Initiate Controller.
     */
    function activate() {
        controller.info = 'Patinet registration Controller';
    }
};
