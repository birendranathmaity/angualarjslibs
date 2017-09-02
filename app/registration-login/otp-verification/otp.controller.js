/* @ngInject */
module.exports = function OtpVrController($uibModal,$uibModalInstance,loginservice,$filter,  $location) {
  
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
                          if(!res.user.more_info_vr){
                                 $location.path("/moreinfo");
                          }
                          else{
                               $location.path("/dashboard");
                          }
                          
                        //  loginservice.afterloginRoute();
                     }
                     else{
                         controller.invalidOtp=true;
                     }
                      
                    }, function() {

                    });

};

};