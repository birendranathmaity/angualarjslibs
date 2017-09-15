/* @ngInject */
module.exports =function($http,ServiceUrls){
       
    return {
            getallActiveUsers: function(data,success, error) {
                $http.post(ServiceUrls.BASEURL + ServiceUrls.GETALL_ACTIVE_USERS,data).success(success).error(error);
            },
             getallActiveUsers: function(data,success, error) {
                $http.post(ServiceUrls.BASEURL + ServiceUrls.GETALL_ACTIVE_USERS,data).success(success).error(error);
            },
             getAllUsersGroupByPhotoStatus: function(data,success, error) {
                $http.post(ServiceUrls.BASEURL + ServiceUrls.GETALLUSERS_GROUPBY_PHOTO_STATUS,data).success(success).error(error);
            },
            getAllUsersGroupByPhotoStatusCount: function(success, error) {
                $http.get(ServiceUrls.BASEURL + ServiceUrls.GETALLUSERS_GROUPBY_PHOTO_STATUS_COUNT).success(success).error(error);
            },
            getAllUsersGroupByEmailVr: function(data,success, error) {
                $http.post(ServiceUrls.BASEURL + ServiceUrls.GETALLUSERS_GROUPBY_PENDING_EMAIL_VR,data).success(success).error(error);
            },
            getAllUsersGroupByEmailVrCount: function(success, error) {
                $http.get(ServiceUrls.BASEURL + ServiceUrls.GETALLUSERS_GROUPBY_PENDING_EMAIL_VR_COUNT).success(success).error(error);
            },
             pendingProfilesCount: function(success, error) {
                $http.get(ServiceUrls.BASEURL + ServiceUrls.PENDING_PROFILES_COUNT).success(success).error(error);
            },
             accept: function(data,success, error) {
                $http.post(ServiceUrls.BASEURL + ServiceUrls.ADMIN_ACCEPT,data).success(success).error(error);
            },
            accept: function(data,success, error) {
                $http.post(ServiceUrls.BASEURL + ServiceUrls.ADMIN_ACCEPT,data).success(success).error(error);
            }
            
        };
    };