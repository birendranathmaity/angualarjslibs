/**
 * Global header partial
 */
/* @ngInject */
module.exports = function HeaderController( $translate,$state, $rootScope) {
    var controller = this;
   controller.$state = $state;


   controller.subMenus=[];
    controller.headerMenu=[
{
    name:"",
    translatekey:"MYHOME",
    subMenus:[{
         translatekey:"DASHBOARD",
         route:"root.dashboard"
    },
    {
         translatekey:"MY_PROFILE",
         route:"root.myprofile"
    },
     {
         translatekey:"ADDPHOTOS",
         route:"root.addphotos"
    }
    
    ],
    route:"root.dashboard"
},
{
    name:"",
    translatekey:"MATCHES",
    subMenus:[],
    route:"MATCHES"
     
},
{
    name:"",
    translatekey:"SEARCH",
    subMenus:[],
    route:"SEARCH"
},
{
    name:"",
    translatekey:"MESSAGES",
    subMenus:[],
    route:"MESSAGES"
}
    ];
controller.adminHeaderMenus=[{
    name:"",
    translatekey:"HOME",
    subMenus:[{
         translatekey:"DASHBOARD",
         route:"root.admindashboard"
    }
    
    ],
    route:"root.admindashboard"
},
{
    name:"",
    translatekey:"USER",
    subMenus:[{
         translatekey:"VIEW_USERS",
         route:"root.viewusers"
    },
    {
         translatekey:"ADD_USER",
         route:"root.adduser"
    }
     
    
    ],
    route:"root.viewusers"
}];
   
   
    /**
     * Sets listeners for toggling properties on the header
     */
    function activate() {
        //TODO - Get permissions, login details etc
        controller.user = {
            firstName: "Biren",
            lastName: "Maity"
        };
    }
    
    var isadmin=false;
    if($rootScope.login_user.user_role==="ADMIN"){
var isadmin=true;
    }
    
controller.loadSubmenu=function(route){

    if(isadmin){
        controller.headerMenu=controller.adminHeaderMenus;
    }
    for(var i=0;i<controller.headerMenu.length;i++){

        if(controller.headerMenu[i].route===route){
             controller.subMenus=controller.headerMenu[i].subMenus;
            
        }
        else{
for(var j=0;j<controller.headerMenu[i].subMenus.length;j++){
if(controller.headerMenu[i].subMenus[j].route===route){
  
controller.subMenus=controller.headerMenu[i].subMenus;
}


}

        }

    }

};
controller.loadSubmenu(controller.$state.current.name);
 var updatesubmenu= $rootScope.$on("loadhedermenu",function(evnt,msg){
 //controller.$state=msg;
 controller.loadSubmenu(msg.name);
    
 });
   $rootScope.$on('$destroy', function () {
   
    updatesubmenu();
});

};
