/* @ngInject */
module.exports = function viewUserController($viewusers) {

var controller=this;
 controller.limit = 10;
 controller.total = 0;
 controller.page = 1;
 controller.pages = 0;
 controller.maxSize = 5; 
 controller.userIds=[];
 controller.pageChanged = function() {

      controller.selectedAll = false;
     
   controller.page=controller.page;
 var req={
       page: controller.page, 
       limit:  controller.limit
  };
   controller.loadPageData(req);
  };
 var req={
       page: controller.page, 
       limit:  controller.limit
  };
 controller.start=0;
 controller.end=0;
  controller.loadPageData=function(req){
$viewusers.getallActiveUsers(req,function(result){
    
     //controller.page=result.page;
      controller.pages=result.pages;
      controller.total = result.total;
     controller.users=result.docs;

      controller.start=(controller.page - 1) * controller.limit +1;
     controller.end=controller.start+ result.docs.length -1;

},function(){

});
  };
controller.loadPageData(req);

 controller.checkAll = function () {
    controller.userIds=[];
        if (controller.selectedAll) {
            controller.selectedAll = true;
        } else {
           controller.selectedAll = false;
        }
        angular.forEach(controller.users, function (user) {
            user.Selected = controller.selectedAll;
            if(user.Selected) {
                        controller.userIds.push(user.user_id);
              }
          
        });
 console.log(controller.userIds) 
    };
    controller.checkBoxSelect=function(){
        controller.userIds=[];
         angular.forEach(controller.users, function (user) {
           if( user.Selected){
                  controller.userIds.push(user.user_id);
           }
            
          
        });
        console.log(controller.userIds)
    };
    controller.accept=function(){
controller.userIds=[];
 angular.forEach(controller.users, function (user) {
           if(user.Selected) {
controller.userIds.push(user.user_id);
           }
        });
        var req={
            user_ids:controller.userIds

        };
     console.log(controller.userIds)     
$viewusers.accept(req,function(res){


console.log(res)
},function(){});
      
    };
    controller.toFeet= function (ft) {
       var inches = (ft*0.393700787*30.48).toFixed(0);
       var feet = Math.floor(inches / 12);
      inches %= 12;

      return feet + " feet " + inches + ' Inc. ';
    }
};