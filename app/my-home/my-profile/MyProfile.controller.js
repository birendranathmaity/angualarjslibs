/* @ngInject */
module.exports = function MyProfileController(useractions,$location,$scope, matcheservice, $timeout,loginservice, countryService, $rootScope) {
    var controller = this;
   controller.formdata = loginservice.getFiledsData();
  function loadCoun(array){
        countryService.getCountries(function (res) {
            
            var arr = [];
            for (var i = 0; i < array.length; i++) {
                var itm = array[i];
    
                for (var j = 0; j < res.length; j++) {
    
                    if (itm === res[j].id) {
    
                        arr.push(res[j]);
                    }
                }
    
            }
            var prop = "name";
    
            controller.countries= (!!prop ? arr.map(function (item) {
                return item[prop];
            }) : arr).join(", ");
        }, function () { });
    }
 
    var country = $rootScope.current_user_de_all.basicinfos[0].country;
    var state = $rootScope.current_user_de_all.basicinfos[0].state;
    var city = $rootScope.current_user_de_all.basicinfos[0].city;
    var loc = {
        cn: country,
        st: state,
        ci: city
    };
    countryService.getUserLoc(loc, function (result) {
        controller.userLocation = result;
    }, function () { });

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
    matcheservice.get_partner_pre({ user_id: $rootScope.login_user_id }, function (result) {
        
                if (result) {
       
                    controller.fieldPartnerPre = result.fields;
                    loadCoun(controller.fieldPartnerPre.country);
        
                }
                else{
                   
    useractions.get_default_search_config("DEFAULT_PARTNER_PRE","LOGIN_USER",function(fields){
       
        controller.fieldPartnerPre = fields;
        loadCoun(controller.fieldPartnerPre.country);
            });
                   
                }
            }, function (error) { });

};