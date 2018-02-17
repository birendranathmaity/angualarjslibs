/* @ngInject */
module.exports = function LandingController($location) {
    var controller = this;
    controller.profile = {};
    controller.onSubmit = onSubmit;
controller.today = function() {
    controller.dt = new Date();
  };
   controller.options = {
    
   
    showWeeks: false
  };
  controller.today();
    activate();

    /**
     * Initiate Controller.
     */
    function activate() {
        controller.info = 'Patinet login Controller';
    }
  
    function onSubmit() {
      

// // controller.profile.username="biru@gmail.com";

// // controller.profile.password="123456";
// loginservice.login(controller.profile).then(function(res){
 
//   if(res.data.success){
//      sessionStorage.setItem('token', res.data.token);
//      
//   }
//   else{
//     controller.error="Invalid username or password";

//   }
  
// });

    }

};