/* @ngInject */
module.exports = function previewprofileController($crypto, countryService, $state, useractions, searchService, $location, $scope, $timeout, $rootScope, loginservice, messagesservice) {
    var controller = this;
    controller.user_action = $rootScope.user_action;
    var id = $crypto.decrypt($state.params.id);
    if (!id) {
       $state.go("root.404");
       return;
    }
    function loadCoun(array) {
        countryService.getCountries(function (res) {

            var arr = [];
            for (var i = 0; i < array.length; i++) {
                var itm = array[i];

                for (var j = 0; j < res.length; j++) {

                    if (itm === res[j].id) {

                        arr.push(res[j]);
                    }
                }

            }
            var prop = "name";

            controller.countries = (!!prop ? arr.map(function (item) {
                return item[prop];
            }) : arr).join(", ");
        }, function () { });
    }
    var req = {
        user_id:id
    };
    controller.formdata = loginservice.getFiledsData();
    controller.loadCaste = function (rel) {
        controller.casteData = loginservice.getCastes(rel);

    };

    useractions.preview_profile(req, function (result) {
       if (result.length === 0) {
           $state.go("root.404");
            return;
        }
        else {
            controller.user = result[0];
            controller.user.message_btn={send_msg: true };
            controller.user.contact_btn={view_contact: true };
        }
       
        useractions.genarateAlbumPics(controller.user.userinfo.albums, function (albums) {

            controller.albums = albums;
        });

        controller.loadCaste(controller.user.religion);

      
    }, function (error) { });
};    