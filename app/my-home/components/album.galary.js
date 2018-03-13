/* @ngInject */
module.exports = function () {
    return {
        restrict: 'E',
        templateUrl:'app/my-home/components/album.html',
        controllerAs:'$ctrl',
        scope:{
            album:"="

        },
        controller: [
            '$scope',
            '$element',
            '$attrs',
            function ($scope, $element, $attrs) {
                var controller=this;
                $scope.$watch('album', function (newVal, oldVal) {
                    if (!newVal) {
                        return;
                    }
                    
                    controller.images=newVal;
                    
                });
                controller.conf = {
					imgAnim : 'revolve'
				};
                controller.addPhoto = function(){
					var n = Math.floor(Math.random() * 13) + 1;
					controller.images.push(
						{
							url : '/demo/demo-images/' + n + '.jpg',
							thumbUrl : '/demo/demo-images/thumbs/' + n + '.jpg',
							bubbleUrl : '/demo/demo-images/bubbles/' + n + '.jpg'
						}
					);
				};
				
				controller.removePhoto = function(){
					if(controller.images.length > 1) {controller.images.pop();}
				};
				// Thumbnails
				controller.thumbnails = true;
				controller.toggleThumbnails = function(){
					controller.thumbnails = !controller.thumbnails;
				};
				// Inline
				controller.inline = false;
				controller.toggleInline = function(){
					controller.inline = !controller.inline;
				};
				// Bubbles
				controller.bubbles = true;
				controller.toggleBubbles = function(){
					controller.bubbles = !controller.bubbles;
				};
				// Image bubbles
				controller.imgBubbles = true;
				controller.toggleImgBubbles = function(){
					controller.imgBubbles = !controller.imgBubbles;
				};
				// Background close
				controller.bgClose = true;
				controller.closeOnBackground = function(){
					controller.bgClose = !controllere.bgClose;
				};
				// Gallery methods gateway
				controller.methods = {};
				controller.openGallery = function(){
					controller.methods.open();
				};
				// Gallery callbacks
				controller.opened = function(){
					console.info('Gallery opened!');
				};
				controller.closed = function(){
					console.warn('Gallery closed!');
				};
				controller.delete = function(img, cb){
					cb();
				};
                
            }
        ]
    };
};