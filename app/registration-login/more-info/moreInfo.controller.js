/* @ngInject */
module.exports = function MoreInfoController($rootScope,$location) {
var controller=this;
    controller.user = $rootScope.current_user_de_all;
   
    if( controller.user.more_info_vr){
        $location.path("/dashboard");
    }
};