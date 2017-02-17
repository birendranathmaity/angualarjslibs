/* @ngInject */
module.exports = function PatientLoginController() {
    var controller = this;
    controller.onSubmit = onSubmit;

    activate();

    /**
     * Initiate Controller.
     */
    function activate() {
        controller.info = 'Patinet login Controller';
    }

    function onSubmit() {
        console.log("submitted");
    }
};
