/* @ngInject */
module.exports = function PersonalInfoController() {
    var controller = this;

    activate();

    /**
     * Initiate Controller.
     */
    function activate() {
        controller.info = 'Personal Information Controller ';
    }
};
