/* @ngInject */
module.exports = function searchByController($rootScope, countryService, loginservice) {
    var controller = this;
    controller.user = $rootScope.current_user_de_all;
    console.log(controller.user);
    controller.serachModel = {
        age: {

            from:18,
            to:50
        },
        height: {

            from:4.1,
            to:6.11
        },
        maritialstatus: ["SINGLE"],
        mothertounge: ["ANY"],
        religion: [],
        caste: [],
        country: ["101"],
        state: [],
        city: [],
        physical_status: [],
        complexion: [],
        occupation: [],
        aincome:[],
        expectation: [],
        high_edu: [],
        hobbie: [],
        body_type:[],
        horoscope:[],
        showprofile:[]
    };
    controller.showProfile=[
        {
             id:"0",
             value:"ANY_1",
             name:"Doesn't matter"
         },
        {
           
            value:"WITHPHOTO",
            name:"With Photo"
        },
        {
           
            value:"ONLINE",
            name:"Online Right Now"
        },
        {
           
            value:"GOLDUSER",
            name:"Premium Members"
        }
        
    ];
    controller.PostedBy=[
        {
            id:"1",
             value:"ANY_2",
             name:"Doesn't matter"
         },
        {
           
            value:"SELF",
            name:"Self"
        },
        {
           
            value:"PARENTS",
            name:"Parents"
        },
        {
           
            value:"SIBLINGS",
            name:"Siblings"
        }
        
    ];
    controller.dontShow=[
        {
            id:"1",
             value:"ANY_3",
             name:"Doesn't matter"
         },
        {
           
            value:"VIEWED_PROFILE",
            name:"Viewed Profiles"
        },
        {
           
            value:"LIKED",
            name:"Liked Profiles"
        }
        
    ];
    controller.check=function(item1,data,any){

        if(item1.value===any && item1.selected){
            angular.forEach(data, function (item) {
                
                    if(item.value!=any){
                       item.selected=false;
                     
                                }
                            
                        });
        }

        else{
            angular.forEach(data, function (item) {
                
                    if(item.value===any){
                       item.selected=false;
                      
                                }
                            
                        });
        }

       

      
 
    };
    controller.singleSelect=function(item1){
        
                controller.serachModel.showprofile=[];
         angular.forEach(controller.showProfile, function (item) {
        
            if(item.value==="ANY" && item.selected){
              //  item.selected=false;
               controller.serachModel.showprofile.push(item.value);
                        }
                    
                });
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
    controller.formdata=angular.copy(formdata);
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
    countryService.getCountries(function (res) {
        controller.countrys = empty2.concat(res);
        controller.states = empty2.concat([]);
        controller.cities = empty2.concat([]);
    }, function () { });
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
            controller.DisabledState = false;
            controller.DisabledCity = true;

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


            controller.DisabledCity = false;

            loadCT(item);
        }


    };

    function loadST(target) {

        if (controller.serachModel.country.length === 0) {
            controller.DisabledState = true;
            controller.serachModel.state = [];
            controller.serachModel.city = [];
            return;
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
controller.onSelectCallbackCity= function (item, model, g) {
   
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
            controller.casteDisabled = false;
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
    controller.onSelectCallbackCaste= function (item, model, g) {
        
         if (item.value === "ANY") {
            
             controller.serachModel.caste = empty.concat([]);
            }
         else {
   
             controller.serachModel.caste = $.grep(controller.serachModel.caste, function (e) {
                
               return e.value != "ANY";
            
             });
     
     
         }
     
     };
    
};