/* @ngInject */
module.exports = function PatientDashboardController() {
    var controller = this;

    activate();

    /**
     * Initiate Controller.
     */
    function activate() {
        controller.info = 'Need immediate attention';
    }
};