/* @ngInject */
module.exports = function rejectController($uibModal, $uibModalInstance, user, $rootScope) {

    var controller = this;
    controller.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    controller.user = user;

    controller.reasons = [
        {
            name: "Photo not clear",
            value: "PHOTO_NOT_CLEAR"

        },
        {
            name: "Photo uploaded but only side face is visible",
            value: "ONLY_SIDE_FACE_IS_VISIBLE"

        },
        {
            name: "Photo uploaded but watermarked with other sites",
            value: "WATERMARKED_WITH_OTHER_SITES"

        },
        {
            name: "Celebrity/cartoon/other photos uploaded by the user",
            value: "WRONG_PHOTO"

        },
        {
            name: "Other reason",
            value: "OTHER"

        }
    ];
controller.submit=function(form){

     $rootScope.$emit('rejectPhoto',{
          
            user_id:user.user_id

        });
        controller.cancel();
};
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