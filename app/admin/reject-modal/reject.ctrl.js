/* @ngInject */
module.exports = function rejectController($uibModal,$uibModalInstance,user, $rootScope) {
  
    var controller = this;
    controller.cancel = function () {
     $uibModalInstance.dismiss('cancel');
    };
    controller.user=user;
    // controller.comunicateRegisterForm=function(type){
       
    //     if(type==="SKIP"){
    //      $rootScope.$emit('comRegViaGoMoreInfoMl',{
    //         type:"SKIP",
    //         user_id:user.user_id
    //     });
    //     }
    //     if(type==="ADDMOREINFO"){
    //      $rootScope.$emit('comRegViaGoMoreInfoMl', {
    //         type:"ADDMOREINFO",
    //         user_id:user.user_id
    //     });
    //     }
    //  controller.cancel();
    // };
    
    

};