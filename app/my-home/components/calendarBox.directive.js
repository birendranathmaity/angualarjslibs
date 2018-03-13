/* @ngInject */
module.exports = function (useractions, $rootScope,$state) {
    return {
        restrict: 'E',
        templateUrl: 'app/my-home/components/calendarBox.html',
        controllerAs: 'calendarBox',
        controller: [
            '$scope',
            '$element',
            '$attrs',
            function ($scope, $element, $attrs) {
                var controller = this;
               controller.counts={
                   liked:0,
                   viewed:0,
                   contacted:0,
                   visitor:0,
               };
               var minDate=new Date($rootScope.current_user_de_all.created_on);
                function fromDate(date,days){
                   var from = new Date(date);
                   from.setDate(from.getDate() - days);
                    return from;
                }

                var req = {
                    user_id: $rootScope.login_user_id,
                    from: minDate,
                    to: new Date()
                };
                function getCounts(reqP){
                    useractions.get_calender_requests(reqP, function (data) {
                      
                        if(data.length>0){
                            controller.counts.liked=data[0].LIKED_PROFILES;
                            controller.counts.visitor=data[0].PROFILE_VISITOR;
                            controller.counts.contacted=data[0].RECENTLY_CONTACTED;
                            controller.counts.viewed=data[0].VIEWED_PROFILE;

                        }
                        else{
                            controller.counts.liked=0;
                            controller.counts.visitor=0;
                            controller.counts.contacted=0;
                            controller.counts.viewed=0;

                        }
                       
    
                    }, function (err) { });
                }
               controller.today = function () {
                    controller.dt = new Date();
                };

                controller.options = {
                    startingDay: 1,
                    minDate:minDate,
                    maxDate: fromDate(new Date(),1),
                    showButtonBar: false,
                    showWeeks: false
                };
                controller.today();
                getCounts(req);
                controller.selectdate=function(date){
                    req.from=fromDate(date,1);
                    req.to=date;
                    getCounts(req);
                };
                controller.goActivity=function(type,c){
                    if(c===0){
                        return;
                    }
                    if(type==="VIEWED_PROFILE"){
                        $state.go("root.viewed_profiles",{range:{from:req.from,to:req.to}});
                    }
                    if(type==="PROFILE_VISITOR"){
                        $state.go("root.visitor_profiles",{range:{from:req.from,to:req.to}});
                    }
                    if(type==="RECENTLY_CONTACTED"){
                        $state.go("root.recently_contacted",{range:{from:req.from,to:req.to}});
                    }
                     if(type==="LIKED_PROFILES"){
                        $state.go("root.liked_profiles",{range:{from:req.from,to:req.to}});
                    }
                };

            }
        ]
    };
};
