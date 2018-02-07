/* @ngInject */
module.exports = function (loginservice) {
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
                controller.formdata = loginservice.getFiledsData();
                console.log($scope.user)
                controller.user=$scope.user;
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
