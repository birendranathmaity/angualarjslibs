/* @ngInject */
module.exports = function PreMatchesController($location,$scope,$timeout,$rootScope,loginservice,matcheservice) {
    var controller = this;
    controller.limit = 10;
    controller.total = 0;
    controller.page = 1;
    controller.pages = 0;
    controller.maxSize = 5;
    controller.userIds = [];
    controller.start = 0;
    controller.end = 0;
    var req = {
        page: controller.page,
        limit: controller.limit,
        condition:{
            age: [20, 50],
            height: 5.1,
            gender: "FEMALE",
            mother_tounge: ["BN"],
            religion: ["Hinduism"]


        }
    };
    
    controller.pageChanged = function () {
        
                controller.selectedAll = false;
        
                controller.page = controller.page;
        
                req.page = controller.page;
                controller.loadViewType();
        
            };

            controller.loadViewType = function () {
               
                matcheservice.get_pre_matches(req,function(response){
                    setUserData(response);
                
                },function(eror){});
               
        
            };

            
    function setUserData(result) {
        controller.users = [];
        controller.pages = result.pages;
        controller.total = result.total;
        controller.users = result.users;

        controller.start = (controller.page - 1) * controller.limit + 1;
        controller.end = controller.start + result.users.length - 1;
    }

    controller.loadViewType();


}