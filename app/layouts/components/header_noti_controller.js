/* @ngInject */
module.exports = function headerNotiController($scope, $uibModal, $rootScope, useractions, loginservice, toastr) {

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

controller.getnotifications=function(){

    var req={
        page: 1,
        limit:10,
        user_id:$rootScope.login_user_id,
        status:"UNREAD"
    }
    useractions.get_notifications(req,function(notifications){

        console.log(notifications)
        controller.notifications=notifications;

        for(var i=0 ;i<notifications.docs.length;i++){

            var date1=new Date(notifications.docs[i].date);
            var date2=new Date();
        
            var start_date = moment(date1, 'YYYY-MM-DD HH:mm:ss');
            var end_date = moment(date2, 'YYYY-MM-DD HH:mm:ss');
            var duration = moment.duration(end_date.diff(start_date));
            notifications.docs[i].date=duration.asDays();    
        }


    },function(error){


    });


}
controller.getnotifications();
controller.dateDiff=function(date){
    console.log(date)
    var date1=new Date(date);
    var date2=new Date();

    var start_date = moment(date1, 'YYYY-MM-DD HH:mm:ss');
    var end_date = moment(date2, 'YYYY-MM-DD HH:mm:ss');
    var duration = moment.duration(end_date.diff(start_date));
   return duration;
   // moment()


}
}