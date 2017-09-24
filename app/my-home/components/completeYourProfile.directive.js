/* @ngInject */
module.exports = function ($viewusers, loginservice, $rootScope) {
    return {
        restrict: 'E',
        templateUrl: './app/my-home/components/completeYourProfile.html',
        scope: {
            profileType: "@",
            userId: "="
        },
        controllerAs: 'completeYourProfile',
        controller: [
            '$scope',
            '$element',
            '$attrs',
            function ($scope, $element, $attrs) {
                var controller = this;
                controller.ACTIONS_USER = ['ADD_PHOTO', 'EDIT_PROFILE', 'SETINGS', 'EDIT_PARTNER_PREFERENCES'];
                controller.ACTIONS_USER_BIG = ["EDIT_MY_PROFILE", "EDIT_CONTACT_DETAILS", "ADDPHOTOS", "EDIT_PARTNER_PREFERENCES"];
                //ng-click="registerFormCtrl.openImageUploadWindow({user_id:form.user_id,skip_url:'/viewusers',photo_type:'PROFILE',from_sec:'userEdit'})"

                controller.goToUserAction = function (action) {
                    if (action === "ADD_PHOTO") {
                        var user = {
                            user_id: $scope.userId,
                            skip_url: '/dashboard',
                            photo_type: 'PROFILE',
                            from_sec: 'userEdit'
                        };
                        loginservice.openCropPopup(user);
                        return;
                    }
                };
                $rootScope.$on('userPhotoBoradcastToDisplay', function ($event, pic) {
                    controller.pic = pic;
                    loginservice.setProfilePic(pic);
                });
               // console.log($rootScope.current_user_de_all);

                controller.user = $rootScope.current_user_de_all;
                controller.pic = loginservice.getProfilePic();
                controller.ProfilePercentage = {

                    width: calculateProfilePercentage($rootScope.current_user_de_all) + "%"
                };

                // $viewusers.getUser({ "user_id": $scope.userId }, function (result) {


                //     controller.user = result.user;
                //     controller.pic = result.user.pic[0];
                //     controller.ProfilePercentage = {

                //         width: calculateProfilePercentage(controller.user) + "%"
                //     };




                // }, function () { });
                function calculateProfilePercentage(user) {
                    var p = 0;

                    if (user.more_info_vr) {
                        p += 25;
                        if (user.basicinfos[0].gothram) {
                            p += 1;
                        }
                        if (user.basicinfos[0].subcaste) {
                            p += 1;
                        }
                        //usereducations
                        if (user.usereducations[0].filed_study) {
                            p += 1;
                        }
                        if (user.usereducations[0].company) {
                            p += 1;
                        }
                        if (user.usereducations[0].designation) {
                            p += 1;
                        }
                        //userintrests
                        if (user.userintrests[0].weight) {
                            p += 1;
                        }
                        if (user.userintrests[0].complexion) {
                            p += 1;
                        }
                        if (user.userintrests[0].body_type) {
                            p += 1;
                        }
                        if (user.userintrests[0].hobbie) {
                            p += 1;
                        }
                        if (user.userintrests[0].expectation) {
                            p += 1;
                        }
                        //userfamilies//
                        if (user.userfamilies[0].father) {
                            p += 1;
                        }
                        if (user.userfamilies[0].father_occupation) {
                            p += 1;
                        }
                        if (user.userfamilies[0].mother) {
                            p += 1;
                        }
                        if (user.userfamilies[0].siblings) {
                            p += 1;
                        }
                        if (user.userfamilies[0].mosal) {
                            p += 1;
                        }
                        if (user.userfamilies[0].address) {
                            p += 1;
                        }
                        if (user.userfamilies[0].city) {
                            p += 1;
                        }
                        if (user.userfamilies[0].native_place) {
                            p += 1;
                        }
                        if (user.userfamilies[0].time_birth_hr) {
                            p += 1;
                        }
                        if (user.userfamilies[0].time_birth_min) {
                            p += 1;
                        }
                        if (user.userfamilies[0].place_birth) {
                            p += 1;
                        }
                        if (user.userfamilies[0].horoscope) {
                            p += 1;
                        }
                        if (user.userfamilies[0].zodiac) {
                            p += 1;
                        }
                        if (user.userfamilies[0].aincome) {
                            p += 1;
                        }
                        if (user.userfamilies[0].manglik || !user.userfamilies[0].manglik) {
                            p += 1;
                        }
                        //  if(user.userfamilies[0].beleave_hor || !user.userfamilies[0].beleave_hor ){
                        //      p+=1;
                        //  }
                    }
                    if (user.email_vr) {
                        p += 25;
                    }
                    if (user.pic.length > 0) {
                        // p +=25;
                        if (user.pic[0].photo_vr) {
                            p += 25;
                        }
                    }
                    return p;
                }
                controller.profileType = $scope.profileType;


            }
        ]
    };
};
