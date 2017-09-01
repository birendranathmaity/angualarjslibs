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
                          loginservice.saveToken(res.token);
                         // $location.path("/moreinfo");
                     }
                     else{
                         controller.invalidOtp=true;
                     }
                      
                    }, function() {

                    });

};

};