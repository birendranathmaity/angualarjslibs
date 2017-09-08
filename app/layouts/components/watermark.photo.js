/* @ngInject */
module.exports = function ($http) {
    return {
        restrict: 'A',
        controller: [
            '$scope',
            '$element',
            '$attrs',
            function ($scope, $element, $attrs) {
              
            }
        ],
        link:function($scope, $element, $attrs){
function convertImgToBase64URL(url, callback, outputFormat){
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function(){
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

convertImgToBase64URL($attrs.waterMark,function(data){
    
    

    watermark([data])
  .image(watermark.text.lowerRight('BiruSangita', '30px Josefin Slab', '#fff', 0.5))
  .then(function (img) {
   
   $attrs.$set('src', img.src);
  });
},function(){});


        }
    };
};