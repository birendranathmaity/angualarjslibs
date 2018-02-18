/* @ngInject */
module.exports = function fullprofileController($crypto,countryService, $state, useractions, searchService, $location, useractions, $scope, $timeout, $rootScope, loginservice, messagesservice) {
    var controller = this;

    var id = $crypto.decrypt($state.params.id);
  if(!id){
    $state.go("root.404");
    return;  
  }
    function loadCoun(array) {
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

            controller.countries = (!!prop ? arr.map(function (item) {
                return item[prop];
            }) : arr).join(", ");
        }, function () { });
    }
    var req = {
        page: 1,
        limit: 1,
        gender: $rootScope.login_user_gender,
        search_user_id: id,
        fields: {

            user_id: $rootScope.login_user_id,
            blockprofile:($state.params.isblock==="BLOCK" ? true : false)
        }
    };
    controller.formdata = loginservice.getFiledsData();
    var pic = loginservice.getProfilePic();

    controller.loginuser = {
        pic: {
            displaypic: pic.profile
        }
    };
 
    var hindu = controller.formdata.rhindu;
    var muslim = controller.formdata.rmuslim;
    var christian = controller.formdata.rchristian;

    controller.casteData = [];
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
    controller.LoginUser = $rootScope.current_user_de_all;
  controller.matchCount=0;
    controller.getMatchCount = function (value, field) {
        if (!value) {
            return false;
        }
        if (field === "age") {


            if (value.from < controller.LoginUser.age && value.to > controller.LoginUser.age) {
                controller.matchCount++;
                return true;
            }

        }
        if (field === "height") {

            if (value.from < controller.LoginUser.userintrests[0].height && value.to > controller.LoginUser.userintrests[0].height) {
                controller.matchCount++;
                return true;
            }

        }
        if (field === "maritialstatus") {

            for (var m = 0; m < value.length; m++) {

                if (value[m] === controller.LoginUser.basicinfos[0].maritialstatus) {
                    controller.matchCount++;
                    return true;

                }

            }

        }
        if (field === "mothertounge") {

            for (var m = 0; m < value.length; m++) {

                if (value[m] === controller.LoginUser.basicinfos[0].mothertounge) {
                    controller.matchCount++;
                    return true;

                }

            }

        } if (field === "religion") {

            for (var m = 0; m < value.length; m++) {

                if (value[m] === controller.LoginUser.basicinfos[0].religion) {
                    controller.matchCount++;
                    return true;

                }

            }

        }
        if (field === "caste") {

            for (var m = 0; m < value.length; m++) {

                if (value[m].value === controller.LoginUser.basicinfos[0].caste) {
                    controller.matchCount++;
                    return true;

                }

            }

        }
        if (field === "country") {

            for (var m = 0; m < value.length; m++) {

                if (value[m] === controller.LoginUser.basicinfos[0].country) {
                    controller.matchCount++;
                    return true;

                }

            }

        }
        if (field === "state") {

            for (var m = 0; m < value.length; m++) {

                if (value[m].id === controller.LoginUser.basicinfos[0].state) {
                    controller.matchCount++;
                    return true;

                }

            }

        }
        if (field === "city") {

            for (var m = 0; m < value.length; m++) {

                if (value[m].id === controller.LoginUser.basicinfos[0].city) {
                    controller.matchCount++;
                    return true;

                }

            }

        } if (field === "physical_status") {

            for (var m = 0; m < value.length; m++) {

                if (value[m] === controller.LoginUser.userintrests[0].physical_status) {
                    controller.matchCount++;
                    return true;

                }

            }

        }
        if (field === "physical_status") {

            for (var m = 0; m < value.length; m++) {

                if (value[m] === controller.LoginUser.userintrests[0].physical_status) {
                    controller.matchCount++;
                    return true;

                }

            }

        }
        if (field === "high_edu") {

            for (var m = 0; m < value.length; m++) {

                if (value[m] === controller.LoginUser.usereducations[0].high_edu) {
                    controller.matchCount++;
                    return true;

                }

            }

        }
        if (field === "occupation") {

            for (var m = 0; m < value.length; m++) {

                if (value[m] === controller.LoginUser.usereducations[0].occupation) {
                    controller.matchCount++;
                    return true;

                }

            }

        }
        return false;
    };
    controller.getCalss = function (value, field) {
        if (!value) {
            return false;
        }
        if (field === "age") {


            if (value.from < controller.LoginUser.age && value.to > controller.LoginUser.age) {
                return true;
            }

        }
        if (field === "height") {

            if (value.from < controller.LoginUser.userintrests[0].height && value.to > controller.LoginUser.userintrests[0].height) {
                return true;
            }

        }
        if (field === "maritialstatus") {

            for (var m = 0; m < value.length; m++) {

                if (value[m] === controller.LoginUser.basicinfos[0].maritialstatus) {
                    return true;

                }

            }

        }
        if (field === "mothertounge") {

            for (var m = 0; m < value.length; m++) {

                if (value[m] === controller.LoginUser.basicinfos[0].mothertounge) {
                    return true;

                }

            }

        } if (field === "religion") {

            for (var m = 0; m < value.length; m++) {

                if (value[m] === controller.LoginUser.basicinfos[0].religion) {
                    return true;

                }

            }

        }
        if (field === "caste") {

            for (var m = 0; m < value.length; m++) {

                if (value[m].value === controller.LoginUser.basicinfos[0].caste) {
                    return true;

                }

            }

        }
        if (field === "country") {

            for (var m = 0; m < value.length; m++) {

                if (value[m] === controller.LoginUser.basicinfos[0].country) {
                    return true;

                }

            }

        }
        if (field === "state") {

            for (var m = 0; m < value.length; m++) {

                if (value[m].id === controller.LoginUser.basicinfos[0].state) {
                    return true;

                }

            }

        }
        if (field === "city") {

            for (var m = 0; m < value.length; m++) {

                if (value[m].id === controller.LoginUser.basicinfos[0].city) {
                    return true;

                }

            }

        } if (field === "physical_status") {

            for (var m = 0; m < value.length; m++) {

                if (value[m] === controller.LoginUser.userintrests[0].physical_status) {
                    return true;

                }

            }

        }
        if (field === "physical_status") {

            for (var m = 0; m < value.length; m++) {

                if (value[m] === controller.LoginUser.userintrests[0].physical_status) {
                    return true;

                }

            }

        }
        if (field === "high_edu") {

            for (var m = 0; m < value.length; m++) {

                if (value[m] === controller.LoginUser.usereducations[0].high_edu) {
                    return true;

                }

            }

        }
        if (field === "occupation") {

            for (var m = 0; m < value.length; m++) {

                if (value[m] === controller.LoginUser.usereducations[0].occupation) {
                    return true;

                }

            }

        }
        return false;
    };
    searchService.getSearchResult(req, function (result) {
        if(result.users.length===0){

            $state.go("root.404");
            return;
        }
        else{
            controller.user = result.users[0];
           
            var reqViewed= {
                user_id: $rootScope.login_user_id,
                request_user_id: controller.user.user_id,
                request_type: "VIEWED_PROFILE",
                request_status: (controller.user.is_user_by_block ==="BLOCK" ? "BLOCK" : "UNREAD")
        
              };
        if(!controller.user.is_viewed_profile){
            useractions.send_request(reqViewed, function (result) {}, function (error) { }); 
        }
              
        }
       
       useractions.genarateAlbumPics(controller.user.userinfo.albums,function(albums){

        controller.albums=albums;
        });
        
        controller.loadCaste(controller.user.religion);

        if (controller.user.userinfo.partner_pre) {
            controller.fieldPartnerPre = controller.user.userinfo.partner_pre.fields;
            loadCoun(controller.fieldPartnerPre.country);
            for(var key in  controller.fieldPartnerPre){
               
                controller.getMatchCount(controller.fieldPartnerPre[key],key);
            }
        }
        else {
           
            useractions.get_default_search_config("DEFAULT_PARTNER_PRE", controller.user, function (fields) {
              
                controller.fieldPartnerPre = fields;
                loadCoun(controller.fieldPartnerPre.country);
                for(var key in  controller.fieldPartnerPre){
                    controller.getMatchCount(controller.fieldPartnerPre[key],key);
                }
            });
        }
       
       

    }, function (error) { });
};    