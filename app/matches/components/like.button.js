/* @ngInject */
module.exports = function (messagesservice,useractions,$rootScope) {
    return {
        restrict: 'E',
        templateUrl:'./app/matches/components/like.button.html',
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
                controller.is_liked_profile=$scope.user.is_liked_profile;
                controller.like=function(){
                    var reqLike= {
                        user_id: $rootScope.login_user_id,
                        request_user_id: $scope.user.user_id,
                        request_type: "LIKED",
                        request_status: "UNREAD"
                
                      };
                
                      useractions.send_request(reqLike, function (result) {
                        if (result.success) {
                          messagesservice.toaster_msg('Successfully Liked');
                          controller.is_liked_profile="LIKED";
                
                        }
                
                
                      }, function (error) { });
                };
               

            }]
        };
    };