/* @ngInject */
module.exports = function AddPhotosController($location,$scope,$timeout,$rootScope,loginservice) {
    var controller = this;
    var pics=loginservice.getProfilePic();
	
	//$scope.images =pics.album;
	function getAlbumPs(){
		loginservice.getCurrentUserSession(function(userDe){
			
			loginservice.getAlbumPics({user_id:userDe.user_id,photo_type: 'ALBUM'},function(ps){
	
	$scope.images=ps;
			});
				});
	}
	getAlbumPs();
   
				/*****************************************************/
				controller.UploadAlbum = function () {
                   
					loginservice.getCurrentUserSession(function(userDe){
						//console.log(userDe)
						var user = {
                            user_id: userDe.user_id,
                            skip_url: '/addphotos',
							photo_type: 'ALBUM',
							from_sec: 'userAlbum'
                           
                        };
					loginservice.openCropPopup(user);
							});
                };
				$scope.$on('userAlbumPhotoBoradcastToDisplay', function ($event,photo){

					getAlbumPs();

var img={
	id:photo._id,
	
};
				});
			

};