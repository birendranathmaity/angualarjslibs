/* @ngInject */
module.exports = function HelpMeWriteController($uibModal,$uibModalInstance) {
  
    var controller = this;
   controller.cancel = function () {
     $uibModalInstance.dismiss('cancel');
    };


};