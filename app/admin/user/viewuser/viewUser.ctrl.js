/* @ngInject */
module.exports = function viewUserController($viewusers) {

var controller=this;
 controller.limit = 5;
 controller.total = 0;
 controller.page = 1;
 controller.pages = 0;
 controller.maxSize = 5; 
 
 controller.pageChanged = function() {
   
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
 
  controller.loadPageData=function(req){
$viewusers.getallActiveUsers(req,function(result){
     controller.page=result.page;
      controller.pages=result.pages;
      controller.total = result.total;



controller.users=result.docs;
},function(){

});
  };
controller.loadPageData(req);
};