/* @ngInject */
module.exports = function () {
    return {
        restrict: 'E',
        templateUrl:'./app/common/user-img.html',
        controllerAs:'$ctrl',
        scope:{
            isNoti:"@",
            user:"="

        },
        
        controller: [
            '$scope',
            '$element',
            '$attrs',
            function ($scope, $element, $attrs) {
                var controller=this;
                controller.user=$scope.user;
                controller.isNoti=$scope.isNoti;

                if(controller.isNoti==="BIGPHOTO"){
                    controller.pic=controller.user.photo;
                    
                }else{
                    controller.pic=controller.user.pic;
                }
               
             


            }]
        }
    }