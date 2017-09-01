/* @ngInject */
module.exports = function (loginservice, $location) {
    return {
        restrict: 'E',
        templateUrl:'./app/layouts/components/header-notifications-msg.html',
        controllerAs:'hdnm',
        controller: [
            '$scope',
            '$element',
            '$attrs',
            function ($scope, $element, $attrs) {
                var controller=this;
               
    controller.notifn = {
               notiUrl: './app/layouts/components/noti.html',
               msgUrl:"./app/layouts/components/msg.html",
               proUrl:'./app/layouts/components/profileDropDown.html',
               position:'bottom',
               proPos:'bottom'
  };
  controller.profileSettingsData=[{
      name:"",
      translateKey:"MY_PROFILE",
      route:"",
      icon:"glyphicon glyphicon-user"
  },
  {
      name:"",
      translateKey:"ADD_PHOTO",
      route:"",
      icon:"glyphicon glyphicon-picture"
  },
  {
      name:"",
      translateKey:"ACCOUNT_SETTINGS",
      route:"",
      icon:"glyphicon glyphicon-cog"
  },
  {
      name:"",
      translateKey:"CHANGE_PASSWORD",
      route:"",
      icon:"glyphicon glyphicon-lock"
  },
  {
      name:"",
      translateKey:"WHO_CAN_VIEW_MY_PROFILE",
      route:"",
      icon:"glyphicon glyphicon-eye-open"
  },
  {
      name:"",
      translateKey:"COMPLETE_YOUR_PROFILE",
      route:"",
      icon:"glyphicon glyphicon-star"
  },
  {
      name:"",
      translateKey:"LOG_OUT",
      route:"",
     
      icon:"glyphicon glyphicon-log-out"
  }
  
  ];
 controller.logout = function() {
            loginservice.logout(function(res) {

                if(res.success){
                      $location.path('/');
                }
               
            }, function() {
                
            });
        };
           controller.configScollBar= {
                          autoHideScrollbar: true,
                          theme: 'rounded-dark',
                          axis: 'y', 
                          setHeight: 230,
                          scrollInertia: 0,
                           scrollButtons: {
            scrollAmount: 'auto', // scroll amount when button pressed 
            enable: true // enable scrolling buttons by default 
        },
                           advanced:{
                                   updateOnContentResize: true
                              }
    };      
            }
        ]
    };
};
