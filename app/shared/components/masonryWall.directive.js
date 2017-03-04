var Masonry = require('masonry-layout/masonry');
var _ = require('lodash');


/**
 * Modified from: https://gist.github.com/CMCDragonkai/6191419
 *
 * Masonry Directive for a wall of item.
 * This directive is intended to be used along with ng-repeat directive.
 * Put masonryWallDir on the container element and pass in a class selector for each item to be laid out.
 * Pass in optional options via masonryWallOptions.
 * Put the masonryItemDir next to ng-repeat directive on the item to be repeated.
 * You're done!
 *
 * @param {String} masonryWallBrick        Class selector of each item
 * @param {Object} masonryWallOptions    Optional options that are directly passed into Masonry
 */
/* @ngInject */
module.exports = function () {
    return {
        controller: [
            '$scope',
            '$element',
            '$attrs',
            function ($scope, $element, $attrs) {
                var wallContainer, masonryOptions;

                wallContainer = $element[0];

                masonryOptions = _.assign(
                    {},
                    $scope.$eval($attrs.masonryWallOptions),
                    { itemSelector: $attrs.masonryWallBrick }
                );

                this.masonry = new Masonry(
                    wallContainer,
                    masonryOptions
                );

                this.masonry.bindResize();

                var self = this;
                this.debouncedReload = _.debounce(function () {
                    self.masonry.reloadItems();
                    self.masonry.layout();
                }, 100);

                $scope.$on('redrawMasonry', function () {
                    self.debouncedReload();
                }).bind(self);

            }
        ]
    };
};
