/* @ngInject */
module.exports = function ($translateProvider) {
$translateProvider.useSanitizeValueStrategy(null);
$translateProvider
  .useStaticFilesLoader({
    prefix: './app/translate/languages/db-',
    suffix: '.json'
  })
  .preferredLanguage('english');
     this.$get = function () {
        return ;
    };
};