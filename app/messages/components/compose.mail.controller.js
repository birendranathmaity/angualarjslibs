/* @ngInject */
module.exports = function composeMailController(loginservice,$uibModal,$uibModalInstance,$rootScope,countryService) {
    
var controller = this;
      controller.user = $rootScope.current_user_de_all;
      
     controller.cancel = function () {
       $uibModalInstance.dismiss('cancel');
      };
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
          console.log(result)
      }, function () { });

      var pic= loginservice.getProfilePic();

      controller.photo=pic.profile;
  console.log(controller.photo)
  };