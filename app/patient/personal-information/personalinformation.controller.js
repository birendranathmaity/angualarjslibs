/* @ngInject */
module.exports = function PersonalInformationController() {
    var controller = this;

    activate();

    /**
     * Initiate Controller.
     */
    function activate() {
        controller.info = 'Personal Information Controller ';
    }
};
