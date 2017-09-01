/* @ngInject */
module.exports = function ForgetPasswordController($uibModalInstance) {
  
    var controller = this;
   controller.cancel = function () {
     $uibModalInstance.dismiss('cancel');
    };
};