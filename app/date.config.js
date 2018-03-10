/* @ngInject */
module.exports = function Decorate($provide) {
    $provide.decorator('uibDaypickerDirective', function ($delegate) {
        var directive = $delegate[0];
        directive.templateUrl = "template/datepicker/day.html";
        return $delegate;
    });
    $provide.decorator('uibMonthpickerDirective', function ($delegate) {
        var directive = $delegate[0];
        directive.templateUrl = "template/datepicker/month.html";
        return $delegate;
    });
    $provide.decorator('uibYearpickerDirective', function ($delegate) {
        var directive = $delegate[0];
        directive.templateUrl = "template/datepicker/year.html";
        return $delegate;
    });
    $provide.decorator('$locale', function ($delegate) {
        var value = $delegate.DATETIME_FORMATS;
    
        value.SHORTDAY = [
            "S",
            "M",
            "T",
            "W",
            "T",
            "F",
            "S"
        ];
    
        return $delegate;
      });
};