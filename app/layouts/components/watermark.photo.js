/* @ngInject */
module.exports = function (ServiceUrls) {
    return {
        restrict: 'A',
        scope: {
            waterMark: "="
        },
        controller: [
            '$scope',
            '$element',
            '$attrs',
            function ($scope, $element, $attrs) {

                // $scope.$watch(function($scope) {
                //       return $scope.waterMark.
                //           map(function(obj) {
                //             return obj.name
                //           });
                // }, function (newVal) {
                //        $scope.waterMark=newVal;
                //     }, true);

                $scope.$watch('waterMark', function (newVal, oldVal) {

                    if (!newVal) {
                        $attrs.$set('src', " dist/assets/img/emptyphoto.png");
                        return;
                    }
                  
                    $scope.waterMark = newVal;
                    loadImage();
                }, true);
                function convertImgToBase64URL(url, callback, outputFormat) {
                    var img = new Image();
                    img.crossOrigin = 'Anonymous';
                    img.onload = function () {
                        var canvas = document.createElement('CANVAS'),
                            ctx = canvas.getContext('2d'), dataURL;
                        canvas.height = this.height;
                        canvas.width = this.width;
                        ctx.drawImage(this, 0, 0);
                        dataURL = canvas.toDataURL(outputFormat);
                        callback(dataURL);
                        canvas = null;
                    };
                    img.src = url;
                }

                function loadImage() {
                    var imgUrl = ServiceUrls.BASEURL + ServiceUrls.USER_PROFILE_PHOTO_DISPLAY_PATH + $scope.waterMark.photo_path;

                    convertImgToBase64URL(imgUrl, function (data) {

                        if ($scope.waterMark.photo_vr) {
                            watermark([data])
                                .image(watermark.text.lowerRight('Dholbaaje', '30px Josefin Slab', '#ff6666', 0.5))
                                .then(function (img) {
                                    $attrs.$set('src', img.src);
                                });
                        }
                        else {
                            $attrs.$set('src', imgUrl);
                        }


                    }, function () { });
                }

            }
        ],
        link: function ($scope, $element, $attrs) {




        }
    };
};