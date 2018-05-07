/* @ngInject */
module.exports = function WhoCanViewProfileController($location, useractions, $scope, $timeout, $rootScope, loginservice, messagesservice) {
    
        var controller = this;
        function loadWhoCanViewProfileFields() {
            console.log('k')
            useractions.getWhoCanViewProfile({ user_id: $rootScope.login_user_id }, function (result) {
    
                if (result) {
    
                    controller.fields = result.fields;
    
                }
                else {
                    useractions.get_default_search_config("DEFAULT_PARTNER_PRE", "LOGIN_USER", function (fields) {
                        console.log(fields)
                        // controller.fields = "PARTNER_PRE_FIRST";
                        controller.fields = fields;
    
                    });
    
    
                }
            }, function (error) { });
        }
    
        controller.saveWhoCanViewProfile = function (fields) {
            var req = {
                user_id: $rootScope.login_user_id,
                fields: fields
            };
            useractions.saveWhoCanViewProfile(req, function (result) {
    
                messagesservice.toaster_msg("SUCCESSFULLY_SAVED");
    
    
            }, function (error) { });
        };
        loadWhoCanViewProfileFields();
    
    };