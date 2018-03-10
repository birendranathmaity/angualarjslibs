/* @ngInject */
module.exports = function (loginservice,$crypto,$state) {
    return {
        restrict: 'E',
        scope:{
          user:"="
        },
        templateUrl:'./app/matches/components/profile-view.html',
        controllerAs:'$ctrl',
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
                   
                    controller.user=$scope.user;
                    controller.loadCaste(controller.user.religion);
                   
                });
                controller.goToFullProfile=function(id){
                   
                    $state.go("root.fullprofile",{
                        id: $crypto.encrypt(id),
                        isblock:controller.user.is_blocked_profile
                    });
                  };

               
               
                  controller.formdata = loginservice.getFiledsData();
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
                
            }
        ]
    };
};
