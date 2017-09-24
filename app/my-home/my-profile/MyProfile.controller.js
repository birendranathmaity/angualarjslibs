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

    controller.toFeet = function (ft) {
        if (!ft) { return ""; }
        var inches = (ft * 0.393700787 * 30.48).toFixed(0);
        var feet = Math.floor(inches / 12);
        inches %= 12;

        return feet + " feet " + inches + ' Inc. ';
    };
};