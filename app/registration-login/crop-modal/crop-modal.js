/* @ngInject */

module.exports = function CropModalController($uibModal,$uibModalInstance,$scope) {
  
    var controller = this;
    //modal close button//
   controller.cancel = function () {
     $uibModalInstance.dismiss('cancel');
    };
    //profile picture crop//
controller.myImage='';
controller.myCroppedImage='';

//camera //
controller.clicked=false;
controller.openCamera=function(){
    
    controller.myImage='';
controller.clicked=controller.clicked ? false :true;

};
var _video = null,
        patData = null;

   controller.patOpts = {x: 0, y: 0, w: 25, h: 25};

    // Setup a channel to receive a photo property
    // with a reference to the video element
    // See the HTML binding in main.html
    controller.channel = {
        videoHeight: 350,
    videoWidth: 540
    };

    controller.webcamError = false;
   controller.onError = function (err) {
      
           controller.webcamError = err;
           controller.clicked=false;
        
    };

    controller.onSuccess = function () {
        // The video element contains the captured camera data
        _video = controller.channel.video;
      
            controller.patOpts.w = _video.width;
            controller.patOpts.h = _video.height;
          
    };

    controller.onStream = function (stream) {
        // You could do something manually with the stream.
    };



	controller.makeSnapshot = function() {
       if (_video) {
            var patCanvas = document.querySelector('#snapshot');
            if (!patCanvas) {return}

            patCanvas.width = _video.width;
            patCanvas.height = _video.height;
            var ctxPat = patCanvas.getContext('2d');

            var idata = getVideoData(controller.patOpts.x, controller.patOpts.y, controller.patOpts.w, controller.patOpts.h);
            ctxPat.putImageData(idata, 0, 0);

           controller.myImage=patCanvas.toDataURL();

            patData = idata;
            controller.clicked=false;
        }
    };
    
    
    
    var getVideoData = function getVideoData(x, y, w, h) {
        var hiddenCanvas = document.createElement('canvas');
        hiddenCanvas.width = _video.width;
        hiddenCanvas.height = _video.height;
        var ctx = hiddenCanvas.getContext('2d');
        ctx.drawImage(_video, 0, 0, _video.width, _video.height);
        return ctx.getImageData(x, y, w, h);
    };

  controller.savePhoto=function(){
      
watermark([controller.myCroppedImage])
  .image(watermark.text.lowerRight('Dholbaaje', '30px Josefin Slab', '#fff', 0.5))
  .then(function (img) {
    document.getElementById('watermark').appendChild(img);
  });
  };

};