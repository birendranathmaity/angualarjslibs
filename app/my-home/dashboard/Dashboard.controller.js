/* @ngInject */
module.exports = function DashboardController(cfpLoadingBar) {
 // console.log(cfpLoadingBar);
 // cfpLoadingBar.start();
    var controller = this;
    controller.profile = {};
   
    controller.today = function() {
    controller.dt = new Date();
  };
   controller.options = {
    
   
    showWeeks: false
  };
  controller.today();
    activate();

    /**
     * Initiate Controller.
     */
    function activate() {
      
    }
  
 controller.tabs1=[
                       {
                          name:"Wish List",
                          count:130,
                          active:true,
                           users:[]
                        },
                         {
                          name:"Profile Visitors",
                          count:301,
                          active:false,
                           users:[]
                        },
                         {
                          name:"Viewed My Profiles ",
                          count:320,
                          active:false,
                           users:[]
                        },
                         {
                          name:"Recently Viewed",
                          count:30,
                          active:false,
                           users:[]
                        }

];
      
controller.tabs2=[
                       {
                          name:"Preferred Location",
                          count:130,
                          active:true,
                           users:[]
                        },
                         {
                          name:"Preferred Education",
                          count:301,
                          active:false,
                           users:[]
                        },
                         {
                          name:"Preferred Occupation",
                          count:320,
                          active:false,
                           users:[]
                        }

];


};