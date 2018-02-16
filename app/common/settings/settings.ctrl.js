/* @ngInject */
module.exports = function AccountSettingsController($location,useractions,$scope,$timeout,$rootScope,loginservice,messagesservice) {

var controller=this;


    
    //   var aa=$scope.$watch('$ctrl.setting', function(newVal, oldVal){
    //         console.log(newVal);
    //         // useractions.save_settings(newVal,function(res){
        
    //         //     console.log(res);
    //         // },function(error){});
        
        
    //     }, true);
    
controller.save=function(){
useractions.save_settings(controller.setting,function(res){
        
    messagesservice.toaster_msg('Successfully saved');
            },function(error){});

};
controller.setting={
    user_id:$rootScope.login_user_id,
    message:true,
    photo:true,
    contact:true,
    email:true,
    notification:true

};
useractions.get_settings({user_id:$rootScope.login_user_id},function(res){
    
          
           
           if(res.settings){
            controller.setting=res.settings;
           }
           
        },function(error){});

};