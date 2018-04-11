/* @ngInject */
module.exports = function ($translate, $localStorage) {
    return {
        restrict: 'E',
        templateUrl: 'app/layouts/components/language.dropdown.html',
        controllerAs: 'lang',
        controller: [
            '$scope',
            '$element',
            '$attrs',
            function ($scope, $element, $attrs) {
                var controller = this;
                controller.language = 'EN';
                if ($localStorage.language) {
                    controller.language = $localStorage.language;
                }
                controller.languages = [{
                    name: "English",
                    value: "EN"

                },
                {
                    name: "Gujrati",
                    value: "GJ"

                }, {
                    name: "Hindi",
                    value: "HN"

                }],

                    controller.updateLanguage = function () {
                        $translate.use(controller.language);
                        $localStorage.language = controller.language;

                    };
            }
        ]
    };
};
