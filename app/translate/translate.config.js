/* @ngInject */
module.exports = function ($translateProvider, $localStorageProvider) {
  $translateProvider.useSanitizeValueStrategy(null);
  var lang = null;
  if ($localStorageProvider.get('language')) {
    lang = $localStorageProvider.get('language');
  }
  else {
    $localStorageProvider.set('language', 'EN');
    lang = 'EN';
  }
  $translateProvider
    .useStaticFilesLoader({
      prefix: 'app/translate/languages/db-',
      suffix: '.json'
    })
    .preferredLanguage(lang);
  this.$get = function () {
    return;
  };
};