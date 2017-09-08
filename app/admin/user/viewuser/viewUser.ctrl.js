/* @ngInject */
module.exports = function viewUserController($viewusers,loginservice,$admintaskservice,toastr) {
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

    };
    controller.checkBoxSelect=function(){
        controller.userIds=[];
         angular.forEach(controller.users, function (user) {
           if( user.Selected){
                  controller.userIds.push(user.user_id);
           }
            
          
        });
       
    };
    controller.accept=function(){
controller.userIds=[];
 angular.forEach(controller.users, function (user) {
           if(user.Selected) {
controller.userIds.push(user.user_id);
           }
        });
        var req={
            user_ids:controller.userIds,
            photo_type:"PROFILE"

        };
       
$admintaskservice.acceptPhoto(req,function(res){
    if(res.success)
 toastr.success('Successfully accepted');
},function(){});
      
    };
    controller.toFeet= function (ft) {
       var inches = (ft*0.393700787*30.48).toFixed(0);
       var feet = Math.floor(inches / 12);
      inches %= 12;

      return feet + " feet " + inches + ' Inc. ';
    };
    controller.openImageUploadWindow=function(user){
loginservice.openCropPopup(user);
    };

     controller.configScollBar= {
                          autoHideScrollbar: true,
                          theme: 'rounded-dark',
                          axis: 'y', 
                          setHeight: 380,
                          scrollInertia: 0,
                           scrollButtons: {
            scrollAmount: 'auto', // scroll amount when button pressed 
            enable: true // enable scrolling buttons by default 
        },
                           advanced:{
                                   updateOnContentResize: true
                              }
    }; 
    controller.profilepic=function(pics)
    {
        
        if(pics.length>0){
            for(var key in pics){
                if(pics[key].photo_type==="PROFILE")
                return "http://"+pics[key].photo_path;
            }
        }
else{
    return "dist/assets/img/emptyphoto.png"
}

    };

    controller.photoView = {
   
    templateUrl: './app/admin/user/viewuser/photo.view.html'
   
  };
  controller.imgsrc="";
  controller.popImg=function(src){
     
      controller.imgsrc=src;
  };
};