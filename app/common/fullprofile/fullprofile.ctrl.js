/* @ngInject */
module.exports = function fullprofileController($state,searchService,$location,useractions,$scope,$timeout,$rootScope,loginservice,messagesservice) {
var controller=this;
//console.log($state)
var req = {
    page: 1,
    limit: 1,
    gender: $rootScope.login_user_gender,
    search_user_id:$state.params.id,
    fields: {

        user_id:$rootScope.login_user_id
    }
};
controller.formdata = loginservice.getFiledsData();
var pic = loginservice.getProfilePic();
console.log(pic)
controller.loginuser={
    pic:{
        displaypic:pic.profile
    }
};
console.log(controller.formdata)
var hindu = controller.formdata.rhindu;
  var muslim = controller.formdata.rmuslim;
  var christian = controller.formdata.rchristian;

  controller.casteData=[];
  controller.loadCaste = function (rel) {
      console.log(rel)
      if (rel === "HINDU") {
          controller.casteData = hindu;
          return;
      }
      if (rel === "ISLAM") {
          controller.casteData = muslim;
          return;
      }
      if (rel === "CHR") {
          controller.casteData = christian;
          return;
      }
     
      controller.casteData = [{
         
          name: "Other",
          value: rel + "OTH"

      }];

  };
searchService.getSearchResult(req, function (result) {
    controller.user=result.users[0];
    controller.loadCaste(controller.user.religion)
    
               console.log(result);
            }, function (error) { });
};    