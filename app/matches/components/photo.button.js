/* @ngInject */
module.exports = function (loginservice,messagesservice,useractions, $rootScope) {
    return {
        restrict: 'E',
        templateUrl:'./app/matches/components/photo.button.html',
        controllerAs:'$ctrl',
        scope:{
           user:"="
         },
        
        controller: [
            '$scope',
            '$element',
            '$attrs',
            function ($scope, $element, $attrs) {
                var controller=this;
                controller.config=$scope.user.photo_btn;
                controller.requestPhotom=function(){
                   var pic = loginservice.getProfilePic();
                   
                    if(pic.profile && pic.profile.photo_vr){

                        var reqPhoto= {
                            user_id: $rootScope.login_user_id,
                            request_user_id: $scope.user.user_id,
                            request_type: "PHOTO",
                            request_status: "UNREAD"
                    
                          };
                    
                          useractions.send_request(reqPhoto, function (result) {
                            if (result.success) {
                              messagesservice.toaster_msg('Successfully sent');
                              controller.config={
                               
                                alreadysent:true,
                                decline:false,
                                send_request:false
                              };
                    
                            }
                    
                    
                          }, function (error) { });
                        messagesservice.toaster_msg('Successfully sent'); 
                    }
                    else{
                        messagesservice.toaster_msg_error('Please upload your profile photo or check admin approval');
                    }

                };
            
            }]
        };
    };