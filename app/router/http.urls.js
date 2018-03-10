/* @ngInject */
module.exports =  function(){
  //"BASEURL":"http://192.169.136.224:4000",

//var url="http://192.169.136.224:4000";
var url="http://localhost:4000";
return {
    "BASEURL":url,
    "LOGIN":"/login",
    "AUTHENTICATE":"/authenticate",
    "LOGOUT":"/logout",
    "SIGNIN":"/signin",
    "SINGUP":"/singup",
    "COUNTRIES":"/countries",
    "STATES":"/states",
    "CITIES":"/cities",
    "GET_USER_LOC":"/getuserloc",
    "CHECKEMAILID":"/checkemailid",
    "OTPVERIFY":"/otpverify",
    "SAVEMOREINFO":"/savemoreinfo",
    "GET_USERS":"/getusers",
    "GET_USER":"/getuser",
    "ADMIN_ACCEPT":"/admin_accept",
    "USER_PROFILE_PHOTO_UPLOAD":"/user_profile_photo_upload",
    "ADMIN_ACCEPT_PHOTO":"/admin_accept_photo",
    "USER_PROFILE_PHOTO_DISPLAY_PATH":"/userphoto/",
    "GETALLUSERS_GROUPBY_PHOTO_STATUS":"/getall_users_groupby_photo_status",
    "GETALLUSERS_GROUPBY_PHOTO_STATUS_COUNT":"/getall_users_groupby_photo_status_count",
    "GETALLUSERS_GROUPBY_PENDING_EMAIL_VR":"/getallusers_groupby_pending_email_vr",
    "GETALLUSERS_GROUPBY_PENDING_EMAIL_VR_COUNT":"/getallusers_groupby_pending_email_vr_count",
    "PENDING_PROFILES_COUNT":"/pending_profiles_count",
    "GET_ALL_USERS_STATUS_COUNT":"/get_all_users_status_count",
    "GET_ALBUM":"/getalbum",
    "GET_PRE_MATCHES":"/get_pre_matches",
    "SEND_MESSAGE":"/send_message",
    "GET_MESSAGES":"/get_messages",
    "CHANGE_MESSAGE_STATUS":"/change_message_status",
    "GET_MESSAGES_COUNT":"/get_messages_count",
    "CHECK_USER_CURRENTUSER":"/check_user_currentuser",
    "SEND_REQUEST":"/send_request",
    "UPDATE_REQUEST":"/update_request",
    "CREATE_USER_BLOCK":"/create_user_block",
    "UPDATE_USER_BLOCK":"/update_user_block",
    "GET_REQUESTS_COUNT":"/get_requests_count",
    "GET_REQUESTS":"/get_requests",
    "UPDATE_REQUESTS":"/update_requests",
    "GET_NOTIFICATIONS":"/get_notifications",
    "UPDATE_NOTIFICATIONS":"/update_notifications",
    "SET_SEARCH":"/set_search",
    "GET_SEARCH":"/get_search",
    "GET_SEARCH_RESULT":"/get_search_result",
    "SAVE_SEARCH_RESULT":"/save_search_result",
    "GET_SAVED_SEARCH_RESULT":"/get_saved_search_result",
    "SAVE_PARTNER_PRE":"/save_partner_pre",
    "GET_PARTNER_PRE":"/get_partner_pre",
    "GET_CONTACTNO":"/get_contactno",
    "SAVE_SETTINGS":"/save_settings",
    "GET_SETTINGS":"/get_settings",
    "UPDATEUSER":"/updateUser",
    "CHECK_ONLINE":"/check_online",
    "GET_CALENDER_REQUESTS":"/get_calender_requests"
      };
    

};