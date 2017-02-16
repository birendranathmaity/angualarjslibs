/* @ngInject */
module.exports = function PatientInsuranceController() {
    var controller = this;

    activate();

    /**
     * Initiate Controller.
     */
    function activate() {
        controller.info = 'Insurance Controller ';
    }
};
