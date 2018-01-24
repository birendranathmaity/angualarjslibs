/* @ngInject */
module.exports = function ($http,toastr, $state, ServiceUrls) {
    var service={
    
        send_request: function (data, success, error) {
            $http.post(ServiceUrls.BASEURL + ServiceUrls.SEND_REQUEST, data).success(success).error(error);
        },
        update_request: function (data, success, error) {
            $http.post(ServiceUrls.BASEURL + ServiceUrls.UPDATE_REQUEST, data).success(success).error(error);
        },
        create_user_block: function (data, success, error) {
            $http.post(ServiceUrls.BASEURL + ServiceUrls.CREATE_USER_BLOCK, data).success(success).error(error);
        },
        update_user_block: function (data, success, error) {
            $http.post(ServiceUrls.BASEURL + ServiceUrls.UPDATE_USER_BLOCK, data).success(success).error(error);
        },
        get_notifications: function (data, success, error) {
            $http.post(ServiceUrls.BASEURL + ServiceUrls.GET_NOTIFICATIONS, data).success(success).error(error);
        },
        update_notifications: function (data, success, error) {
            $http.post(ServiceUrls.BASEURL + ServiceUrls.UPDATE_NOTIFICATIONS, data).success(success).error(error);
        },
        openReq:function(noti){
            if(noti.request_type==="MESSAGE"){
                if(noti.whosent==="SENT"){
                    $state.go('root.message_request', { 'requestType': "MESSAGE",'viewType':'SENT'})
                }
                else if(noti.request_action){
                    $state.go('root.message_request', { 'requestType': "MESSAGE",'viewType':noti.request_action});
                }
                else{
                    $state.go('root.message_request', { 'requestType': "MESSAGE",'viewType':'RECEIVED'});
                }
                
               
            }
            if(noti.request_type==="PHOTO"){
                if(noti.whosent==="SENT"){
                    $state.go('root.photo_request', { 'requestType': "PHOTO",'viewType':'SENT'})
                }
                else if(noti.request_action){
                    $state.go('root.photo_request', { 'requestType': "PHOTO",'viewType':noti.request_action});
                }
                else{
                    $state.go('root.photo_request', { 'requestType': "PHOTO",'viewType':'RECEIVED'});
                }
                }
                if(noti.request_type==="CONTACT"){
                    if(noti.whosent==="SENT"){
                        $state.go('root.contact_request', { 'requestType': "CONTACT",'viewType':'SENT'})
                    }
                    else if(noti.request_action){
                        $state.go('root.contact_request', { 'requestType': "CONTACT",'viewType':noti.request_action});
                    }
                    else{
                        $state.go('root.contact_request', { 'requestType': "CONTACT",'viewType':'RECEIVED'});
                    }
                    }
            },
    toaster_msg:function(msg){
        toastr.success(msg);
    
    },
        
    
    }
    return service;
    
    }    
    
    