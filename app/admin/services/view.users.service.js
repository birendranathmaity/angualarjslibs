/* @ngInject */
module.exports =function($http,ServiceUrls){
       
    return {
            getUsers: function(data,success, error) {
                $http.post(ServiceUrls.BASEURL + ServiceUrls.GET_USERS,data).success(success).error(error);
            },
             get_all_users_status_count: function(success, error) {
                $http.get(ServiceUrls.BASEURL + ServiceUrls.GET_ALL_USERS_STATUS_COUNT).success(success).error(error);
            },
             getallinActiveUsers: function(data,success, error) {
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