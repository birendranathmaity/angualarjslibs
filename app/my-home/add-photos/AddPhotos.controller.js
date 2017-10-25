/* @ngInject */
module.exports = function AddPhotosController($location,$scope,$timeout,$rootScope,loginservice) {
    var controller = this;
    var pics=loginservice.getProfilePic();
	console.log(pics)
	//$scope.images =pics.album;
    $scope.images = [
	{
		id : 1,
			url : 'https://unsplash.it/800/600?image=227',
		thumbUrl : 'https://unsplash.it/800/600?image=227',
		
          
			},
	{
		id : 2,
		url : 'https://unsplash.it/800/600?image=227',
			
	},
	{
		id : 3,
	
		url : 'https://unsplash.it/800/600?image=227',
        
	}
];
$scope.conf = {
					imgAnim : 'fadeup'
				};
				/*****************************************************/
				
				
				$scope.addPhoto = function(){
					var n = Math.floor(Math.random() * 13) + 1;
					$scope.images.push(
						{
							url : '/demo/demo-images/' + n + '.jpg',
							thumbUrl : '/demo/demo-images/thumbs/' + n + '.jpg',
							bubbleUrl : '/demo/demo-images/bubbles/' + n + '.jpg'
						}
					);
				}
				
				$scope.removePhoto = function(){
					if($scope.images.length > 1) $scope.images.pop();
				}
				// Thumbnails
				$scope.thumbnails = true;
				$scope.toggleThumbnails = function(){
					$scope.thumbnails = !$scope.thumbnails;
				}
				// Inline
				$scope.inline = false;
				$scope.toggleInline = function(){
					$scope.inline = !$scope.inline;
				}
				// Bubbles
				$scope.bubbles = false;
				$scope.toggleBubbles = function(){
					$scope.bubbles = !$scope.bubbles;
				}
				// Image bubbles
				$scope.imgBubbles = false;
				$scope.toggleImgBubbles = function(){
					$scope.imgBubbles = !$scope.imgBubbles;
				}
				// Background close
				$scope.bgClose = false;
				$scope.closeOnBackground = function(){
					$scope.bgClose = !$scope.bgClose;
				}
				// Gallery methods gateway
				$scope.methods = {};
				$scope.openGallery = function(){
					$scope.methods.open();
				};
				// Gallery callbacks
				$scope.opened = function(){
					console.info('Gallery opened!');
				}
				$scope.closed = function(){
					console.warn('Gallery closed!');
				}
				$scope.delete = function(img, cb){
					cb();
				}

};