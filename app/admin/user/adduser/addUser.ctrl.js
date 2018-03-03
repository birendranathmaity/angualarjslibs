/* @ngInject */
module.exports = function addUserController(toastr, $state,$scope,$rootScope,$location) {
var controller=this;
controller.showRegisForm=true;
controller.showMoreInfodir=false;

 //toastr.success('I don\'t need a title to live');

        //listen from gotomorinfo modal
        $scope.$on('comRegViaGoMoreInfoMl', listenComRegViaGoMoreInfoMl);

  function listenComRegViaGoMoreInfoMl($event, msg){
      controller.user_id=msg.user_id;

         if(msg.type==="SKIP"){
          $state.go("root.viewusers");
        }
        if(msg.type==="ADDMOREINFO"){
           controller.showRegisForm=false;
           controller.showMoreInfodir=true;
        }

    
  }
};