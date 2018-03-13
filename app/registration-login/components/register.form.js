/* @ngInject */
module.exports = function ($rootScope, $uibModal, $viewusers, toastr, loginservice, $admintaskservice, $timeout) {
    return {
        restrict: 'E',
        templateUrl: 'app/registration-login/components/regis.form.html',
        controllerAs: 'registerFormCtrl',
        replace: true,
        scope: {
            isAdmin: "=",
            isEdit: "="
        },
        controller: [
            '$scope',
            '$element',
            '$attrs',
            '$filter',
            function ($scope, $element, $attrs, $filter) {




                var controller = this;
                controller.isAdmin = $scope.isAdmin;
                var formData =loginservice.getFiledsData();
                //date of birth//
                controller.formdata=formData;
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
                   if(!moment(year+" "+month+" "+day,'YYYY MM DD').isValid()){
                    return $filter('translate')('WRONG_DATE');

                   }

                    if (gender === "MALE" && loginservice.calculate_age(month, day, year) < 21) {
                        return $filter('translate')('AGE_VERIFICATION_MALE');
                    }
                    if (gender === "FEMALE" && loginservice.calculate_age(month, day, year) < 18) {
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

                    form.age = loginservice.calculate_age(form.month, form.day, form.year);
                    controller.age = form.age;
                    form.dob = new Date(form.year + "-" + form.month + "-" + form.day);
                    form.created_on = new Date();
                    if (controller.isAdmin) {
                     form.uploaded_by=$rootScope.login_user_id;
                    }
                    else{
                        form.uploaded_by=form.created_by;
                    }
                    form.vrtype="EMAIL";
                    loginservice.openotpPopup(form);
                    // loginservice.signup(form, function (res) {

                    //     if (res.success) {

                    //         if (controller.isAdmin) {
                               
                    //             loginservice.openMoreInfoModal(res.user);
                    //         }
                    //         else {
                    //             loginservice.saveToken(res.token);
                    //         }



                    //     }


                    // }, function () {

                    // });


                };


                //user edit mode////////


                function setuserResetPhoto(pic) {
                    controller.pic = pic;

                }
                var userPhotoBoradcastToDisplay = $scope.$on('userPhotoBoradcastToDisplay', function ($event, pic) {

                    setuserResetPhoto(pic);
                    $rootScope.$broadcast('updateUserListCountEmit');


                });


                controller.backViewUser = function () {

                    $rootScope.$broadcast('backUserFromEditMode');
                };
                controller.openImageUploadWindow = function (user) {
                    loginservice.openCropPopup(user);

                };
                $scope.$watch('isEdit', function (n, v) {
                    if (!n) { return; }

                    controller.userId = n;
                    setEditMode(n);
                });


                function setEditMode(user_id) {

                    $viewusers.getUser({ "user_id": user_id }, function (result) {
                        var dateObj = new Date(result.user.dob);

                        $scope.form = {
                            "created_by": result.user.created_by,
                            "gender": result.user.gender,
                            "profile_complete_status": result.user.profile_complete_status,
                            "user_role": result.user.user_role,
                            "user_status": result.user.user_status,
                            "email": result.user.email,
                            "password": result.user.password,
                            "first_name": result.user.first_name,
                            "last_name": result.user.last_name,
                            "phone_number": result.user.phone_number,
                            "age": result.user.age,
                            "dob": result.user.dob,
                            "day": dateObj.getDate(),
                            "month": dateObj.getMonth(),
                            "year": dateObj.getFullYear(),
                            "created_on": result.user.created_on,
                            "user_id": result.user.user_id,
                            "email_vr": result.user.email_vr,
                            "country_code": result.user.country_code,
                            "phone_vr": result.user.phone_vr,
                            "more_info_vr": result.user.more_info_vr
                        };

                        if (result.user.pic.length > 0) {

                            for (var key in result.user.pic) {
                                if (result.user.pic[key].photo_type === "PROFILE") {

                                    controller.pic = result.user.pic[key];
                                }

                            }
                        }
                        else {
                            controller.pic = null;
                        }

                    }, function () {

                    });

                }
                controller.accept = function (user) {
                    controller.pic.photo_vr = true;
                    $rootScope.$broadcast('userPhotoApprove', user);

                };
                controller.reject = function (user) {

                    $admintaskservice.openRejectModal(user);

                };
                var rejectPhoto = $scope.$on('rejectPhoto', function ($event, user) {
                    controller.pic.photo_vr = false;
                });
                $scope.$on('$destroy', function () {

                    userPhotoBoradcastToDisplay();
                    rejectPhoto();

                });
                // controller.openOTPModal = function (size) {
                //     var modalInstance = $uibModal.open({
                //         animation: true,
                //         windowClass: "login-model",
                //         templateUrl: 'app/registration-login/otp-verification/otp.html',
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
