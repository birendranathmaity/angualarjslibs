/* @ngInject */
module.exports = function RegistrationController( $uibModal,loginservice,ServiceUrls) {
var controller = this;
    controller.openLoginModal = function (size) {
         var modalInstance = $uibModal.open({
         animation: true,
         windowClass :"login-model",
         templateUrl: './app/registration-login/login-modal/login.html',
         controller: 'LoginController',
         controllerAs: 'ctrl',
         backdrop: 'static',
         keyboard: false,
         size: size
     
    });
  };
};