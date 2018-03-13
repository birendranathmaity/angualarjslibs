/* @ngInject */
module.exports = function DashboardController($rootScope,loginservice) {
    var controller = this;
    controller.profile = null;
    if(!$rootScope.current_user_de_all.phone_vr){
      var config={
        vrtype:"PHONE_NUMBER_VR",
        user_id:$rootScope.current_user_de_all.user_id,
        country_code: $rootScope.current_user_de_all.country_code,
        phone_number:$rootScope.current_user_de_all.phone_number
      }
     
      loginservice.openotpPopup(config);
    }
  
   

  };