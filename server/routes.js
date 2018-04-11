var jwt = require('jsonwebtoken');
var global = require('./setGlobal');
var serviceConfig = require('./serviceConfig.json');
var regisLogin = require('./modules/registration_login/registration_login');
var photo = require('./modules/registration_login/photo');
var admin = require('./modules/admin/view_users');
var adminTask = require('./modules/admin/admin.task');
var matches = require('./modules/matches/matches');
var messages = require('./modules/messages/message');
var request = require('./modules/messages/request');
var useractions = require('./modules/useraction');
var search = require('./modules/search');
module.exports = function (app, express, process) {
    app.use(serviceConfig.USER_PROFILE_PHOTO_DISPLAY_PATH, express.static(__dirname + '/upload_user_images'));
    app.post(serviceConfig.AUTHENTICATE, ensureAuthorized, regisLogin.authenticate);
    app.post(serviceConfig.SIGNIN, regisLogin.signin);
    // app.post(serviceConfig.SIGNUP, regisLogin.signup);
    app.post(serviceConfig.UPDATEUSER, ensureAuthorized, regisLogin.UpdateUser);
    app.post(serviceConfig.LOGOUT, ensureAuthorized, regisLogin.logout);
    app.post(serviceConfig.CHECKEMAILID, regisLogin.checkemail);
    app.post(serviceConfig.OTPVERIFY, regisLogin.verifyotp);
    app.post(serviceConfig.SAVEMOREINFO, ensureAuthorized, regisLogin.savemoreinfo);
    app.get(serviceConfig.COUNTRIES, regisLogin.getcountries);
    app.get(serviceConfig.STATES, regisLogin.getstates);
    app.get(serviceConfig.CITIES, regisLogin.getcities);
    app.get(serviceConfig.GET_USER_LOC, regisLogin.getUserLocation);
    app.post(serviceConfig.SENDEMAILOTP, regisLogin.sendEmailOtp);
    app.post(serviceConfig.SENDEPHONEOTP, ensureAuthorized, regisLogin.sendPhoneOtp);

    //PARTNER//
    app.post(serviceConfig.SAVE_PARTNER_PRE, ensureAuthorized, search.savePartnerPre);
    app.post(serviceConfig.GET_PARTNER_PRE, ensureAuthorized, search.getPartnerPre);
    //SEARCH//
    app.post(serviceConfig.SET_SEARCH, ensureAuthorized, search.saveSearch);
    app.post(serviceConfig.GET_SEARCH, ensureAuthorized, search.getSearch);
    app.post(serviceConfig.GET_SEARCH_RESULT, ensureAuthorized, search.getSearchResult);
    app.post(serviceConfig.SAVE_SEARCH_RESULT, ensureAuthorized, search.saveSearchResult);
    app.post(serviceConfig.GET_SAVED_SEARCH_RESULT, ensureAuthorized, search.getSavedSearchResults);
    //settings//
    app.post(serviceConfig.SAVE_SETTINGS, ensureAuthorized, useractions.save_settings);
    app.post(serviceConfig.GET_SETTINGS, ensureAuthorized, useractions.get_settings);
    //calender data//
    app.post(serviceConfig.GET_CALENDER_REQUESTS, ensureAuthorized, search.getRequestsCount);

    //user notification///
    app.post(serviceConfig.GET_NOTIFICATIONS, ensureAuthorized, useractions.getNotifications);
    app.post(serviceConfig.UPDATE_NOTIFICATIONS, ensureAuthorized, useractions.readNotifications);
    //user actions//
    app.post(serviceConfig.CHECK_ONLINE, ensureAuthorized, useractions.checkOnline);
    app.post(serviceConfig.CREATE_USER_BLOCK, ensureAuthorized, useractions.CreateUserBlock);
    app.post(serviceConfig.UPDATE_USER_BLOCK, ensureAuthorized, useractions.updateUserBlock);
    app.post(serviceConfig.CREATE_REPORT_ABUSE, ensureAuthorized, useractions.createReportAbuse);
    
    //messages//
    app.post(serviceConfig.GET_MESSAGES, ensureAuthorized, messages.getMessagesByType);
    app.post(serviceConfig.CHANGE_MESSAGE_STATUS, ensureAuthorized, messages.updateMessage);
    app.post(serviceConfig.SEND_MESSAGE, ensureAuthorized, messages.saveMessage);

    app.post(serviceConfig.GET_MESSAGES_COUNT, ensureAuthorized, messages.getMessagesCount);
    app.post(serviceConfig.CHECK_USER_CURRENTUSER, ensureAuthorized, messages.checkSendTouser);

    //requests//
    app.post(serviceConfig.GET_REQUESTS_COUNT, ensureAuthorized, request.getRequestsCount);
    app.post(serviceConfig.UPDATE_REQUESTS, ensureAuthorized, request.updateRequests);
    app.post(serviceConfig.GET_REQUESTS, ensureAuthorized, request.getRequestsByType);
    app.post(serviceConfig.SEND_REQUEST, ensureAuthorized, request.sendRequest);


    //matches//

    app.post(serviceConfig.GET_PRE_MATCHES, ensureAuthorized, matches.get_pre_matches);

    //admin//////
    app.post(serviceConfig.GET_USERS, ensureAuthorized, admin.get_users);
    app.post(serviceConfig.GET_USER, ensureAuthorized, admin.get_user);
    app.get(serviceConfig.GETALL_INACTIVE_USERS, ensureAuthorized, admin.getallinActiveUsers);
    app.post(serviceConfig.ADMIN_ACCEPT, ensureAuthorized, admin.adminAccept);
    app.post(serviceConfig.ADMIN_ACCEPT_PHOTO, ensureAuthorized, adminTask.adminAcceptPhoto);
    app.post(serviceConfig.ADMIN_ACTIVE_USER, ensureAuthorized, adminTask.admin_active_user);
    app.get(serviceConfig.GET_ALL_USERS_STATUS_COUNT, ensureAuthorized, admin.get_all_users_status_count);

    app.post(serviceConfig.GETALLUSERS_GROUPBY_PHOTO_STATUS, ensureAuthorized, admin.getallusersgroupbyphotostatus);
    app.get(serviceConfig.GETALLUSERS_GROUPBY_PHOTO_STATUS_COUNT, ensureAuthorized, admin.getallusersgroupbyphotostatus_count);

    app.post(serviceConfig.GETALLUSERS_GROUPBY_PENDING_EMAIL_VR, ensureAuthorized, admin.pendingemailvrusers);
    app.get(serviceConfig.GETALLUSERS_GROUPBY_PENDING_EMAIL_VR_COUNT, ensureAuthorized, admin.pendingemailvrusers_count);
    app.get(serviceConfig.PENDING_PROFILES_COUNT, ensureAuthorized, admin.pendingprofiles_count);

    //photo//

    app.post(serviceConfig.USER_PROFILE_PHOTO_UPLOAD, ensureAuthorized, photo.pPhotoUpload);
    app.post(serviceConfig.GET_ALBUM, photo.getAlbum);

    // app.post('/authenticate', function(req, res) {
    //     User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
    //         if (err) {
    //             res.json({
    //                 type: false,
    //                 data: "Error occured: " + err
    //             });
    //         } else {
    //             if (user) {
    //                 console.log( user.token )
    //                res.json({
    //                     type: true,
    //                     data: user,
    //                     token: user.token
    //                 }); 
    //             } else {
    //                 res.json({
    //                     type: false,
    //                     data: "Incorrect email/password"
    //                 });    
    //             }
    //         }
    //     });
    // });
    // app.post('/signin', function(req, res) {
    //     User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
    //         if (err) {
    //             res.json({
    //                 type: false,
    //                 data: "Error occured: " + err
    //             });
    //         } else {
    //             if (user) {
    //                 res.json({
    //                     type: false,
    //                     data: "User already exists!"
    //                 });
    //             } else {
    //                 var userModel = new User();
    //                 userModel.email = req.body.email;
    //                 userModel.password = req.body.password;
    //                 userModel.save(function(err, user) {
    //                     user.token = jwt.sign(user, "manabiru");

    //                     user.save(function(err, user1) {
    //                   console.log( user1 )
    //                         res.json({
    //                             type: true,
    //                             data: user1,
    //                             token: user1.token
    //                         });
    //                     });
    //                 })
    //             }
    //         }
    //     });
    // });

    // app.get('/me', ensureAuthorized, function(req, res) {
    //    console.log(req.token)
    //     User.findOne({token: req.token}, function(err, user) {

    //         if (err) {
    //             res.json({
    //                 type: false,
    //                 data: "Error occured: " + err
    //             });
    //         } else {
    //             res.json({
    //                 type: true,
    //                 data: user
    //             });
    //         }
    //     });
    // });
    // app.get('/countries',function(req, res) {
    //     country.find( function(err, countries) {
    //         if (err) {
    //             res.json({
    //                 type: false,
    //                 data: "Error occured: " + err
    //             });
    //         } else {
    //             if (countries) {

    //                res.json(countries); 
    //             }
    //         }
    //     });

    // });
    // app.get('/states/:countryId',function(req, res) {
    //     state.find({country_id:req.params.countryId}, function(err, states) {
    //         if (err) {
    //             res.json({
    //                 type: false,
    //                 data: "Error occured: " + err
    //             });
    //         } else {
    //             if (states) {

    //                res.json(states); 
    //             }

    //         }
    //     });

    // });
    // app.get('/cities/:state_id',function(req, res) {
    //     city.find({state_id:req.params.state_id}, function(err, cities) {
    //         if (err) {
    //             res.json({
    //                 type: false,
    //                 data: "Error occured: " + err
    //             });
    //         } else {
    //             if (cities) {

    //                res.json(cities); 
    //             }

    //         }
    //     });

    // });
    function ensureAuthorized(req, res, next) {
        var ip = (req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress).split(",")[0];

        console.log(ip)
        var bearerToken;
        var bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== 'undefined') {
            var bearer = bearerHeader.split(" ");
            bearerToken = bearer[1];

            jwt.verify(bearerToken, global.secret(), function (err, decoded) {
                if (err) {
                    res.sendStatus(403);
                } else {
                    // if everything is good, save to request for use in other routes
                    //  req.token = decoded;	
                    next();
                }
            });

        } else {
            res.sendStatus(403);
        }
    }



}