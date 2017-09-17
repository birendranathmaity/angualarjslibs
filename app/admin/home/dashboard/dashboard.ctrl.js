/* @ngInject */
module.exports = function adminDashboardController($viewusers, $translate,$location, $state) {
  var vm = this;

  vm.labels = [];

  vm.colors = ['#191ae2', '#75FF33', '#FF5733', '#FFBD33', '#DE8827', '#DBFF33', '#F05B05', '#14A23D', '#46BFBD', '#FF9999'];
  vm.data = [];
  vm.options = {
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
    vm.userStatusList = result[0];
    var graphCounts = result[0];
    for (var key in graphCounts) {
      if (key !== "_id") {
        var lab = $translate.instant(key);
        vm.labels.push(lab);
        vm.data.push(graphCounts[key]);
      }


    }




  }, function () {

  });
  vm.loadurl=function(key){
// $location.path("/viewusers");
// console.log(this.$router);
 $state.go('root.viewusers',{"userLoadType":key});
         // this.$router.navigate(['/viewusers']);

  };
};