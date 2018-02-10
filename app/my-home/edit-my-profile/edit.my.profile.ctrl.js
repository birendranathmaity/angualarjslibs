/* @ngInject */
module.exports = function editMyProfileController(messagesservice, $state, matcheservice, searchService, $rootScope) {
    var controller = this;
    controller.editUserId = $rootScope.login_user_id;
    controller.active=$state.params.editType;
    matcheservice.get_partner_pre({ user_id: $rootScope.login_user_id }, function (result) {

        if (result) {

            controller.fields = result.fields;

        }
        else {
            controller.fields = "PARTNER_PRE_FIRST";

        }
    }, function (error) { });
    controller.savePartnerPre = function (fields) {
        var req = {
            user_id: $rootScope.login_user_id,
            fields: fields
        };
        matcheservice.save_partner_pre(req, function (result) {

            messagesservice.toaster_msg("Successfully saved");


        }, function (error) { });
    };
};