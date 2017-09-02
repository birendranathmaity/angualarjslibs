/* @ngInject */

module.exports =function($http, $sessionStorage,$localStorage,ServiceUrls,$location, $uibModal,$rootScope){
      
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
                user=obj._doc;
                $rootScope.fname=user.first_name;
                $rootScope.login_user_id=user.user_id;
            }
            return user;
        }

        var currentUser = getUserFromToken();

        return {
            signup: function(data, success, error) {
                $http.post(ServiceUrls.BASEURL + ServiceUrls.SINGUP, data).success(success).error(error);
            },
            savemoreinfo: function(data, success, error) {
               
                $http.post(ServiceUrls.BASEURL + ServiceUrls.SAVEMOREINFO, data).success(success).error(error);
            },
            signin: function(data, success, error) {
                $http.post(ServiceUrls.BASEURL + ServiceUrls.SIGNIN, data).success(success).error(error);
            },
            checkemail: function(data, success, error) {
                $http.post(ServiceUrls.BASEURL + ServiceUrls.CHECKEMAILID, data).success(success).error(error);
            },
           verifyOtp: function(data, success, error) {
               var user=getUserFromToken();
                data.user_id=user.user_id;
                $http.post(ServiceUrls.BASEURL + ServiceUrls.OTPVERIFY, data).success(success).error(error);
            },
           
            afterloginRoute:function(){

                var logindata=getUserFromToken();

                var user=logindata;
               

            
                  if(!user.phone_vr){
                       this.openotpPopup();
                               return;
                  }
                   if(!user.more_info_vr){
                      $location.path('/moreinfo');
                              return;
                  }
                  if(user.user_role==="ADMIN"){
                       $location.path('/admin');
                       return;
                  }
                  if(user.user_role==="FREEUSER"){
                       $location.path('/dashboard');
                       return;
                  }
                
            },
             openCropPopup:function(user){
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
            openotpPopup:function(){
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
            openMoreInfoModal:function(user){
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
            saveToken: function(token) {
               
               $sessionStorage.token=token;
            },
            
            logout: function(success,error) {
                 var user=getUserFromToken();
                 var data={};
                 data.user_id=user.user_id;
                
                 changeUser({});
                 delete $sessionStorage.token;
                 $http.post(ServiceUrls.BASEURL + ServiceUrls.LOGOUT, data).success(success).error(error);
            }
        };
    };