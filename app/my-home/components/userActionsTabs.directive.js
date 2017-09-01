/* @ngInject */
module.exports = function () {
    return {
        restrict: 'E',
        templateUrl:'./app/my-home/components/userActionsTabs.html',
        controllerAs:'userActionsTabs',
        scope:{
            tabs:'='
        },
        controller: [
            '$scope',
            '$element',
            '$attrs',
            function ($scope, $element, $attrs) {
                var controller=this;
               
               controller.tabs=$scope.tabs;
controller.loadTab=function(index){
    
                   for(var i=0;i<controller.tabs.length;i++){
                       if(i===index){
                          controller.tabs[index].active=true; 
                       }
                     else{
                           controller.tabs[i].active=false;  
                      }
                   }

               };
            }
        ]
    };
};
