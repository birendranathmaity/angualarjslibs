/* @ngInject */
module.exports = function editMyProfileController(useractions,$scope,messagesservice, $stateParams, matcheservice, searchService, $rootScope) {
    var controller = this;
    controller.editUserId = $rootScope.login_user_id;
    console.log($stateParams)
    controller.active=$stateParams.editType;
 
    function loadPartnerPreFields(){
        matcheservice.get_partner_pre({ user_id: $rootScope.login_user_id }, function (result) {
            
                    if (result) {
            
                        controller.fields = result.fields;
            
                    }
                    else {
                        useractions.get_default_search_config("DEFAULT_PARTNER_PRE","LOGIN_USER",function(fields){
                           
                           // controller.fields = "PARTNER_PRE_FIRST";
                           controller.fields =fields;
            
                        });
                       
            
                    }
                }, function (error) { });
    }
  
    controller.savePartnerPre = function (fields) {
        var req = {
            user_id: $rootScope.login_user_id,
            fields: fields
        };
        matcheservice.save_partner_pre(req, function (result) {

            messagesservice.toaster_msg("Successfully saved");


        }, function (error) { });
    };
    loadPartnerPreFields();
    var userProfileUpdate=$scope.$on('userProfileUpdate', function ($event, msg) {
       
        loadPartnerPreFields();
    });
    $scope.$on('$destroy', function () {
     userProfileUpdate();
        
                        });
};