/* @ngInject */
module.exports = function RegistrationController( $uibModal,loginservice,ServiceUrls) {
var controller = this;
// var socket = io.connect('http://localhost:4000');
// socket.on('connect', function(data) {
//    socket.emit('join', 'Hello World from client');
// });
// socket.on('connect', function(data) {
//    socket.emit('join', 'Hello World from client');
// });
// //socket.emit("Register_Name","i am biru");
// socket.on("r_name",function(data){
//   alert(data)
// });
// socket.on("msg",function(data){
//   alert(data)
// });
// controller.soc=function(){
//   socket.connect("BIRU");
//  // socket.emit("Send_msg","HI DHOL ");
// };
    controller.openLoginModal = function (size) {
         var modalInstance = $uibModal.open({
         animation: true,
         windowClass :"login-model",
         templateUrl: 'app/registration-login/login-modal/login.html',
         controller: 'LoginController',
         controllerAs: 'ctrl',
         backdrop: 'static',
         keyboard: false,
         size: size
     
    });
  };
};