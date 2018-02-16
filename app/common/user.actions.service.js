/* @ngInject */
module.exports = function ($rootScope, countryService, loginservice, $http, toastr, $state, ServiceUrls) {
    var service = {

        send_request: function (data, success, error) {
            $http.post(ServiceUrls.BASEURL + ServiceUrls.SEND_REQUEST, data).success(success).error(error);
        },
        update_request: function (data, success, error) {
            $http.post(ServiceUrls.BASEURL + ServiceUrls.UPDATE_REQUEST, data).success(success).error(error);
        },
        create_user_block: function (data, success, error) {
            $http.post(ServiceUrls.BASEURL + ServiceUrls.CREATE_USER_BLOCK, data).success(success).error(error);
        },
        update_user_block: function (data, success, error) {
            $http.post(ServiceUrls.BASEURL + ServiceUrls.UPDATE_USER_BLOCK, data).success(success).error(error);
        },
        get_notifications: function (data, success, error) {
            $http.post(ServiceUrls.BASEURL + ServiceUrls.GET_NOTIFICATIONS, data).success(success).error(error);
        },
        update_notifications: function (data, success, error) {
            $http.post(ServiceUrls.BASEURL + ServiceUrls.UPDATE_NOTIFICATIONS, data).success(success).error(error);
        },
       get_contactno: function (data, success, error) {
            $http.post(ServiceUrls.BASEURL + ServiceUrls.GET_CONTACTNO, data).success(success).error(error);
        },
         save_settings: function (data, success, error) {
            $http.post(ServiceUrls.BASEURL + ServiceUrls.SAVE_SETTINGS, data).success(success).error(error);
        },
        get_settings: function (data, success, error) {
            $http.post(ServiceUrls.BASEURL + ServiceUrls.GET_SETTINGS, data).success(success).error(error);
        },
        genarateAlbumPics:function(pics,success){
            var imgs = [];
            if(pics.length===0){
                success(imgs);
                return imgs;
            }
            angular.forEach(pics, function (v, i) {

                var imgUrl = ServiceUrls.BASEURL + ServiceUrls.USER_PROFILE_PHOTO_DISPLAY_PATH + v.photo_path;
                var img = {
                    id: v._id,
                    url: imgUrl

                };
                imgs.push(img);



            });
            success(imgs);
        },
        get_default_search_config: function (target,who,calback) {
            var formdata = loginservice.getFiledsData();
            var user ={};
            var basic={};
            var edu={};
            var interest={};
            if(who==="LOGIN_USER"){
               user = $rootScope.current_user_de_all;
               basic = user.basicinfos[0];
               edu = user.usereducations[0];
               interest = user.userintrests[0];
            }
            if(who !== null && typeof who === 'object'){
                user=who;
                basic = user.userinfo.basic;
                edu = user.userinfo.education;
                interest = user.userinfo.interest;
                user.gender="FEMALE";
            }
           
            
            var serachModel = {
                user_id: user.user_id,
                age: {

                    from: 0,
                    to: 0
                },
                height: {

                    from: 0,
                    to: 0
                },
                maritialstatus: [],
                mothertounge: [],
                religion: [],
                caste: [],
                country: [],
                state: [],
                city: [],
                physical_status: [],
                occupation: [],
                complexion: ["ANY"],
                aincome: ["ANY"],
                expectation: ["ANY"],
                high_edu: ["ANY"],
                body_type: ["ANY"],
                horoscope: ["ANY"],
                showprofile: ["ANY_1"],
                created_by: ["ANY_2"],
                dontshow: ["ANY_3"]

            };

            var age = user.age;
            var height = interest.height;
            if (user.gender === "MALE") {
                serachModel.age.from = 18;
                serachModel.age.to = age;
                serachModel.height.from = 4;
                serachModel.height.to = height;


            }
            if (user.gender === "FEMALE") {
                serachModel.age.from = age;
                serachModel.age.to = 60;
                serachModel.height.from = height;
                serachModel.height.to = 6.11;


            }
            function setLocation(otherinfo, success) {
                var country = basic.country;
                var state = basic.state;
                var city = basic.city;
                var loc = {
                    cn: country,
                    st: state,
                    ci: city
                };
                serachModel.country = [country];
                countryService.getUserLoc(loc, function (result) {


                    serachModel.state = [{
                        id: result.state.id,
                        name: result.state.name,
                        country_id: result.id,
                        cname: result.name
                    }];


                    serachModel.city = [{
                        id: result.city.id,
                        name: result.city.name,
                        country_id: result.id,
                        state_id: result.state.id,
                        sname: result.state.name
                    }];
                    if (otherinfo) {
                        setUserBasciInfo();
                    }

                    success();
                }, function () { });
            }
            function setUserBasciInfo() {

                serachModel.maritialstatus = [basic.maritialstatus];
                serachModel.mothertounge = [basic.mothertounge];
                serachModel.religion = [basic.religion];
                serachModel.high_edu = [edu.high_edu];
                serachModel.occupation = [edu.occupation];
                serachModel.physical_status = [interest.physical_status];
                setRelegionAndCaste(basic.religion, basic.caste);


            }
            function setRelegionAndCaste(rel, caste, type) {
                angular.forEach(formdata.religions, function (item, value) {

                    if (item.value === rel) {

                        setCasteValue(caste, item);

                    }

                });
            }
            function setCasteValue(caste, rel) {

                if (rel.value === "HINDU") {
                    angular.forEach(formdata.rhindu, function (item, value) {
                        if (item.value === caste) {

                            serachModel.caste = [{
                                rname: rel.name,
                                religion: rel.value,
                                name: item.name,
                                value: item.value

                            }];
                            return;
                        }

                    });


                }
                if (rel.value === "ISLAM") {
                    angular.forEach(formdata.rmuslim, function (item, value) {
                        if (item.value === caste) {

                            serachModel.caste = [{
                                rname: rel.name,
                                religion: rel.value,
                                name: item.name,
                                value: item.value

                            }];
                            return;
                        }

                    });
                }
                if (rel.value === "CHR") {
                    angular.forEach(formdata.rchristian, function (item, value) {
                        if (item.value === caste) {

                            serachModel.caste = [{
                                rname: rel.name,
                                religion: rel.value,
                                name: item.name,
                                value: item.value

                            }];
                            return;
                        }

                    });
                }

                if (rel.value + "OTH" === caste) {
                    serachModel.caste = [{
                        rname: rel.name,
                        religion: rel.value,
                        name: "Other",
                        value: caste

                    }];

                }


            }
            if (target === "DEFAULT_PARTNER_PRE") {
                setLocation(true, function () {

                    calback(serachModel);


                });

            }
            if (target === "LOCATION") {
                setLocation(false, function () {
                    var location = {
                        user_id: user.user_id,
                        country: serachModel.country,
                        state: serachModel.state,
                        city: serachModel.city,
                    };
                    calback(location);


                });


            }
            if (target === "EDUCATION") {

                var EDUCATION = {
                    user_id: user.user_id,
                    high_edu: [edu.high_edu],
                };
                calback(EDUCATION);
            }
            if (target === "OCCUPATION") {

                var OCCUPATION = {
                    user_id: user.user_id,
                    occupation: [edu.occupation],
                };
                calback(OCCUPATION);
            }
            if (target === "VIEWED_PROFILE") {

                var VIEWED_PROFILE = {
                    user_id: user.user_id,
                    showprofile: ["VIEWED_PROFILE"],
                };
                calback(VIEWED_PROFILE);
            }
            if (target === "LIKED") {

                var LIKED = {
                    user_id: user.user_id,
                    showprofile: ["LIKED"],
                };
                calback(LIKED);
            }
            if (target === "VISITOR") {
                
                                var VISITOR = {
                                    user_id: user.user_id,
                                    showprofile: ["VISITOR"],
                                };
                                calback(VISITOR);
                            }
                            if (target === "BLOCKED") {
                                
                                                var BLOCKED = {
                                                    user_id: user.user_id,
                                                    blockprofile: true,
                                                };
                                                calback(BLOCKED);
                                            }
        },
        openReq: function (noti) {
            if (noti.request_type === "MESSAGE") {
                if (noti.whosent === "SENT") {
                    $state.go('root.message_request', { 'requestType': "MESSAGE", 'viewType': 'SENT' });
                }
                else if (noti.request_action) {
                    $state.go('root.message_request', { 'requestType': "MESSAGE", 'viewType': noti.request_action });
                }
                else {
                    $state.go('root.message_request', { 'requestType': "MESSAGE", 'viewType': 'RECEIVED' });
                }


            }
            if (noti.request_type === "PHOTO") {
                if (noti.whosent === "SENT") {
                    $state.go('root.photo_request', { 'requestType': "PHOTO", 'viewType': 'SENT' })
                }
                else if (noti.request_action) {
                    $state.go('root.photo_request', { 'requestType': "PHOTO", 'viewType': noti.request_action });
                }
                else {
                    $state.go('root.photo_request', { 'requestType': "PHOTO", 'viewType': 'RECEIVED' });
                }
            }
            if (noti.request_type === "CONTACT") {
                if (noti.whosent === "SENT") {
                    $state.go('root.contact_request', { 'requestType': "CONTACT", 'viewType': 'SENT' })
                }
                else if (noti.request_action) {
                    $state.go('root.contact_request', { 'requestType': "CONTACT", 'viewType': noti.request_action });
                }
                else {
                    $state.go('root.contact_request', { 'requestType': "CONTACT", 'viewType': 'RECEIVED' });
                }
            }
        },
        toaster_msg: function (msg) {
            toastr.success(msg);

        },


    }
    return service;

}

