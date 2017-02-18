/* @ngInject */
module.exports = function LandingController() {
    var controller = this;
    controller.profile = {};
    controller.onSubmit = onSubmit;

    activate();

    /**
     * Initiate Controller.
     */
    function activate() {
        controller.info = 'Patinet login Controller';
    }

    function onSubmit() {
        console.log("Profile:: " + controller.profile.userId + " " + controller.profile.password);
    }
};