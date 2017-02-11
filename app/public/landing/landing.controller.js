/* @ngInject */
module.exports = function LandingController() {
    var controller = this;

    activate();

    /**
     * Initiate Controller.
     */
    function activate() {
        controller.appName = 'Paxis';
    }
};