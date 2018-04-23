/* @ngInject */
module.exports = function adminDashboardController($filter, countryService, $scope, $timeout, $viewusers, loginservice, $translate, $location, $state) {
  var controller = this;
  controller.labels = [];
  controller.colors = ['#191ae2', '#75FF33', '#FF5733', '#FFBD33', '#DE8827', '#DBFF33', '#F05B05', '#14A23D', '#46BFBD', '#FF9999'];
  controller.data = [];
  controller.options = {
    legend: {
      display: false,
      position: 'top',
    },
    cutoutPercentage: 60,
    tooltipEvents: [],
    tooltipCaretSize: 0,
    showTooltips: true,
    onAnimationComplete: function () {
      self.showTooltip(self.segments, true);
    }
  };
  $viewusers.get_all_users_status_count(function (result) {
    controller.userStatusList = result[0];
    var graphCounts = result[0];
    for (var key in graphCounts) {
      if (key !== "_id") {
        var lab = $translate.instant(key);
        controller.labels.push(lab);
        controller.data.push(graphCounts[key]);
      }


    }

  }, function () {

  });
  controller.loadurl = function (key) {

    $state.go('root.viewusers', { "userLoadType": key });
    // this.$router.navigate(['/viewusers']);

  };
};