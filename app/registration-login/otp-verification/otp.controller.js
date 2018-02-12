/* @ngInject */
module.exports = function OtpVrController($uibModal,$uibModalInstance,loginservice,$filter, $rootScope, $location) {
  
    var controller = this;
      controller.invalidOtp=false;
   controller.cancel = function () {
     $uibModalInstance.dismiss('cancel');
    };
     controller.required = function (key) {
                    return $filter('translate')(key);
                };
controller.veryFyOtp=function(OTP){

var req={
    otp:OTP
};

loginservice.verifyOtp(req, function(res) {
   
                     controller.invalidOtp=false;
                     if(res.success){
                          controller.cancel();
                          $rootScope.current_user_de_all.phone_vr=true;
                        //   if(!res.user.more_info_vr){
                        //          $location.path("/moreinfo");
                        //   }
                        //   else{
                        //        $location.path("/dashboard");
                        //   }
                          
                         loginservice.afterloginRoute(res.user.user_role,"/moreinfo");
                     }
                     else{
                         controller.invalidOtp=true;
                     }
                      
                    }, function() {

                    });

};

};