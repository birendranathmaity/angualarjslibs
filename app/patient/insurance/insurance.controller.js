/* @ngInject */
module.exports = function InsuranceController() {
    var controller = this;

    activate();

    /**
     * Initiate Controller.
     */
    function activate() {
        controller.info = 'Insurance Controller ';
    }
};
