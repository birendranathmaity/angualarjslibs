/* @ngInject */
module.exports = function ($http,$q, $viewusers,socket, $state, $timeout, $sessionStorage, $localStorage, ServiceUrls, $location, $uibModal, $rootScope) {

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
        verifyOtp: function (data, success, error) {
            var user = getUserFromToken();
           // data.user_id = user.user_id;
           var req= {
            user_id:user.user_id,
              otp:data.otp
            }
            $http.post(ServiceUrls.BASEURL + ServiceUrls.OTPVERIFY, req).success(success).error(error);
        },

        afterloginRoute: function (role) {

            if (!$sessionStorage.token) {

                $location.path("/login");
               }
           var user = $rootScope.current_user_de_all;
         
          //  var pic = this.getProfilePic();
            if (role === "ADMIN") {
                $location.path('/admin');
                // if (state === "HOME" || state === "/register" || state === "/login") {
                //     $location.path('/admin');
                    
                // }
                // else {
                //   //  $location.path(state);
                //     return;
                // }
               
            }
           if (role === "FREEUSER") {

                if (!user.phone_vr) {
                    this.openotpPopup();
                   
                    return;
                }
                if (!user.more_info_vr) {
                    $location.path('/moreinfo');
                   
                    return;
                }
                $location.path('/dashboard');
                // if (!pic.profile) {
                //     var config = {
                //         user_id: user.user_id,
                //         from_sec: 'userEntry',
                //         photo_type: 'PROFILE'
                //     };

                //     this.openCropPopup(config);
                //     return;

                // }
                // if (state === "HOME" || state === "/register" || state === "/login") {
                //     console.log("hh")
                //     $location.path('/dashboard');
                //     success();
                //     //return;
                // }
                // else {
                   
                //   //  $location.path(state);
                   
                // }

               
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
            var self = this;
            
            self.getCureentUser(d.user_id, function (rs) {

                if (rs) {
                    self.afterloginRoute(d.user_role);
                }
            });


        },

        getUserShrotInfo: function (data) {

        },
        getCurrentUserRole: function (success) {


            if ($sessionStorage.token) {
                var cUser = getUserFromToken();
                if ($rootScope.current_user_de_all) {

                    success(cUser.user_role);
                    ///return;
                }
                else {
                    this.getCureentUser(cUser.user_id, function (result) {

                        success(cUser.user_role);
                      //  return;
                    });
                }

            }
            else {
                $location.path("/register");
            }

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
        getFiledsData: function () {
            var formdata = require('./form-data');
            return formdata;
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
            }
            if ($rootScope.current_user_de_all) {
                return $q.when($rootScope.current_user_de_all);
            }

            // server fake call, in action would be $http
            $timeout(function () {
                // server returned UN authenticated user
               // loginuser = {isAuthenticated: false };
                // $http.get("./albums.ms")
                // .success(function(data) {
                //     deferred.resolve(loginuser)
                //     def.resolve(data);
                // })
                // .error(function() {
                //     def.reject("Failed to get albums");
                // });
                $viewusers.getUser({ "user_id": cUser.user_id }, function (result) {
                    
                    
                                    $rootScope.current_user_de_all = result.user;
                                    deferred.resolve(result.user)
                                   
                    
                                }, function () { });
               
            }, 500)

            return deferred.promise;
        },

        // sync, quick way how to check IS authenticated...
        isAuthenticated: function () {
             if($sessionStorage.token){

                if ($rootScope.current_user_de_all){

                    return{
                        role:$rootScope.current_user_de_all.user_role,
                        isAuth:true
                    }
                }
                else{
                    return{
                        role:null,
                        isAuth:true
                    }
                }
                

            }
            else{
                
               
                return{
                    role:null,
                    isAuth:false
                }
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
                user_id:user.user_id
            };
            $rootScope.current_user_de_all =null;
           
            
            changeUser({});
            delete $sessionStorage.token;
            socket.emit('logout',{user_id:user.user_id},function(result){
                success(true)
            });
           // 
           // $http.post(ServiceUrls.BASEURL + ServiceUrls.LOGOUT, data).success(success).error(error);
        }
    };

    var currentUser = getUserFromToken();
    return service;
};