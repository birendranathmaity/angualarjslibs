/* @ngInject */
module.exports = function loginCtrl($uibModal,socket,$rootScope,loginservice,$location,$filter) {
  
      var controller = this;
          controller.invaliduser=false;
     
       controller.required = function (key) {
                      return $filter('translate')(key);
                  };
  controller.forgetPwdModal = function (size) {
           var modalInstance = $uibModal.open({
           animation: true,
           windowClass :"login-model",
           templateUrl: './app/registration-login/forget-password/forget-password.html',
           controller: 'ForgetPasswordController',
           controllerAs: 'ctrl',
           size: size
       
      });
    };
   controller.signin = function(formData) {
        controller.invaliduser=false;
              loginservice.signin(formData, function(res) {
                
                 if(res.success){
                    
                   
                    loginservice.saveToken(res.token);
                    socket.connect($rootScope.login_user_id);
                   
                 }
                 else{
                     controller.invaliduser=true;
                 }
                
              }, function() {
                
              });
          };
  
        
  
          // controller.me = function() {
          //     loginservice.me(function(res) {
          //       console.log(res)
          //     }, function() {
               
          //     })
          // };
  
         controller.logout = function() {
              loginservice.logout(function() {
                  $location.path('/login');
              }, function() {
                  
              });
          };
  };