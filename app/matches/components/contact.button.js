/* @ngInject */
module.exports = function (messagesservice,useractions,$rootScope) {
    return {
        restrict: 'E',
        templateUrl:'./app/matches/components/contact.button.html',
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
                    controller.config=$scope.user.contact_btn;
                    controller.isContacted=$scope.user.is_contacted;
                });
              
                controller.isOpen=false;
                controller.contactpop = {
                   pos:"top",
                    templateUrl:'./app/matches/components/contact.pop.html'
                   
                  };
                
               
                function callReq(request_type){
                    var reqContact= {
                        user_id: $rootScope.login_user_id,
                        request_user_id: $scope.user.user_id,
                        request_type: request_type,
                        request_status: "UNREAD"
                
                      };
                
                      useractions.send_request(reqContact, function (result) {
                        if (result.success) {
                            if(request_type==="CONTACT"){
                                messagesservice.toaster_msg('Successfully sent');
                            }
                            if(request_type==="CONTACTED"){
                                controller.isContacted="CONTACTED";
                            }

                        }
                
                
                      }, function (error) { });
                }
                controller.requestContact=function(){
                    callReq("CONTACT");
                };
             controller.viewContact=function(sendNoti){
                controller.isOpen=true;
                 if(sendNoti){
                    callReq("CONTACTED");
                 }
                

             };

            }]
        };
    };