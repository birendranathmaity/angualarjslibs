/* @ngInject */
module.exports = function PatientLoginController() {
    var ctrl = this;
    ctrl.authenticateUser = authenticateUser;





    activate();

    /**
     * Initiate Controller.
     */
    function activate() {
        ctrl.info = 'Patinet login Controller';
    }

    function authenticateUser() {
      console.log(ctrl.loginInfo);
    };
};
