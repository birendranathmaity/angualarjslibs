/* @ngInject */
module.exports = function ($uibModal, $filter,countryService,loginservice) {
    return {
        restrict: 'E',
        templateUrl:'./app/registration-login/components/basic-info.html',
        controllerAs:'ctrl',
        controller: [
            '$scope',
            '$element',
            '$attrs',
            function ($scope, $element, $attrs) {
           var controller = this;


    var formdata = require('./form-data');
//open login modal//
    controller.openLoginModal = function(size) {
        var modalInstance = $uibModal.open({
            animation: true,
            windowClass: "login-model",
            templateUrl: './app/registration-login/login-modal/login.html',
            controller: 'LoginController',
            controllerAs: 'ctrl',
            size: size

        });
    };
//wizard menu///
    controller.moreInfoTabsmenu = [{
            id: "basic",
            translateKey: "BASIC_MORE_DETAILS",
            active: false
        },
        {
            id: "education",
            translateKey: "EDUCATION_&_WORK_INFO",
            active: false
        },
        {
            id: "interests",
            translateKey: "YOUR_LOOK_&_INTERESTS",
            active: false
        },
        {
            id: "family",
            translateKey: "FAMILY_BACKGROUND_&_HOROSCOPE",
            active: false
        }
    ];
    controller.openTabContent = function(tabID) {
        for (var i = 0; i < controller.moreInfoTabsmenu.length; i++) {
            if (controller.moreInfoTabsmenu[i].id === tabID) {
                controller.moreInfoTabsmenu[i].active = true;

            } else {
                controller.moreInfoTabsmenu[i].active = false;

            }
        }

    };

    controller.openTabContent('basic');

    //load basic info data//
       var hindu = formdata.rhindu;
       var muslim = formdata.rmuslim;
       var christian = formdata.rchristian;

    var noCaste = new Array("Any", "caste no Bar");
    controller.loadCaste = function(rel) {
        if (rel === "Hinduism") {
            controller.casteData = hindu;
            return;
        }
        if (rel === "Islam") {
            controller.casteData = muslim;
            return;
        }
        if (rel === "Christianity") {
            controller.casteData = christian;
            return;
        }
        if (rel === "Hinduism") {
            controller.casteData = hindu;
            return;
        }
        controller.casteData = noCaste;

    };
     controller.required = function(key) {
        return $filter('translate')(key);
    };
    var unique = function(origArr) {
        var newArr = [],
            origLen = origArr.length,
            found, x, y;

        for (x = 0; x < origLen; x++) {
            found = undefined;
            for (y = 0; y < newArr.length; y++) {
                if (origArr[x].state === newArr[y].state) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                newArr.push(origArr[x]);
            }
        }
        return newArr;
    };
    //load country details//
controller.countriesCodes=formdata.countriesWithCode;
countryService.getCountries(function(res){
    controller.countrys=res;
},function(){});



controller.loadState = function(countryId) {
   
countryService.getStates(countryId,function(res){
controller.states=res;
},function(){});
    };
controller.loadCity = function(stateId) {
 countryService.getCities(stateId,function(res){
controller.cities=res;
controller.cities.push({id:"other",name:"Other"});
},function(){});
 };
   
 //education work ///
//  open help me write modal//
     controller.OpenHelpMeWorkModal = function(size) {
        var modalInstance = $uibModal.open({
            animation: true,
            windowClass: "",
            templateUrl: './app/registration-login/help-me-write/help-me-write.html',
            controller: 'HelpMeWriteController',
            controllerAs: 'ctrl',
            size: size

        });
    };
    //hobbies
    controller.hobbies = formdata.hobbies;
    controller.zodiac =formdata.zodiac;

    //phone validation//
    controller.phoneValidator = function(phone) {
        var re = /[0-9]{10}/;

        if (!re.test(phone)) {
            return $filter('translate')('PHONE_VALIDATION_MESSAGE');
        }
        if (phone.length < 10 || phone.length > 10) {
            return $filter('translate')('PHONE_VALIDATION_MESSAGE');
        }

        return true;

    };
    controller.openDisplayPhotoUploadModal=function(size){
 var modalInstance = $uibModal.open({
            animation: true,
            windowClass: "",
            templateUrl: './app/registration-login/crop-modal/crop-modal.html',
            controller: 'CropModalController',
            controllerAs: 'ctrl',
            size: size,
            backdrop: 'static',
            keyboard: false

        });
    };
    controller.submitMoreInfo=function(basicinfo,educationwork,intrests,family){
       
intrests.height=parseFloat(intrests.height);
family.time_birth_min=parseInt(family.time_birth_min);
family.time_birth_hr=parseInt(family.time_birth_hr);

        var req={
          "basicinfo":basicinfo,
          "educationwork":educationwork,
          "intrests":intrests,
          "family":family
        };
         loginservice.savemoreinfo(req, function(res) {
                       if(res.success){
                  
                
                  loginservice.saveToken(res.token);
                  
                 
               }
                      
                    }, function() {

                    });

    };
            }
        ]
    };
};