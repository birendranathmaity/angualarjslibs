/* @ngInject */
module.exports = function ($uibModal,messagesservice,useractions,$rootScope) {
    return {
        restrict: 'E',
        templateUrl:'app/matches/components/block.button.html',
        controllerAs:'$ctrl',
        scope:{
           user:"=",
           

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
                    controller.is_blocked_profile=$scope.user.is_blocked_profile;
                });
               
                controller.Block=function(){

                    var modalInstance = $uibModal.open({
                        animation: true,
                        windowClass: "",
                        templateUrl: 'app/popuptemplates/delete.modal.html',
                        controller: function ($scope) {
                            var main = this;
                            main.type="BLOCK";
                            main.yes = function () {
                                finalcall();
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

function finalcall(){
    var reqBlock = {
        user_id:  $rootScope.login_user_id,
        block_user_id: $scope.user.user_id,
        block_status:"BLOCK"
       

      };


      useractions.create_user_block(reqBlock, function (result) {
        if (result.success) {
          messagesservice.toaster_msg('Successfully bloked');
          $rootScope.$broadcast('userBlockUnblock',{block:true});
          controller.is_blocked_profile="BLOCK";
        }


      }, function (error) { });
}
                    
                };
                controller.unBlock=function(){
                    var reqBlock = {
                        user_id:  $rootScope.login_user_id,
                        block_user_id: $scope.user.user_id,
                        block_status:"UNBLOCK"
                
                      };
                
                
                      useractions.create_user_block(reqBlock, function (result) {
                        if (result.success) {
                          messagesservice.toaster_msg('Successfully unbloked');
                          controller.is_blocked_profile=false;
                          $rootScope.$broadcast('userBlockUnblock',{block:false});
                
                        }
                
                
                      }, function (error) { });
                };
                var userUnblock = $scope.$on('userUnblock', function ($event, msg) {
                    controller.is_blocked_profile=false;
                    $rootScope.$broadcast('userBlockUnblock',{block:false}); 
                    
                        });
                       
                        $scope.$on('$destroy', function () {
                    
                            userUnblock();
                          
                        });

            }]
        };
    };