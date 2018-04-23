/* @ngInject */
module.exports = function serachFieldsControllerDir($filter, countryService, $scope, $timeout, $viewusers, loginservice, $translate, $location, $state) {
  var controller = this;
  controller.configScollBar = {
    autoHideScrollbar: false,
    documentTouchScroll: true,
    theme: '3d-dark',
    axis: 'y',
    setHeight: 250,
    scrollInertia: 0,
    scrollButtons: {
      scrollAmount: 'auto', // scroll amount when button pressed 
      enable: true // enable scrolling buttons by default 
    },
    advanced: {
      updateOnContentResize: true
    }
  };
  controller.formdata = loginservice.getFiledsData();
  var height = controller.formdata.height;
  controller.casteData = [];
  controller.countrys = [];
  controller.states = [];
  controller.cities = [];
  var empty2 = [];
  controller.DisabledState = false;
  controller.DisabledCity = false;
  function loadCountries() {
    countryService.getCountries(function (res) {
      controller.countrys = empty2.concat(res);
      controller.states = empty2.concat([]);
      controller.cities = empty2.concat([]);
    }, function () { });
  }
  loadCountries();
  function loadST(target) {
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
    var code = target.id;
    var sname = target.name;
    var country_id = target.country_id;
    countryService.getCities(code, function (res) {
      if (res.length > 0) {
        for (var key in res) {
          res[key].sname = sname;
          res[key].country_id = country_id;
        }
      }

      controller.cities = controller.cities.concat(res);

    }, function () { });



  }
  controller.relAcc = false;
  controller.cstAcc = false;
  var isCallGetFields = true;
  controller.tchange = function (item, target) {
    if (target === "mother_tongues") {

      if (item.selected) {
        controller.filterdata[target].push(item);
      }
      else {
        controller.filterdata[target] = $.grep(controller.filterdata[target], function (e) {
          return e.value != item.value;
        });
      }
    }
    if (target === "MaritialStatus") {

      if (item.selected) {
        controller.filterdata[target].push(item);
      }
      else {
        controller.filterdata[target] = $.grep(controller.filterdata[target], function (e) {
          return e.value != item.value;
        });
      }
    }
    if (target === "religions") {
      if (item.selected) {

        controller.cstAcc = true;
        controller.filterdata[target].push(item);
        var cst = loginservice.getCastes(item.value);
        controller.casteData = controller.casteData.concat(cst);
      }
      else {
        controller.casteData = $.grep(controller.casteData, function (e) {
          return e.religion != item.value;
        });
        controller.filterdata[target] = $.grep(controller.filterdata[target], function (e) {
          return e.value != item.value;
        });
        controller.filterdata.caste = $.grep(controller.filterdata.caste, function (e) {
          return e.religion != item.value;
        });
      }

    }
    if (target === "caste") {
      if (item.selected) {

        controller.filterdata[target].push(item);

      }
      else {
        controller.filterdata[target] = $.grep(controller.filterdata[target], function (e) {
          return e.value != item.value;
        });
      }

    }
    if (target === "country") {
      if (item.selected) {
        loadST(item);
        controller.filterdata[target].push(item);
        controller.DisabledState = true;

      }
      else {
        controller.states = $.grep(controller.states, function (e) {
          return e.country_id != item.id;
        });
        controller.filterdata[target] = $.grep(controller.filterdata[target], function (e) {
          return e.id != item.id;
        });
        controller.filterdata.state = $.grep(controller.filterdata.state, function (e) {
          return e.country_id != item.id;
        });
        controller.filterdata.city = $.grep(controller.filterdata.city, function (e) {
          return e.country_id != item.id;
        });
      }
      //   controller.countrys.sort(function(x, y) {
      //     // true values first
      //     return (x.selected === y.selected)? 0 : x.selected ? -1 : 1;
      //     // false values first
      //     // return (x === y)? 0 : x? 1 : -1;
      // });
    }
    if (target === "state") {
      if (item.selected) {
        loadCT(item);
        controller.filterdata[target].push(item);
        controller.DisabledCity = true;
      }
      else {
        controller.filterdata[target] = $.grep(controller.filterdata[target], function (e) {
          return e.id != item.id;
        });
        controller.cities = $.grep(controller.cities, function (e) {
          return e.state_id != item.id;
        });
        controller.filterdata.city = $.grep(controller.filterdata.city, function (e) {
          return e.state_id != item.id;
        });
      }
    }
    if (target === "city") {
      if (item.selected) {
        controller.filterdata[target].push(item);
      }
      else {
        controller.filterdata[target] = $.grep(controller.filterdata[target], function (e) {
          return e.id != item.id;
        });
      }
    }
    if (target === "high_edu") {
      if (item.selected) {
        controller.filterdata[target].push(item);
      }
      else {
        controller.filterdata[target] = $.grep(controller.filterdata[target], function (e) {
          return e.value != item.value;
        });
      }
    }
    if (target === "occupation") {
      if (item.selected) {
        controller.filterdata[target].push(item);
      }
      else {
        controller.filterdata[target] = $.grep(controller.filterdata[target], function (e) {
          return e.value != item.value;
        });
      }
    }
    if (target === "photoType") {
      controller.filterdata.photoType = null;
      for (var i = 0; i < controller.formdata.photoType.length; i++) {
        if (controller.formdata.photoType[i].value === item.value && item.selected) {
          controller.formdata.photoType[i].selected = true;

        }
        else {
          controller.formdata.photoType[i].selected = false;

        }
      }
      if (item.selected) {

        controller.filterdata.photoType = item.value;
        setDateRangeType(item.value);
      }




    }
    if (target === "userType") {
      controller.filterdata.userType = null;
      for (var i = 0; i < controller.formdata.userType.length; i++) {
        if (controller.formdata.userType[i].value === item.value && item.selected) {
          controller.formdata.userType[i].selected = true;

        }
        else {
          controller.formdata.userType[i].selected = false;

        }
      }
      if (item.selected) {
        setDateRangeType(item.value);
        controller.filterdata.userType = item.value;;
        setInitalStateOfphoto(item.value);
      }
      else {
        setInitalStateOfphoto(item.value);
      }

    }
    if (target === "DateRangeType") {
      controller.filterdata.dateRange.type = null;
      for (var i = 0; i < controller.formdata.DateRangeType.length; i++) {
        if (controller.formdata.DateRangeType[i].value === item.value && item.selected) {
          controller.formdata.DateRangeType[i].selected = true;

        }
        else {
          controller.formdata.DateRangeType[i].selected = false;

        }
      }
      if (item.selected) {
        controller.filterdata.dateRange.type = item.value;
      }

    }
    if (target === "gender") {
      if (item.selected) {
        controller.filterdata[target].push(item);
      }
      else {
        controller.filterdata[target] = $.grep(controller.filterdata[target], function (e) {
          return e.value != item.value;
        });
      }
    }
    if (target === "physical_status") {
      if (item.selected) {
        controller.filterdata[target].push(item);
      }
      else {
        controller.filterdata[target] = $.grep(controller.filterdata[target], function (e) {
          return e.value != item.value;
        });
      }
    }
    getFilterData();
  };

  controller.sliderAge = {
    minValue: 18,
    maxValue: 60,
    options: {
      floor: 18,
      minLimit: 18,
      maxLimit: 60,
      onEnd: function () {
        controller.filterdata.age.from = controller.sliderAge.minValue;
        controller.filterdata.age.to = controller.sliderAge.maxValue;
        getFilterData();
      }
    }
  }
  controller.sliderHeight = {
    minValue: 4,
    maxValue: 6.11,
    options: {
      onEnd: function () {
        controller.filterdata.height.from = controller.sliderHeight.minValue;
        controller.filterdata.height.to = controller.sliderHeight.maxValue;
        getFilterData();
      },
      stepsArray: height
    }
  };
  controller.dateOptions = {
    showWeeks: false,
    formatYear: 'yy',
    maxDate: new Date(),
    startingDay: 1
  };
  controller.isDateError = false;
  controller.go = function (startDate, endDate) {
    controller.errMessage = '';
    var curDate = new Date();
    controller.isDateError = false;
    if( !controller.filterdata.dateRange.from){
      return;
    }
    if( !controller.filterdata.dateRange.to){
      return;
    }
     
    if (new Date(startDate) > new Date(endDate)) {
      controller.errMessage = '*End Date should be greater than start date';
      controller.isDateError = true;
      return false;
    }
    getFilterData();
  };

  controller.filterdata = {
    userType: null,
    photoType: null,
    dateRange: {
      type: null,
      from: null,
      to: null
    },
    age: {
      from: 18,
      to: 60
    },
    height: {
      from: 4,
      to: 6.11
    },
    gender: [],
    MaritialStatus: [],
    mother_tongues: [],
    religions: [],
    caste: [],
    country: [],
    state: [],
    city: [],
    physical_status: [],
    occupation: [],
    high_edu: [],

  };
  function setInitalStateOfphoto(type) {
    controller.filterdata.photoType = null;
    controller.filterdata.dateRange.type = null;
    for (var i = 0; i < controller.formdata.photoType.length; i++) {
      controller.formdata.photoType[i].selected = false;
    }
    if (type === "ACTIVE") {
      controller.filterdata.dateRange.type = "ACTIVATIONDATE";
    }
    else {
      controller.filterdata.dateRange.type = "CREATEDDATE";
    }

    for (var i = 0; i < controller.formdata.DateRangeType.length; i++) {

      if (controller.formdata.DateRangeType[i].value === controller.filterdata.dateRange.type) {
        controller.formdata.DateRangeType[i].selected = true;

      }
      else {
        controller.formdata.DateRangeType[i].selected = false;

      }


    }
    if(!controller.filterdata.userType){
      controller.filterdata.dateRange.type = null;
      controller.filterdata.dateRange.to = null;
      controller.filterdata.dateRange.from = null;
    }
  }
  function setDateRangeType(type) {

    if (type === "INCOMPLETE" || type === "INPROGRESS") {

      setInitalStateOfphoto(type);

      for (var i = 0; i < controller.formdata.DateRangeType.length; i++) {
        if (controller.formdata.DateRangeType[i].value === 'CREATEDDATE') {
          controller.formdata.DateRangeType[i].iSvisible = true;
          controller.formdata.DateRangeType[i].selected = true;
          controller.filterdata.dateRange.type = "CREATEDDATE";
        }
        else {
          controller.formdata.DateRangeType[i].iSvisible = false;
        }
      }
    }
    if (type === "NOT_UPLOADED") {
      for (var i = 0; i < controller.formdata.DateRangeType.length; i++) {
        if (controller.formdata.DateRangeType[i].value === 'CREATEDDATE' || controller.formdata.DateRangeType[i].value === 'ACTIVATIONDATE') {
          controller.formdata.DateRangeType[i].iSvisible = true;
        }
        else {
          controller.formdata.DateRangeType[i].iSvisible = false;
        }
      }
    }
    if (type === "PENDING_APPROVAL") {
      for (var i = 0; i < controller.formdata.DateRangeType.length; i++) {
        if (controller.formdata.DateRangeType[i].value === 'CREATEDDATE' ||
          controller.formdata.DateRangeType[i].value === 'ACTIVATIONDATE' ||
          controller.formdata.DateRangeType[i].value === 'UPLOADED_DATE'
        ) {
          controller.formdata.DateRangeType[i].iSvisible = true;
        }
        else {
          controller.formdata.DateRangeType[i].iSvisible = false;
        }
      }
    }
    if (type === "APPROVED") {
      for (var i = 0; i < controller.formdata.DateRangeType.length; i++) {
        if (controller.formdata.DateRangeType[i].value === 'CREATEDDATE' ||
          controller.formdata.DateRangeType[i].value === 'ACTIVATIONDATE' ||
          controller.formdata.DateRangeType[i].value === 'APPROVED_PHOTO'
        ) {
          controller.formdata.DateRangeType[i].iSvisible = true;
        }
        else {
          controller.formdata.DateRangeType[i].iSvisible = false;
        }
      }
    }
    if (type === "REJECTED") {
      for (var i = 0; i < controller.formdata.DateRangeType.length; i++) {
        if (controller.formdata.DateRangeType[i].value === 'CREATEDDATE' ||
          controller.formdata.DateRangeType[i].value === 'ACTIVATIONDATE' ||
          controller.formdata.DateRangeType[i].value === 'REJECTED_PHOTO'
        ) {
          controller.formdata.DateRangeType[i].iSvisible = true;
        }
        else {
          controller.formdata.DateRangeType[i].iSvisible = false;
        }
      }
    }
    if (type === "ACTIVE") {
      for (var i = 0; i < controller.formdata.DateRangeType.length; i++) {
        if (controller.formdata.DateRangeType[i].value === 'CREATEDDATE' || controller.formdata.DateRangeType[i].value === 'ACTIVATIONDATE') {
          controller.formdata.DateRangeType[i].iSvisible = true;
        }
        else {
          controller.formdata.DateRangeType[i].iSvisible = false;
        }
      }
    }
  }
  function getFilterData() {

    if (!isCallGetFields) {
      return;
    }
    var finalfilter = angular.copy(controller.filterdata);
    for (var key in finalfilter) {
      if (angular.isArray(finalfilter[key])) {
        if (key === "city" && finalfilter[key].length > 0) {
          for (var i = 0; i < finalfilter[key].length; i++) {
            finalfilter[key][i] = {
              country_id: finalfilter[key][i].country_id,
              state_id: finalfilter[key][i].state_id,
              city_id: finalfilter[key][i].id
            };

          }

        }
        else if (key === "state" && finalfilter[key].length > 0) {

          for (var i = 0; i < finalfilter[key].length; i++) {
            finalfilter[key][i] = {
              country_id: finalfilter[key][i].country_id,
              state_id: finalfilter[key][i].id

            };

          }

        }
        else if (key === "country" && finalfilter[key].length > 0) {

          for (var i = 0; i < finalfilter[key].length; i++) {
            finalfilter[key][i] = {
              country_id: finalfilter[key][i].id


            };

          }

        }
        else if (key === "religions" && finalfilter[key].length > 0) {

          for (var i = 0; i < finalfilter[key].length; i++) {
            finalfilter[key][i] = finalfilter[key][i].value;

          }

        }
        else if (key === "caste" && finalfilter[key].length > 0) {

          for (var i = 0; i < finalfilter[key].length; i++) {
            finalfilter[key][i] = {
              caste: finalfilter[key][i].value,
              religion: finalfilter[key][i].religion,
            };

          }

        }
        else if ((key === "gender" ||
          key === "MaritialStatus" ||
          key === "mother_tongues" ||
          key === "physical_status" ||
          key === "occupation" ||
          key === "high_edu") && finalfilter[key].length > 0) {

          for (var i = 0; i < finalfilter[key].length; i++) {
            finalfilter[key][i] = finalfilter[key][i].value;

          }

        }
      }
    };

    $scope.getFields({ fields: finalfilter });

  }
  $timeout(function () {
    $scope.$broadcast('reCalcViewDimensions');
  }, 1000);

  function setFields(type) {


    if (type === "TOTAL_USERS") {

      $scope.getFields({ fields: {} });
    }
    if (type === "TOTAL_ACTIVE_USERS") {
      angular.forEach(controller.formdata.userType, function (item, userIndex) {
        if (item.value === "ACTIVE") {
          item.selected = true;
          controller.tchange(item, "userType");
        }
        else {
          item.selected = false;

        }
      });
    }
    if (type === "TOTAL_INCOMPLETE_USERS") {
      angular.forEach(controller.formdata.userType, function (item, userIndex) {
        if (item.value === "INCOMPLETE") {
          item.selected = true;
          $scope.getFields({ fields: {
            userType:"INCOMPLETE",
            dateRange:{
                type:null,
                to:null
          }} });
         // controller.tchange(item, "userType");
        }
        else {
          item.selected = false;

        }
      });
    }
    if (type === "TOTAL_INPROGRESS_USERS") {
      angular.forEach(controller.formdata.userType, function (item, userIndex) {
        if (item.value === "INPROGRESS") {
          item.selected = true;
          $scope.getFields({ fields: {
            userType:"INPROGRESS",
            dateRange:{
              type:null,
              to:null
            }
          
          } });
         // controller.tchange(item, "userType");
        }
        else {
          item.selected = false;

        }
      });
     
    }
    if (type === "PHOTO_UPLOAD_PENDING") {
      angular.forEach(controller.formdata.userType, function (item, userIndex) {
        if (item.value === "ACTIVE") {
          item.selected = true;
          isCallGetFields = false;
          controller.tchange(item, "userType");
        }
        else {
          item.selected = false;

        }
      });
      angular.forEach(controller.formdata.photoType, function (item, userIndex) {
        if (item.value === "NOT_UPLOADED") {
          item.selected = true;
          isCallGetFields = true;
          controller.tchange(item, "photoType");
        }
        else {
          item.selected = false;

        }
      });
    }
    if (type === "PHOTO_VR_PENDING") {
      angular.forEach(controller.formdata.userType, function (item, userIndex) {
        if (item.value === "ACTIVE") {
          item.selected = true;
          isCallGetFields = false;
          controller.tchange(item, "userType");
        }
        else {
          item.selected = false;

        }
      });
      angular.forEach(controller.formdata.photoType, function (item, userIndex) {
        if (item.value === "PENDING_APPROVAL") {
          item.selected = true;
          isCallGetFields = true;
          controller.tchange(item, "photoType");
        }
        else {
          item.selected = false;

        }
      });
    }
    if (type === "PHOTO_VR_COMPLETED") {
      angular.forEach(controller.formdata.userType, function (item, userIndex) {
        if (item.value === "ACTIVE") {
          item.selected = true;
          isCallGetFields = false;
          controller.tchange(item, "userType");
        }
        else {
          item.selected = false;

        }
      });
      angular.forEach(controller.formdata.photoType, function (item, userIndex) {
        if (item.value === "APPROVED") {
          item.selected = true;
          isCallGetFields = true;
          controller.tchange(item, "photoType");
        }
        else {
          item.selected = false;

        }
      });
    }
    if (type === "PHOTO_VR_REJECTED") {
      angular.forEach(controller.formdata.userType, function (item, userIndex) {
        if (item.value === "ACTIVE") {
          item.selected = true;
          isCallGetFields = false;
          controller.tchange(item, "userType");
        }
        else {
          item.selected = false;

        }
      });
      angular.forEach(controller.formdata.photoType, function (item, userIndex) {
        if (item.value === "REJECTED") {
          item.selected = true;
          isCallGetFields = true;
          controller.tchange(item, "photoType");
        }
        else {
          item.selected = false;

        }
      });
    }
  }
  $scope.$watch('loadType', function (n, v) {

    if (!n) {
      return;
    }
    setFields(n);
  });
};