/* @ngInject */
module.exports = function ($uibModal, toastr, $viewusers, $filter, countryService, loginservice, $rootScope) {
    return {
        restrict: 'E',
        templateUrl: './app/registration-login/components/basic-info.html',
        controllerAs: 'ctrl',
        scope: {
            userId: "=",
            isAdmin: "@",
            isMoreinfoEdit: "@"
        },
        controller: [
            '$scope',
            '$element',
            '$attrs',
            function ($scope, $element, $attrs) {
                var controller = this;
                controller.editMode = false;
                if ($scope.isMoreinfoEdit) {
                    controller.editMode = true;
                }



                $scope.$watch('userId', function (n, v) {
                    if (!n) { return; }

                    controller.userId = n;
                    if (controller.editMode) {
                        controller.loaduserDetails(n);
                    }

                });


                controller.formdata = loginservice.getFiledsData();
                //open login modal//
                controller.openLoginModal = function (size) {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        windowClass: "login-model",
                        templateUrl: './app/registration-login/login-modal/login.html',
                        controller: 'LoginController',
                        controllerAs: 'ctrl',
                        size: size

                    });
                };
                //wizard menu///
                controller.moreInfoTabsmenu = [{
                    id: "basic",
                    translateKey: "BASIC_MORE_DETAILS",
                    active: false
                },
                {
                    id: "education",
                    translateKey: "EDUCATION_&_WORK_INFO",
                    active: false
                },
                {
                    id: "interests",
                    translateKey: "YOUR_LOOK_&_INTERESTS",
                    active: false
                },
                {
                    id: "family",
                    translateKey: "FAMILY_BACKGROUND_&_HOROSCOPE",
                    active: false
                }
                ];
                controller.openTabContent = function (tabID) {
                    for (var i = 0; i < controller.moreInfoTabsmenu.length; i++) {
                        if (controller.moreInfoTabsmenu[i].id === tabID) {
                            controller.moreInfoTabsmenu[i].active = true;

                        } else {
                            if (controller.editMode) {
                                controller.moreInfoTabsmenu[i].active = true;
                            }
                            else {
                                controller.moreInfoTabsmenu[i].active = false;
                            }


                        }
                    }

                };

                controller.openTabContent('basic');

                //load basic info data//
                var hindu = controller.formdata.rhindu;
                var muslim = controller.formdata.rmuslim;
                var christian = controller.formdata.rchristian;

                var noCaste = [ {
                    "name": "Any",
                    "value": "ANYONE"
                }];
                controller.loadCaste = function (rel) {
                    if (rel === "HINDU") {
                        controller.casteData = hindu;
                        return;
                    }
                    if (rel === "ISLAM") {
                        controller.casteData = muslim;
                        return;
                    }
                    if (rel === "CHR") {
                        controller.casteData = christian;
                        return;
                    }
                   
                    controller.casteData = noCaste;

                };
                controller.required = function (key) {
                    return $filter('translate')(key);
                };
                var unique = function (origArr) {
                    var newArr = [],
                        origLen = origArr.length,
                        found, x, y;

                    for (x = 0; x < origLen; x++) {
                        found = undefined;
                        for (y = 0; y < newArr.length; y++) {
                            if (origArr[x].state === newArr[y].state) {
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            newArr.push(origArr[x]);
                        }
                    }
                    return newArr;
                };
                //load country details//
                controller.countriesCodes = controller.formdata.countriesWithCode;
                countryService.getCountries(function (res) {
                    controller.countrys = res;
                }, function () { });


                controller.loadState = function (countryId) {

                    countryService.getStates(countryId, function (res) {
                        controller.states = res;
                    }, function () { });
                };
                controller.loadCity = function (stateId) {
                    countryService.getCities(stateId, function (res) {
                        controller.cities = res;
                        // controller.cities.push({ id: "other", name: "Other" });
                    }, function () { });
                };

                //education work ///
                //  open help me write modal//
                controller.OpenHelpMeWorkModal = function (size) {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        windowClass: "",
                        templateUrl: './app/registration-login/help-me-write/help-me-write.html',
                        controller: 'HelpMeWriteController',
                        controllerAs: 'ctrl',
                        size: size

                    });
                };
                //hobbies
                controller.hobbies = controller.formdata.hobbies;
                controller.zodiac = controller.formdata.zodiac;

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
                controller.openDisplayPhotoUploadModal = function (size) {
                    loginservice.openCropPopup({});
                    //  var modalInstance = $uibModal.open({
                    //             animation: true,
                    //             windowClass: "",
                    //             templateUrl: './app/registration-login/crop-modal/crop-modal.html',
                    //             controller: 'CropModalController',
                    //             controllerAs: 'ctrl',
                    //             size: size,
                    //             backdrop: 'static',
                    //             keyboard: false

                    //         });
                };

                var regisFormSubmitStatus = $rootScope.$on('regisFormSubmitStatus', function ($event, registerform) {

                    if (controller.editMode) {
                        controller.registerform = registerform;
                    }

                });

                controller.submitMoreInfo = function (basicinfo, educationwork, intrests, family) {

                    intrests.height = parseFloat(intrests.height);

                    // if (family.beleave_hor) {
                    //     family.beleave_hor = "YES";
                    // }
                    // else {
                    //     family.beleave_hor = "NO";
                    // }
                    // if (family.manglik) {
                    //     family.manglik = "YES";
                    // }
                    // else {
                    //     family.manglik = "NO";
                    // }

                    //family.time_birth_min=parseInt(family.time_birth_min);
                    //family.time_birth_hr=parseInt(family.time_birth_hr);

                    var req = {
                        "user_id": controller.userId,
                        "basicinfo": basicinfo,
                        "educationwork": educationwork,
                        "intrests": intrests,
                        "family": family
                    };

                    loginservice.savemoreinfo(req, function (res) {

                        if (res.success && !controller.editMode) {
                            toastr.success('Saved Successfully');
                            if ($scope.isAdmin) {

                                res.skip_url = "/viewusers";

                            }
                            else {

                                res.skip_url = "/dashboard";
                            }

                            res.user_id = controller.userId;
                            res.from_sec = 'userEntry';
                            res.photo_type = "PROFILE";
                            loginservice.openCropPopup(res);


                        }
                        if (controller.editMode) {
                            updateRegisterForm();
                        }


                    }, function () {

                    });


                };

                function updateRegisterForm() {


                    var regisform = {
                        "user_id": controller.userId,
                        "email": controller.registerform.email.$modelValue,
                        "password": controller.registerform.password.$modelValue,
                        "first_name": controller.registerform.first_name.$modelValue,
                        "last_name": controller.registerform.last_name.$modelValue,
                        "day": controller.registerform.day.$modelValue,
                        "month": controller.registerform.month.$modelValue,
                        "year": controller.registerform.year.$modelValue,
                        "country_code": controller.registerform.country_code.$modelValue,
                        "phone_number": controller.registerform.phone_number.$modelValue,
                        "gender": controller.registerform.sex.$modelValue,
                        "created_by": controller.registerform.created_by.$modelValue

                    };
                    regisform.dob = new Date(regisform.year + "-" + regisform.month + "-" + regisform.day);
                    regisform.age = loginservice.calculate_age(regisform.month, regisform.day, regisform.year);


                    loginservice.signup(regisform, function (res) {
                        if (res.success) {

                            toastr.success('Updated Successfully');
                        }

                    }, function () { });
                }

                controller.loaduserDetails = function (userId) {
                    $viewusers.getUser({ user_id: userId }, function (result) {


                        if (result.user.basicinfos.length > 0) {

                            var countryId = result.user.basicinfos[0].country;
                            var stateId = result.user.basicinfos[0].state;
                            var religion = result.user.basicinfos[0].religion;
                            controller.loadCaste(religion);
                            controller.loadState(countryId);
                            controller.loadCity(stateId);
                            $scope.basicinfo = result.user.basicinfos[0];
                            $scope.educationwork = result.user.usereducations[0];
                            $scope.intrests = result.user.userintrests[0];
                            $scope.family = result.user.userfamilies[0];
                            $scope.intrests.height = $scope.intrests.height.toFixed(1);

                        }



                    }, function () {

                    });
                };
                $rootScope.$on('$destroy', function () {

                    regisFormSubmitStatus();

                });

            }
        ]
    };
};