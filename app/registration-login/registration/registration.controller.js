/* @ngInject */
module.exports = function RegistrationController( $uibModal,loginservice,ServiceUrls) {
console.log(ServiceUrls)
   loginservice.me(function(res) {
         console.log(res);
        }, function() {
            //$rootScope.error = 'Failed to fetch details';
        })
  
    var controller = this;
    controller.openLoginModal = function (size) {
         var modalInstance = $uibModal.open({
         animation: true,
         windowClass :"login-model",
         templateUrl: './app/registration-login/login-modal/login.html',
         controller: 'LoginController',
         controllerAs: 'ctrl',
         size: size
     
    });
  };
};