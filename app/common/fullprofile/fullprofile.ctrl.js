/* @ngInject */
module.exports = function fullprofileController($crypto, countryService, $state, useractions, searchService, $location, $scope, $timeout, $rootScope, loginservice, messagesservice) {
    var controller = this;
    controller.user_action = $rootScope.user_action;
    var id = $crypto.decrypt($state.params.id);
    if (!id) {
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
            blockprofile: ($state.params.isblock === "BLOCK" ? true : false)
        }
    };
    controller.formdata = loginservice.getFiledsData();
    var pic = loginservice.getProfilePic();

    controller.loginuser = {
        pic: {
            displaypic: pic.profile
        }
    };


    controller.loadCaste = function (rel) {
        controller.casteData = loginservice.getCastes(rel);

    };
    controller.LoginUser = $rootScope.current_user_de_all;
    controller.matchCount = 0;
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

            for (var ma = 0; ma < value.length; ma++) {

                if (value[ma] === controller.LoginUser.basicinfos[0].maritialstatus) {
                    controller.matchCount++;
                    return true;

                }

            }

        }
        if (field === "mothertounge") {

            for (var mo = 0; mo < value.length; mo++) {

                if (value[mo] === controller.LoginUser.basicinfos[0].mothertounge) {
                    controller.matchCount++;
                    return true;

                }

            }

        } if (field === "religion") {

            for (var mr = 0; mr < value.length; mr++) {

                if (value[mr] === controller.LoginUser.basicinfos[0].religion) {
                    controller.matchCount++;
                    return true;

                }

            }

        }
        if (field === "caste") {

            for (var mc = 0; mc < value.length; mc++) {

                if (value[mc].value === controller.LoginUser.basicinfos[0].caste) {
                    controller.matchCount++;
                    return true;

                }

            }

        }
        if (field === "country") {

            for (var mu = 0; mu < value.length; mu++) {

                if (value[mu] === controller.LoginUser.basicinfos[0].country) {
                    controller.matchCount++;
                    return true;

                }

            }

        }
        if (field === "state") {

            for (var ms = 0; ms < value.length; ms++) {

                if (value[ms].id === controller.LoginUser.basicinfos[0].state) {
                    controller.matchCount++;
                    return true;

                }

            }

        }
        if (field === "city") {

            for (var mt = 0; mt < value.length; mt++) {

                if (value[mt].id === controller.LoginUser.basicinfos[0].city) {
                    controller.matchCount++;
                    return true;

                }

            }

        } if (field === "physical_status") {

            for (var mp = 0; mp < value.length; mp++) {

                if (value[mp] === controller.LoginUser.userintrests[0].physical_status) {
                    controller.matchCount++;
                    return true;

                }

            }

        }
        if (field === "physical_status") {

            for (var mca = 0; mca < value.length; mca++) {

                if (value[mca] === controller.LoginUser.userintrests[0].physical_status) {
                    controller.matchCount++;
                    return true;

                }

            }

        }
        if (field === "high_edu") {

            for (var mh = 0; mh < value.length; mh++) {

                if (value[mh] === controller.LoginUser.usereducations[0].high_edu) {
                    controller.matchCount++;
                    return true;

                }

            }

        }
        if (field === "occupation") {

            for (var moc = 0; moc < value.length; moc++) {

                if (value[moc] === controller.LoginUser.usereducations[0].occupation) {
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

            for (var mar = 0; mar < value.length; mar++) {

                if (value[mar] === controller.LoginUser.basicinfos[0].maritialstatus) {
                    return true;

                }

            }

        }
        if (field === "mothertounge") {

            for (var m2 = 0; m2 < value.length; m2++) {

                if (value[m2] === controller.LoginUser.basicinfos[0].mothertounge) {
                    return true;

                }

            }

        } if (field === "religion") {

            for (var m3 = 0; m3 < value.length; m3++) {

                if (value[m3] === controller.LoginUser.basicinfos[0].religion) {
                    return true;

                }

            }

        }
        if (field === "caste") {

            for (var m4 = 0; m4 < value.length; m4++) {

                if (value[m4].value === controller.LoginUser.basicinfos[0].caste) {
                    return true;

                }

            }

        }
        if (field === "country") {

            for (var m5 = 0; m5 < value.length; m5++) {

                if (value[m5] === controller.LoginUser.basicinfos[0].country) {
                    return true;

                }

            }

        }
        if (field === "state") {

            for (var m6 = 0; m6 < value.length; m6++) {

                if (value[m6].id === controller.LoginUser.basicinfos[0].state) {
                    return true;

                }

            }

        }
        if (field === "city") {

            for (var m7 = 0; m7 < value.length; m7++) {

                if (value[m7].id === controller.LoginUser.basicinfos[0].city) {
                    return true;

                }

            }

        } if (field === "physical_status") {

            for (var m8 = 0; m8 < value.length; m8++) {

                if (value[m8] === controller.LoginUser.userintrests[0].physical_status) {
                    return true;

                }

            }

        }
        if (field === "physical_status") {

            for (var m9 = 0; m9 < value.length; m++) {

                if (value[m9] === controller.LoginUser.userintrests[0].physical_status) {
                    return true;

                }

            }

        }
        if (field === "high_edu") {

            for (var m11 = 0; m11 < value.length; m11++) {

                if (value[m11] === controller.LoginUser.usereducations[0].high_edu) {
                    return true;

                }

            }

        }
        if (field === "occupation") {

            for (var m22 = 0; m22 < value.length; m22++) {

                if (value[m22] === controller.LoginUser.usereducations[0].occupation) {
                    return true;

                }

            }

        }
        return false;
    };
    searchService.getSearchResult(req, function (result) {
        if (result.users.length === 0) {

            $state.go("root.404");
            return;
        }
        else {
            controller.user = result.users[0];

            var reqViewed = {
                user_id: $rootScope.login_user_id,
                request_user_id: controller.user.user_id,
                request_type: "VIEWED_PROFILE",
                request_status: (controller.user.is_user_by_block === "BLOCK" ? "BLOCK" : "UNREAD")

            };
            if (!controller.user.is_viewed_profile && $rootScope.user_action) {
                useractions.send_request(reqViewed, function (result) { }, function (error) { });
            }

        }

        useractions.genarateAlbumPics(controller.user.userinfo.albums, function (albums) {

            controller.albums = albums;
        });

        controller.loadCaste(controller.user.religion);

        if (controller.user.userinfo.partner_pre) {
            controller.fieldPartnerPre = controller.user.userinfo.partner_pre.fields;
            loadCoun(controller.fieldPartnerPre.country);
            for (var key in controller.fieldPartnerPre) {

                controller.getMatchCount(controller.fieldPartnerPre[key], key);
            }
        }
        else {

            useractions.get_default_search_config("DEFAULT_PARTNER_PRE", controller.user, function (fields) {
                controller.fieldPartnerPre = fields;
                loadCoun(controller.fieldPartnerPre.country);
                for (var key in controller.fieldPartnerPre) {
                    controller.getMatchCount(controller.fieldPartnerPre[key], key);
                }
            });
        }



    }, function (error) { });
};    