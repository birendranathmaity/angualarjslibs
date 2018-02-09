/* @ngInject */
module.exports = function MyProfileController($location, loginservice, countryService, $rootScope) {
    var controller = this;
    controller.text = "biru";
    controller.formdata = loginservice.getFiledsData();
    console.log(controller.formdata);
    var country = $rootScope.current_user_de_all.basicinfos[0].country;
    var state = $rootScope.current_user_de_all.basicinfos[0].state;
    var city = $rootScope.current_user_de_all.basicinfos[0].city;
    var loc = {
        cn: country,
        st: state,
        ci: city
    };
    countryService.getUserLoc(loc, function (result) {
        controller.userLocation = result;
    }, function () { });

    var hindu = controller.formdata.rhindu;
    var muslim = controller.formdata.rmuslim;
    var christian = controller.formdata.rchristian;

    controller.casteData=[];
    controller.loadCaste = function (rel) {
        if (rel === "HINDU") {
            controller.casteData = hindu;
            return;
        }
        if (rel === "ISLAM") {
            controller.casteData = muslim;
            return;
        }
        if (rel === "CHR") {
            controller.casteData = christian;
            return;
        }
       
        controller.casteData = [{
           
            name: "Other",
            value: rel + "OTH"

        }];

    };
};