/* @ngInject */
module.exports = function OtpVrController(user, $uibModal, $uibModalInstance, loginservice, $filter,toastr, $rootScope, $location) {
    var controller = this;
    controller.otpnumber = "";
    controller.user = user;
    controller.isContineBtn = true;
    controller.isEnterOtp = false;
    controller.invalidOtp = false;
    // controller.isEmail = false;
    // controller.isPhone = false;
    if (user.vrtype === "EMAIL") {
        controller.isEmail = true;
        controller.isPhone = false;
    }
    if (user.vrtype === "PHONE_NUMBER_VR") {
        controller.isEmail = false;
        controller.isPhone = true;
        var formData = loginservice.getFiledsData();
        controller.countryCodes = formData.countriesWithCode;
       
    }
   controller.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    controller.emailValidator = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!re.test(email)) {
            return $filter('translate')('EMAIL_VALIDATION_MESSAGE');
        }

        return true;

    };
    controller.phoneValidator = function (phone) {
        var re = /[0-9]{10}/;

        if (!re.test(phone)) {
            return $filter('translate')('PHONE_VALIDATION_MESSAGE');
        }
        if (phone.length < 10 || phone.length > 10) {
            return $filter('translate')('PHONE_VALIDATION_MESSAGE');
        }

        return true;

    };
    controller.required = function (key) {
        return $filter('translate')(key);
    };
    controller.sendOTP = function () {

        if (controller.isEmail) {
            loginservice.sendEmailOtp({ email: controller.user.email.toLowerCase() }, function (result) {
                if (result.success) {
                    controller.isEnterOtp = true;
                    controller.isEmail = false;
                    controller.isPhone = false;
                }

            }, function (err) { });
        }

        if (controller.isPhone) {
            loginservice.sendPhoneOtp({ phone_number: controller.user.country_code+controller.user.phone_number }, function (result) {
                if (result.success) {
                    controller.isEnterOtp = true;
                    controller.isEmail = false;
                    controller.isPhone = false;
                }

            }, function (err) { });
        }

    };
    controller.veryFyOtp = function (OTP) {
        var req = {
            otp: OTP,
            type: "",
            user: controller.user
        };
        if (user.vrtype === "EMAIL") {
            req.type = "EMAIL";
            controller.user.email = controller.user.email.toLowerCase();
            loginservice.verifyOtp(req, function (res) {
                
                            controller.invalidOtp = false;
                
                            if (res.success) {
                                controller.cancel();
                
                                loginservice.saveToken(res.token);
                
                            }
                            else {
                                controller.invalidOtp = true;
                            }
                
                        }, function () { });
        }

        if (user.vrtype === "PHONE_NUMBER_VR") {
            req.type = "PHONE_NUMBER_VR";
            loginservice.verifyOtp(req, function (res) {
                
                            controller.invalidOtp = false;
                
                            if (res.success) {
                                $rootScope.current_user_de_all.phone_vr=true;
                                $rootScope.$broadcast('userProfileUpdate');
                                toastr.success('Successfully verified');
                                controller.cancel();
                              }
                            else {
                                controller.invalidOtp = true;
                            }
                
                        }, function () { });
        }






    };

};