/* @ngInject */
module.exports = function (PermRoleStore, $http, $q, $urlRouter, $viewusers, socket, $state, $timeout, $sessionStorage, $localStorage, ServiceUrls, $location, $uibModal, $rootScope) {

    function changeUser(user) {
        angular.extend(currentUser, user);
    }

    function urlBase64Decode(str) {
        var output = str.replace('-', '+').replace('_', '/');
        switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += '==';
                break;
            case 3:
                output += '=';
                break;
            default:
                throw 'Illegal base64url string!';
        }
        return window.atob(output);
    }

    function getUserFromToken() {
        var token = $sessionStorage.token;
        var user = {};
        if (typeof token !== 'undefined') {
            var encoded = token.split('.')[1];
            var obj = JSON.parse(urlBase64Decode(encoded));
            user = obj._doc;
            $rootScope.fname = user.first_name;
            $rootScope.login_user_role = user.user_role;
            if (user.user_status === "ACTIVE") {
                $rootScope.user_action = true;
            }
            else {
                $rootScope.user_action = false;
            }
            $rootScope.login_user_id = user.user_id;
            $rootScope.login_user_gender = user.gender;

        }
        return user;
    }




    var service = {
        signup: function (data, success, error) {
            $http.post(ServiceUrls.BASEURL + ServiceUrls.SINGUP, data).success(success).error(error);
        },
        updateUser: function (data, success, error) {
            $http.post(ServiceUrls.BASEURL + ServiceUrls.UPDATEUSER, data).success(success).error(error);
        },
        savemoreinfo: function (data, success, error) {

            $http.post(ServiceUrls.BASEURL + ServiceUrls.SAVEMOREINFO, data).success(success).error(error);
        },
        signin: function (data, success, error) {
            $http.post(ServiceUrls.BASEURL + ServiceUrls.SIGNIN, data).success(success).error(error);
        },
        checkemail: function (data, success, error) {
            $http.post(ServiceUrls.BASEURL + ServiceUrls.CHECKEMAILID, data).success(success).error(error);
        },
        sendEmailOtp: function (data, success, error) {
            $http.post(ServiceUrls.BASEURL + ServiceUrls.SENDEMAILOTP, data).success(success).error(error);
        },
        sendPhoneOtp: function (data, success, error) {
            $http.post(ServiceUrls.BASEURL + ServiceUrls.SENDEPHONEOTP, data).success(success).error(error);
        },
        verifyOtp: function (data, success, error) {

            $http.post(ServiceUrls.BASEURL + ServiceUrls.OTPVERIFY, data).success(success).error(error);
        },
        getCastes: function (rel) {
            var formdata = this.getFiledsData();
            var hindu = formdata.rhindu;
            var muslim = formdata.rmuslim;
            var christian = formdata.rchristian;
            var casteData = [];
            if (rel === "HINDU") {
                casteData = hindu;
                $.map(casteData, function (a) {
                    return a.religion = rel;
                });
                return casteData;
            }
            if (rel === "ISLAM") {
                casteData = muslim;
                $.map(casteData, function (a) {
                    return a.religion = rel;
                });
                return casteData;
            }
            if (rel === "CHR") {
                casteData = christian;
                $.map(casteData, function (a) {
                    return a.religion = rel;
                });
                return casteData;
            }

            return casteData = [{

                name: "Other",
                religion: rel,
                value: rel + "OTH"

            }];
        },
        redirectTo:function(){
            var isAuthenticated = this.isAuthenticated();
            if (!isAuthenticated.isAuth){
                return 'login';
            }
        },
        setRole: function (role, more_info_vr) {
           
            PermRoleStore.defineRole(role, function (permissionName, route) {
                return true;
             });
            $urlRouter.sync();
            $urlRouter.listen();
        },
        afterloginRoute: function (role) {
            var user = getUserFromToken();

            if (role === "ADMIN") {
                $location.path('/admin');
                return;
            }
            if (role === "FREEUSER") {

                if (!user.more_info_vr) {
                    $location.path('/moreinfo');

                    return;
                }
                else {

                    $location.path('/dashboard');

                }



            }



        },
        openCropPopup: function (user) {
            var modalInstance = $uibModal.open({
                animation: true,
                windowClass: "",
                templateUrl: 'app/registration-login/crop-modal/crop-modal.html',
                controller: 'CropModalController',
                controllerAs: 'ctrl',
                size: "lg",
                backdrop: 'static',
                keyboard: false,
                resolve: {
                    user: function () {
                        return user;
                    }
                }

            });
        },
        openotpPopup: function (user) {
            var modalInstance = $uibModal.open({
                animation: true,
                windowClass: "login-model",
                templateUrl: function (elem, attrs) {

                    if (user.vrtype === "PHONE_NUMBER_VR") {
                        return 'app/registration-login/otp-verification/phone_p.html';
                    }
                    if (user.vrtype === "EMAIL") {
                        return 'app/registration-login/otp-verification/email.html';
                    }


                },
                // templateUrl:user.vrtype === "EMAIL" ? './app/registration-login/otp-verification/email.html' : './app/registration-login/otp-verification/email.html',
                controller: 'OtpVrController',
                controllerAs: 'ctrl',
                size: "lg",
                backdrop: 'static',
                keyboard: false,
                resolve: {
                    user: function () {
                        return user;
                    }
                }

            });
        },
        openMoreInfoModal: function (user) {
            var modalInstance = $uibModal.open({
                animation: true,
                windowClass: "login-model",
                templateUrl: 'app/registration-login/goto-moreinfo-modal/goto-moreinfo.html',
                controller: 'goToMoreController',
                controllerAs: 'ctrl',
                size: "lg",
                backdrop: 'static',
                keyboard: false,
                resolve: {
                    user: function () {
                        return user;
                    }
                }

            });
        },
        saveToken: function (token) {
             $sessionStorage.token = token;
             var user = getUserFromToken();
             var self = this;
             self.getCureentUser(user.user_id, function (rs) {
             if (rs) {
                    self.setRole(user.user_role, user.more_info_vr);
                    self.afterloginRoute(user.user_role);
                }
            });


        },
     getCurrentUserSession: function (success) {
            var cUser = getUserFromToken();

            if ($sessionStorage.token) {

                success(cUser);
            }
            else {
                $location.path("/register");
            }
        },
        getCureentUser: function (userId, success) {
            $viewusers.getUser({ "user_id": userId }, function (result) {


                $rootScope.current_user_de_all = result.user;

                success(true);

            }, function () { });
        },
        getFiledsDataForBasicInfo: function () {
            var formdata = require('./form-data');
            return formdata;
        },
        getFiledsData: function (field) {
            var formdata1 = require('./form-data');
            var formdata = angular.copy(formdata1);
            var edus = [];
            for (var ik = 0; ik < formdata.educations.length; ik++) {
                var gnameedu = formdata.educations[ik].groupname;

                for (var jk = 0; jk < formdata.educations[ik].grupitems.length; jk++) {
                    var edu = formdata.educations[ik].grupitems[jk];
                    edu.gname = gnameedu;
                    edus.push(edu);
                }
            }
            var occ = [];
            for (var i = 0; i < formdata.occupations.length; i++) {
                var gname = formdata.occupations[i].groupname;

                for (var j = 0; j < formdata.occupations[i].grupitems.length; j++) {
                    var itm = formdata.occupations[i].grupitems[j];
                    itm.gname = gname;
                    occ.push(itm);
                }
            }
            var focc = [];
            for (var ip = 0; ip < formdata.fatheroccupation.length; ip++) {
                var gnamep = formdata.fatheroccupation[ip].groupname;

                for (var jp = 0; jp < formdata.fatheroccupation[ip].grupitems.length; jp++) {
                    var itmp = formdata.fatheroccupation[ip].grupitems[jp];
                    itmp.gname = gnamep;
                    focc.push(itmp);
                }
            }
            formdata.educations = edus;
            formdata.occupations = occ;
            formdata.fatheroccupation = focc;
            if (field) {
                return formdata[field];
            }
            else {
                return formdata;
            }

        },
        getProfilePic: function () {
            var pics = {
                profile: null,
                album: []
            };
            if ($rootScope.current_user_de_all.pic.length > 0) {

                for (var key = 0; key < $rootScope.current_user_de_all.pic.length; key++) {
                    if ($rootScope.current_user_de_all.pic[key].photo_type === "PROFILE") {
                        pics.profile = $rootScope.current_user_de_all.pic[key];
                        //return $rootScope.current_user_de_all.pic[key];
                    }
                    else {
                        var imgUrl = ServiceUrls.BASEURL + ServiceUrls.USER_PROFILE_PHOTO_DISPLAY_PATH + $rootScope.current_user_de_all.pic[key].photo_path;

                        var alb = {
                            id: $rootScope.current_user_de_all.pic[key]._id,
                            url: imgUrl
                        };
                        pics.album.push(alb);
                    }

                }
            }
            return pics;
        },

        getAlbumPics: function (data, success) {

            $http.post(ServiceUrls.BASEURL + ServiceUrls.GET_ALBUM, data).success(function (res) {
                var imgs = [];
                angular.forEach(res, function (v, i) {

                    var imgUrl = ServiceUrls.BASEURL + ServiceUrls.USER_PROFILE_PHOTO_DISPLAY_PATH + v.photo_path;
                    var img = {
                        id: v._id,
                        url: imgUrl

                    };
                    imgs.push(img);



                });

                success(imgs);
            });

        },
        setProfilePic: function (pic) {
            if ($rootScope.current_user_de_all.pic.length > 0) {

                for (var key = 0; key < $rootScope.current_user_de_all.pic.length; key++) {
                    if ($rootScope.current_user_de_all.pic[key].photo_type === "PROFILE") {

                        $rootScope.current_user_de_all.pic[key] = pic;
                    }

                }
            }
            else {
                $rootScope.current_user_de_all.pic.push(pic);
            }

        }, getAuthObject: function () {
            var deferred = $q.defer();
            //var loginuser=$rootScope.current_user_de_all;
            // later we can use this quick way -
            // - once user is already loaded
            if ($sessionStorage.token) {
                var cUser = getUserFromToken();


            }
            else {
                $location.path("/register");
                return;
            }
            if ($rootScope.current_user_de_all) {
                return $q.when($rootScope.current_user_de_all);
            }

            // server fake call, in action would be $http
            $timeout(function () {
                $viewusers.getUser({ "user_id": cUser.user_id }, function (result) {

                    $rootScope.current_user_de_all = result.user;
                    deferred.resolve(result.user);


                }, function () { });

            }, 500);

            return deferred.promise;
        },

        // sync, quick way how to check IS authenticated...
        isAuthenticated: function () {
            if ($sessionStorage.token) {

                if ($rootScope.current_user_de_all) {

                    return {
                        role: $rootScope.current_user_de_all.user_role,
                        more_info_vr: $rootScope.current_user_de_all.more_info_vr,
                        isAuth: true
                    };
                }
                else {
                    return {
                        role: null,
                        isAuth: true
                    };
                }


            }
            else {


                return {
                    role: null,
                    isAuth: false
                };
            }
        },
        calculate_age: function (birth_month, birth_day, birth_year) {
            var today_date = new Date();
            var today_year = today_date.getFullYear();
            var today_month = today_date.getMonth();
            var today_day = today_date.getDate();
            var age = today_year - birth_year;

            if (today_month < (birth_month - 1)) {
                age--;
            }
            if (((birth_month - 1) === today_month) && (today_day < birth_day)) {
                age--;
            }

            return age;
        },
        logout: function (success) {
            var user = getUserFromToken();
            var data = {
                user_id: user.user_id
            };
            $rootScope.current_user_de_all = null;


            changeUser({});
            delete $sessionStorage.token;
            socket.emit('logout', { user_id: user.user_id }, function (result) {
                success(true);
            });
            // 
            // $http.post(ServiceUrls.BASEURL + ServiceUrls.LOGOUT, data).success(success).error(error);
        }
    };

    var currentUser = getUserFromToken();
    return service;
};