/* @ngInject */
module.exports = function ProviderDashboardController() {
    var controller = this;

    activate();

    /**
     * Initiate Controller.
     */
    function activate() {
        controller.patientsCounts = 5;
    }
};