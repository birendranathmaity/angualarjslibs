/* @ngInject */
module.exports = function ($http, $viewusers, $sessionStorage, $localStorage, ServiceUrls, $location, $uibModal, $rootScope) {

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
            $rootScope.login_user_id = user.user_id;

        }
        return user;
    }




    var service = {
        signup: function (data, success, error) {
            $http.post(ServiceUrls.BASEURL + ServiceUrls.SINGUP, data).success(success).error(error);
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
        verifyOtp: function (data, success, error) {
            var user = getUserFromToken();
            data.user_id = user.user_id;
            $http.post(ServiceUrls.BASEURL + ServiceUrls.OTPVERIFY, data).success(success).error(error);
        },

        afterloginRoute: function () {

            var logindata = getUserFromToken();

            var user = logindata;



            if (!user.phone_vr) {
                this.openotpPopup();
                return;
            }
            if (!user.more_info_vr) {
                $location.path('/moreinfo');
                return;
            }
            if (user.user_role === "ADMIN") {
                $location.path('/admin');
                return;
            }
            if (user.user_role === "FREEUSER") {
                $location.path('/dashboard');
                return;
            }

        },
        openCropPopup: function (user) {
            var modalInstance = $uibModal.open({
                animation: true,
                windowClass: "",
                templateUrl: './app/registration-login/crop-modal/crop-modal.html',
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
        openotpPopup: function () {
            var modalInstance = $uibModal.open({
                animation: true,
                windowClass: "login-model",
                templateUrl: './app/registration-login/otp-verification/otp.html',
                controller: 'OtpVrController',
                controllerAs: 'ctrl',
                size: "lg",
                backdrop: 'static',
                keyboard: false

            });
        },
        openMoreInfoModal: function (user) {
            var modalInstance = $uibModal.open({
                animation: true,
                windowClass: "login-model",
                templateUrl: './app/registration-login/goto-moreinfo-modal/goto-moreinfo.html',
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
            var d = getUserFromToken();
var self=this;
            self.getCureentUser(d.user_id, function (rs) {

                if (rs) {
                    self.afterloginRoute();
                }
            });


        },
        getCurrentUserRole: function (success) {
            var cUser = getUserFromToken();

            if ($sessionStorage.token) {

                success(cUser.user_role);
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
        getFiledsData: function () {
            var formdata = require('./form-data');
            return formdata;
        },
        getProfilePic: function () {
            console.log($rootScope.current_user_de_all.pic)
            var pics={
                profile:null,
                album:[]
            }
            if ($rootScope.current_user_de_all.pic.length > 0) {

                for (var key = 0; key < $rootScope.current_user_de_all.pic.length; key++) {
                    if ($rootScope.current_user_de_all.pic[key].photo_type === "PROFILE") {
                            pics.profile=$rootScope.current_user_de_all.pic[key];
                        //return $rootScope.current_user_de_all.pic[key];
                    }
                    else{
                         var imgUrl = ServiceUrls.BASEURL + ServiceUrls.USER_PROFILE_PHOTO_DISPLAY_PATH + $rootScope.current_user_de_all.pic[key].photo_path;

                        var alb={
                            id:$rootScope.current_user_de_all.pic[key]._id,
                            url:imgUrl
                        }
                        pics.album.push(alb);
                    }

                }
            }
            return pics;
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
        logout: function (success, error) {
            var user = getUserFromToken();
            var data = {};
            $rootScope.current_user_de_all = {};
            data.user_id = user.user_id;

            changeUser({});
            delete $sessionStorage.token;
            $http.post(ServiceUrls.BASEURL + ServiceUrls.LOGOUT, data).success(success).error(error);
        }
    };

    var currentUser = getUserFromToken();
    if (currentUser.user_id) {
        console.log("user data")
        service.getCureentUser(currentUser.user_id,function(){});
    }
    return service;
};