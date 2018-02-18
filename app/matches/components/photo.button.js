/* @ngInject */
module.exports = function (loginservice,messagesservice,useractions, $rootScope,$uibModal) {
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
                $scope.$watch('user', function (newVal, oldVal) {
                    if (!newVal) {
                        return;
                    }
                    controller.config=$scope.user.photo_btn;
                    controller.is_user_by_block=$scope.user.is_user_by_block;
                    controller.is_blocked_profile=$scope.user.is_blocked_profile;
                });

                controller.unBlock=function(){
                    var reqBlock = {
                        user_id:  $rootScope.login_user_id,
                        block_user_id: $scope.user.user_id,
                        block_status:"UNBLOCK"
                
                      }
                
                
                      useractions.create_user_block(reqBlock, function (result) {
                        if (result.success) {
                          messagesservice.toaster_msg('Successfully unbloked');
                          controller.is_blocked_profile=false;
                          $rootScope.$broadcast('userUnblock');
                
                        }
                
                
                      }, function (error) { });
                };
               function alertPopup(){
                var modalInstance = $uibModal.open({
                    animation: true,
                    windowClass: "",
                    templateUrl: './app/popuptemplates/delete.modal.html',
                    controller: function ($scope) {
                        var main = this;
                        main.type="UNBLOCK";
                        main.yes = function () {
                            controller.unBlock();
                            modalInstance.dismiss('cancel');
                        };
                        main.no = function () {
                            modalInstance.dismiss('cancel');
                        };
        
        
                    },
                    controllerAs: '$ctrl',
                    size: "lg",
                    backdrop: 'static',
                    keyboard: false,
                    resolve: {
        
                    }
        
                });
               }
                controller.checkBlock=function(){
                   if(controller.is_blocked_profile){
                    alertPopup();
                   }
                   else{
                    controller.requestPhotom();
                   }


                };

                controller.requestPhotom=function(){
                   var pic = loginservice.getProfilePic();
                   
                    if(pic.profile && pic.profile.photo_vr){

                        var reqPhoto= {
                            user_id: $rootScope.login_user_id,
                            request_user_id: $scope.user.user_id,
                            request_type: "PHOTO",
                            request_status: (controller.is_user_by_block ==="BLOCK" ? "BLOCK" : "UNREAD")
                    
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
                var userBlockUnblock = $rootScope.$on('userBlockUnblock', function ($event, msg) {
                    if(msg.block){
                        controller.is_blocked_profile=true;
                    }
                    else{
                        controller.is_blocked_profile=false;
                    }
                            
                    
                        });
                       
                        $rootScope.$on('$destroy', function () {
                    
                            userBlockUnblock();
                          
                        });
            }]
        };
    };