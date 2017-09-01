/* @ngInject */
module.exports = function ($uibModal, loginservice) {
    return {
        restrict: 'E',
        templateUrl: './app/registration-login/components/regis.form.html',
        controllerAs: 'registerFormCtrl',
        replace: true,
        controller: [
            '$scope',
            '$element',
            '$attrs',
            '$filter',
            function ($scope, $element, $attrs, $filter) {
                var controller = this;
                var formData = require('./form-data');
                //date of birth//
                controller.monthsL = formData.monthsL;
                var year = new Date().getFullYear();
                var range = [];

                for (var i = 0; i < 50; i++) {
                    range.push({
                        label: year - i,
                        value: year - i
                    });
                }

                controller.years = range;
                //countrycodes//
                controller.countryCodes = formData.countriesWithCode;
                //email validation//
                controller.emailValidator = function (email) {
                    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                    if (!re.test(email)) {
                        return $filter('translate')('EMAIL_VALIDATION_MESSAGE');
                    }

                    return true;

                };


                //password validation//
                controller.passwordValidator = function (password) {

                    if (!password) { return; }

                    if (password.length < 6) {
                        return $filter('translate')('PASSWORD_VALIDATION_MESSAGE');
                    }

                    // if (!password.match(/[A-Z]/)) {
                    // 	 return "Password must have at least one capital letter";
                    // }

                    // if (!password.match(/[0-9]/)) {
                    // 	 return "Password must have at least one number";
                    // }

                    return true;
                };
                //dob validation/
                function calculate_age(birth_month, birth_day, birth_year) {
                    today_date = new Date();
                    today_year = today_date.getFullYear();
                    today_month = today_date.getMonth();
                    today_day = today_date.getDate();
                    age = today_year - birth_year;

                    if (today_month < (birth_month - 1)) {
                        age--;
                    }
                    if (((birth_month - 1) === today_month) && (today_day < birth_day)) {
                        age--;
                    }
                    controller.age = age;
                    return age;
                }
                controller.dobValidator = function (day, month, year, gender) {

                    if (!day) {

                        return $filter('translate')('DAY_VALIDATION');

                    }
                    if (!month) {

                        return $filter('translate')('MONTH_VALIDATION');

                    }
                    if (!year) {

                        return $filter('translate')('YEAR_VALIDATION');

                    }


                    if (gender === "MALE" && calculate_age(month, day, year) < 21) {
                        return $filter('translate')('AGE_VERIFICATION_MALE');
                    }
                    if (gender === "FEMALE" && calculate_age(month, day, year) < 18) {
                        return $filter('translate')('AGE_VERIFICATION_FEMALE');
                    }

                    return true;
                };
                controller.required = function (key) {
                    return $filter('translate')(key);
                };
                //phone validation//
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

                controller.submitMyForm = function (form) {
                    form.age = calculate_age(form.month, form.day, form.year);
                    form.dob = new Date(form.year + "-" + form.month + "-" + form.day);
                    form.created_on = new Date();
                    loginservice.signup(form, function(res) {
                       
                      if(res.success){
                  
                
                  loginservice.saveToken(res.token);
                  
                 
               }
                      
                      
                    }, function() {

                    });


                };
                // controller.openOTPModal = function (size) {
                //     var modalInstance = $uibModal.open({
                //         animation: true,
                //         windowClass: "login-model",
                //         templateUrl: './app/registration-login/otp-verification/otp.html',
                //         controller: 'OtpVrController',
                //         controllerAs: 'ctrl',
                //         size: size,
                //         backdrop: 'static',
                //         keyboard: false

                //     });
                // };

            }
        ]
    };
};
