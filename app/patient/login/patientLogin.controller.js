/* @ngInject */
module.exports = function PatientLoginController() {
    var controller = this;

    activate();

    /**
     * Initiate Controller.
     */
    function activate() {
        controller.info = 'Patinet login Controller';
    }
};
