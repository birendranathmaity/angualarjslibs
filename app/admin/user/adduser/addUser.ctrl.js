/* @ngInject */
module.exports = function addUserController(toastr,$rootScope,$location) {
var controller=this;
controller.showRegisForm=true;
controller.showMoreInfodir=false;

 toastr.success('I don\'t need a title to live');

        //listen from gotomorinfo modal
            $rootScope.$on('comRegViaGoMoreInfoMl', listenComRegViaGoMoreInfoMl);

  function listenComRegViaGoMoreInfoMl($event, msg){
      controller.user_id=msg.user_id;

         if(msg.type==="SKIP"){
           $location.path("/viewusers");
        }
        if(msg.type==="ADDMOREINFO"){
           controller.showRegisForm=false;
           controller.showMoreInfodir=true;
        }

    
  }
};