/* @ngInject */
module.exports = function serachByController($scope, $state,$rootScope, countryService, loginservice, searchService) {
    var controller = this;
    controller.user = $rootScope.current_user_de_all;
    
    controller.serachModel = {
        user_id: $rootScope.login_user_id,
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
        complexion: [],
        occupation: [],
        aincome: [],
        expectation: [],
        high_edu: [],
        body_type: [],
        horoscope: [],
        showprofile: ["ANY_1"],
        created_by: ["ANY_2"],
        dontshow: ["ANY_3"]
    };
    controller.showProfile = [
        {
            id: "0",
            value: "ANY_1",
            name: "Doesn't matter"

        },
        {

            value: "WITHPHOTO",
            name: "With Photo"
        },
        {

            value: "ONLINE",
            name: "Online Right Now"
        },
        {

            value: "GOLDUSER",
            name: "Premium Members"
        }

    ];
    controller.PostedBy = [
        {
            id: "1",
            value: "ANY_2",
            name: "Doesn't matter"

        }
    ];
    controller.dontShow = [
        {
            id: "1",
            value: "ANY_3",
            name: "Doesn't matter"

        },
        {

            value: "VIEWED_PROFILE",
            name: "Viewed Profiles"
        },
        {

            value: "LIKED",
            name: "Liked Profiles"
        }

    ];

    function setLocation() {
        var country = $rootScope.current_user_de_all.basicinfos[0].country;
        var state = $rootScope.current_user_de_all.basicinfos[0].state;
        var city = $rootScope.current_user_de_all.basicinfos[0].city;
        var loc = {
            cn: country,
            st: state,
            ci: city
        };
        controller.serachModel.country = [country];
        countryService.getUserLoc(loc, function (result) {

            var coun = {
                id: result.id,
                name: result.name,
                sortname: result.sortname
            };
            loadST(coun);
            controller.serachModel.state = [{
                id: result.state.id,
                name: result.state.name,
                country_id: result.id,
                cname: result.name
            }];
            var st = {
                id: result.state.id,
                name: result.state.name,
                country_id: result.id

            };
            loadCT(st);
            controller.serachModel.city = [{
                id: result.city.id,
                name: result.city.name,
                country_id: result.id,
                state_id: result.state.id,
                sname: result.state.name
            }];
        }, function () { });
    }
    function setUserAgeHeightInformation() {
        //age and height//
        var age = controller.user.age;
        var height = controller.user.userintrests[0].height;
        if (controller.user.gender === "MALE") {
            controller.serachModel.age.from = 18;
            controller.serachModel.age.to = age;
            controller.serachModel.height.from = 4;
            controller.serachModel.height.to = height;


        }
        if (controller.user.gender === "FEMALE") {
            controller.serachModel.age.from = age;
            controller.serachModel.age.to = 60;
            controller.serachModel.height.from = height;
            controller.serachModel.height.to = 6.11;


        }
    }
    function setUserBasciInfo() {
        var basic = controller.user.basicinfos[0];

        controller.serachModel.maritialstatus = [basic.maritialstatus];
        controller.serachModel.mothertounge = [basic.mothertounge];
        controller.serachModel.religion = [basic.religion];
        setRelegionAndCaste(basic.religion, basic.caste, true);


    }
    function setRelegionAndCaste(rel, caste, type) {
        angular.forEach(controller.formdata.religions, function (item, value) {

            if (item.value === rel) {

                controller.loadCaste(item);
                if (type) {
                    setCasteValue(caste, item);
                }

            }

        });
    }
    function setCasteValue(caste, rel) {

        if (rel.value === "HINDU") {
            angular.forEach(controller.formdata.rhindu, function (item, value) {
                if (item.value === caste) {

                    controller.serachModel.caste = [{
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
            angular.forEach(controller.formdata.rmuslim, function (item, value) {
                if (item.value === caste) {

                    controller.serachModel.caste = [{
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
            angular.forEach(controller.formdata.rchristian, function (item, value) {
                if (item.value === caste) {

                    controller.serachModel.caste = [{
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
            controller.serachModel.caste = [{
                rname: rel.name,
                religion: rel.value,
                name: "Other",
                value: caste

            }];

        }


    }
    function setOtherInfo() {
        var edu = controller.user.usereducations[0];
        var interest = controller.user.userintrests[0];
        var family = controller.user.userfamilies[0];
        //education//
        controller.serachModel.high_edu = [edu.high_edu];
        controller.serachModel.occupation = [edu.occupation];
        // interest//

        controller.serachModel.complexion = interest.complexion ? [interest.complexion] : ["ANY"];
        controller.serachModel.physical_status = [interest.physical_status];
        controller.serachModel.body_type = interest.body_type ? [interest.body_type] : ["ANY"];
        controller.serachModel.expectation = interest.expectation ? [interest.expectation] : ["ANY"];
        //family//
        controller.serachModel.horoscope = family.horoscope ? [family.horoscope] : ["ANY"];
        controller.serachModel.aincome = family.aincome ? [family.aincome] : ["ANY"];

    }

    controller.check = function (item1, data, any) {

        if (item1.value === any && item1.selected) {
            angular.forEach(data, function (item) {

                if (item.value != any) {
                    item.selected = false;

                }

            });
        }

        else {
            angular.forEach(data, function (item) {

                if (item.value === any) {
                    item.selected = false;

                }

            });
        }

        if (any === "ANY_1") {
            controller.serachModel.showprofile = [];
            angular.forEach(data, function (item, value) {

                if (item.selected) {
                    controller.serachModel.showprofile.push(item.value);

                }

            });

        }

        if (any === "ANY_2") {
            controller.serachModel.created_by = [];
            angular.forEach(data, function (item, value) {

                if (item.selected) {
                    controller.serachModel.created_by.push(item.value);

                }

            });

        }
        if (any === "ANY_3") {
            controller.serachModel.dontshow = [];
            angular.forEach(data, function (item, value) {

                if (item.selected) {
                    controller.serachModel.dontshow.push(item.value);

                }

            });

        }

    };
    var empty = [{
        name: "Doesn't matter",
        value: "ANY"
    }];
    var empty2 = [{
        name: "Doesn't matter",
        id: "ANY"
    }];
    var allObj = {
        name: "Doesn't matter",
        id: "ANY"
    };
    function isInArray(value, array) {
        return array.indexOf(value) > -1;
    }
    var formdata = loginservice.getFiledsData();
    controller.formdata = angular.copy(formdata);
    controller.PostedBy=controller.PostedBy.concat(controller.formdata.created_by);
    controller.formdata.hobbies = empty.concat(controller.formdata.hobbies);
    controller.formdata.zodiac = empty.concat(controller.formdata.zodiac);
    controller.formdata.mother_tongues = empty.concat(controller.formdata.mother_tongues);
    controller.formdata.religions = empty.concat(controller.formdata.religions);
    controller.formdata.educations = empty.concat(controller.formdata.educations);
    controller.formdata.studies = empty.concat(controller.formdata.studies);
    controller.formdata.MaritialStatus = empty.concat(controller.formdata.MaritialStatus);
    controller.formdata.complexion = empty.concat(controller.formdata.complexion);
    controller.formdata.BodyType = empty.concat(controller.formdata.BodyType);
    controller.formdata.PhysicalStatus = empty.concat(controller.formdata.PhysicalStatus);
    controller.formdata.occupations = empty.concat(controller.formdata.occupations);
    controller.formdata.Expectation = empty.concat(controller.formdata.Expectation);
    controller.formdata.Horoscope = empty.concat(controller.formdata.Horoscope);
    controller.formdata.aincome = empty.concat(controller.formdata.aincome);

    controller.onSelectCallback = function (item, model, g) {

        if (model === "ANY") {
            controller.serachModel[g] = ["ANY"]
        }
        else {

            if (isInArray("ANY", controller.serachModel[g])) {
                var index = controller.serachModel[g].indexOf("ANY");
                controller.serachModel[g].splice(index, 1);
            }
        }



    };

    //location//
    controller.countrys = [];
    controller.states = [];
    controller.cities = [];
    controller.DisabledState = true;
    controller.DisabledCity = true;
    function loadCountries(){
        countryService.getCountries(function (res) {
            controller.countrys = empty2.concat(res);
            controller.states = empty2.concat([]);
            controller.cities = empty2.concat([]);
        }, function () { });
    }
    
    controller.onSelectCallbackCounry = function (item, model, g) {

        if (model === "ANY") {
            controller.serachModel[g] = ["ANY"];
            controller.serachModel.state = [allObj];
            controller.serachModel.city = [allObj];
            controller.DisabledState = true;
            controller.DisabledCity = true;
        }
        else {

            if (isInArray("ANY", controller.serachModel[g])) {
                var index = controller.serachModel[g].indexOf("ANY");
                controller.serachModel[g].splice(index, 1);

            }


            loadST(item);
        }
    };
    controller.removedCountry = function (item, model, g) {
        if (g === "country") {
            removeState(item);
        }
        if (g === "state") {
            removeCity(item);
        }

    };
    function removeState(item) {
        controller.states = $.grep(controller.states, function (e) {
            return e.country_id != item.id;
        });
        controller.serachModel.state = $.grep(controller.serachModel.state, function (e) {
            return e.country_id != item.id;
        });
        controller.cities = $.grep(controller.cities, function (e) {
            return e.country_id != item.id;
        });
        controller.serachModel.city = $.grep(controller.serachModel.city, function (e) {
            return e.country_id != item.id;
        });
        if (controller.serachModel.country.length === 0) {
            controller.DisabledState = true;
            controller.DisabledCity = true;
            controller.serachModel.state = [];
            controller.serachModel.city = [];
        }
    }
    function removeCity(item) {
        controller.cities = $.grep(controller.cities, function (e) {
            return e.state_id != item.id;
        });
        controller.serachModel.city = $.grep(controller.serachModel.city, function (e) {
            return e.state_id != item.id;
        });


        if (controller.serachModel.state.length === 0) {

            controller.DisabledCity = true;
            controller.serachModel.city = [];
        }
    }
    controller.onSelectCallbackState = function (item, model, g) {
        if (item.id === "ANY") {
            controller.serachModel[g] = [allObj];
            // controller.serachModel.state = ["ANY"];
            controller.serachModel.city = [allObj];
            // controller.DisabledState=true;
            controller.DisabledCity = true;


        }
        else {

            controller.serachModel.state = $.grep(controller.serachModel.state, function (e) {
                return e.id != "ANY";
            });




            loadCT(item);
        }


    };

    function loadST(target) {
        controller.DisabledState = false;
        controller.DisabledCity = true;
        if (controller.serachModel.country.length === 0) {
            controller.DisabledState = true;
            controller.serachModel.state = [];
            controller.serachModel.city = [];
            return;
        }

        if (controller.serachModel.city.length === 0) {
            controller.DisabledCity = true;
        }
        var code = target.id;
        var cname = target.name;
     
        countryService.getStates(code, function (res) {

            if (res.length > 0) {
                for (var key in res) {
                    res[key].cname = cname;

                }
            }

            controller.states = controller.states.concat(res);


        }, function () { });


    }
    function loadCT(target) {

        if (controller.serachModel.state.length === 0) {
            controller.DisabledCity = true;
            controller.serachModel.city = [];
            return;
        }
        controller.DisabledCity = false;
        var code = target.id;
        var sname = target.name;
        var country_code = target.country_id;
        countryService.getCities(code, function (res) {
            if (res.length > 0) {
                for (var key in res) {
                    res[key].sname = sname;
                    res[key].country_id = country_code;
                }
            }

            controller.cities = controller.cities.concat(res);
        }, function () { });



    }
    controller.onSelectCallbackCity = function (item, model, g) {

        if (item.id === "ANY") {
            controller.serachModel[g] = [allObj];
        }
        else {

            controller.serachModel.city = $.grep(controller.serachModel.city, function (e) {
                return e.id != "ANY";
            });


        }

    };
    //relegion caste//
    controller.casteDisabled = true;
    controller.onSelectCallbackRelgion = function (item, model, g) {

        if (model === "ANY") {
            controller.serachModel[g] = ["ANY"];
            controller.serachModel.caste = empty.concat([]);
            controller.casteDisabled = true;
        }
        else {

            if (isInArray("ANY", controller.serachModel[g])) {
                var index = controller.serachModel[g].indexOf("ANY");
                controller.serachModel[g].splice(index, 1);
            }

            controller.loadCaste(item);

        }



    };
    controller.removedRL = function (item, model, g) {

        controller.casteData = $.grep(controller.casteData, function (e) {
            return e.religion != model;
        });
        controller.serachModel.caste = $.grep(controller.serachModel.caste, function (e) {
            return e.religion != model;
        });


        if (controller.serachModel.religion.length === 0) {
            controller.casteDisabled = true;
            controller.serachModel.caste = [];
        }

    };
    var hindu = controller.formdata.rhindu;
    var muslim = controller.formdata.rmuslim;
    var christian = controller.formdata.rchristian;
    controller.casteData = empty.concat([]);
    controller.loadCaste = function (item) {

        if (controller.serachModel.religion.length === 0) {
            controller.casteDisabled = true;
            return;
        }
        controller.casteDisabled = false;
        var arr = load(item.value, item.name);
        controller.casteData = controller.casteData.concat(arr);


        function load(rel, rname) {
            var temp = [];
            if (rel === "HINDU") {

                for (var key in hindu) {
                    hindu[key].rname = rname;
                    hindu[key].religion = rel;
                }
                temp = hindu;
                return temp;
            }
            if (rel === "ISLAM") {
                for (var key in muslim) {
                    muslim[key].rname = rname;
                    muslim[key].religion = rel;
                }
                temp = muslim;
                return temp;
            }
            if (rel === "CHR") {
                for (var key in christian) {
                    christian[key].rname = rname;
                    christian[key].religion = rel;
                }
                temp = christian;
                return temp;
            }

            return [{
                rname: rname,
                religion: rel,
                name: "Other",
                value: rel + "OTH"

            }];

        }


    };
    controller.onSelectCallbackCaste = function (item, model, g) {

        if (item.value === "ANY") {

            controller.serachModel.caste = empty.concat([]);
        }
        else {

            controller.serachModel.caste = $.grep(controller.serachModel.caste, function (e) {

                return e.value != "ANY";

            });


        }

    };
    function setMore() {
        angular.forEach(controller.PostedBy, function (itm, value) {

            itm.selected = false;
        });
        angular.forEach(controller.serachModel.created_by, function (item, value) {
            angular.forEach(controller.PostedBy, function (itm, value) {

                if (itm.value === item) {
                    itm.selected = true;

                }
                else {
                    //  itm.selected=false;
                }

            });


        });
        angular.forEach(controller.showProfile, function (itm, value) {

            itm.selected = false;
        });
        angular.forEach(controller.serachModel.showprofile, function (item, value) {
            angular.forEach(controller.showProfile, function (itm, value) {

                if (itm.value === item) {
                    itm.selected = true

                } else {
                    //  itm.selected=false;
                }

            });


        });
        angular.forEach(controller.dontShow, function (itm, value) {

            itm.selected = false;
        });
        angular.forEach(controller.serachModel.dontshow, function (item, value) {
            angular.forEach(controller.dontShow, function (itm, value) {

                if (itm.value === item) {
                    itm.selected = true

                }
                else {
                    //  itm.selected=false;
                }
            });


        });
    }
   
    function loadlocationAndCaste() {
       for(var kj=0;kj<controller.serachModel.religion.length;kj++) {
           var itm=controller.serachModel.religion[kj];
            if(itm==="ANY"){
               
                controller.casteDisabled = true;
            }
else{
    setRelegionAndCaste(itm, "", false);
}
           

        }
        countryService.getCountries(function (res) {
            controller.countrys = empty2.concat(res);
            controller.states = empty2.concat([]);
            controller.cities = empty2.concat([]);
            controller.DisabledState = false;
            function getStateForCountry(cid){
            for(var j=0;j<res.length;j++) {
                var item=res[j];

              if (item.id === cid) {
                  var coun = {
                      id: item.id,
                      name: item.name,
                      sortname: item.sortname
                  };
                 
                  loadST(coun);
                 
              }

          }
        }
          for(var i=0;i<controller.serachModel.country.length;i++) {
            var cn=controller.serachModel.country[i];
            if(cn==="ANY"){
            
                controller.DisabledState = true;
                controller.DisabledCity = true;
             
            }

               else{
                getStateForCountry(cn);
        }
        }
        }, function () { });
       
       
       for(var k=0;k<controller.serachModel.state.length;k++) {
           var state=controller.serachModel.state[k];
            if(state.id==="ANY"){
                
                    controller.DisabledState = true;
                    controller.DisabledCity = true;
                  
                }else{
                    loadCT(state);
                }
           

        }


    }
   
    controller.search = function () {
        
    
        searchService.saveSearch(controller.serachModel,function(result){
          //  $scope.getFields({fields:controller.serachModel});
          if($state.current.name!=="root.search_result"){
            $state.go('root.search_result', {fields:controller.serachModel});
          }else{
            $scope.getFields({fields:controller.serachModel});
          }
           
        },function(error){});

    }

    controller.reset = function () {
        controller.serachModel = {
            user_id: $rootScope.login_user_id,
            age: {

                from: 18,
                to: 60
            },
            height: {

                from: 4,
                to: 6.11
            },
            maritialstatus: ["ANY"],
            mothertounge: ["ANY"],
            religion: ["ANY"],
            caste: empty,
            country: ["ANY"],
            state: empty2,
            city: empty2,
            physical_status: ["ANY"],
            complexion: ["ANY"],
            occupation: ["ANY"],
            aincome: ["ANY"],
            expectation: ["ANY"],
            high_edu: ["ANY"],
            body_type: ["ANY"],
            horoscope: ["ANY"],
            showprofile: ["ANY_1"],
            created_by: ["ANY_2"],
            dontshow: ["ANY_3"]
        };
        setMore();
        controller.DisabledState = true;
        controller.DisabledCity = true;
        controller.casteDisabled = true;
    };

    $scope.$watch('fields', function (n, v) {
        
        if (!n) { return; }
        if(n==="FIRST"){
            loadCountries();
            setUserAgeHeightInformation();
            setUserBasciInfo();
            setOtherInfo();
            setLocation();
            setMore();

        }else{
            
            controller.serachModel = n;
            setMore();
            loadlocationAndCaste();

        }
               
            });
    // searchService.getSearch({ user_id: $rootScope.login_user_id }, function (result) {

    //     if (result) {

    //         controller.serachModel = result;
    //         setMore();
    //         loadlocationAndCaste();



    //     }
    //     else {
    //         loadCountries();
    //         setUserAgeHeightInformation();
    //         setUserBasciInfo();
    //         setOtherInfo();
    //         setLocation();
    //         setMore();

    //     }
    // }, function (error) { });

}