var serviceConfig = require('./serviceConfig.json');
var regisLogin=require('./modules/registration_login/registration_login');
var Admin=require('./modules/admin/view_users');
module.exports = function(app,express,process){
   app.post(serviceConfig.AUTHENTICATE,regisLogin.authenticate);
   app.post(serviceConfig.SIGNIN,regisLogin.signin);
   app.post(serviceConfig.SIGNUP,regisLogin.signup);
   app.post(serviceConfig.LOGOUT,regisLogin.logout);
   app.post(serviceConfig.CHECKEMAILID,regisLogin.checkemail);
   app.post(serviceConfig.OTPVERIFY,regisLogin.verifyotp);
   app.post(serviceConfig.SAVEMOREINFO,regisLogin.savemoreinfo);
   app.get(serviceConfig.COUNTRIES,regisLogin.getcountries);
   app.get(serviceConfig.STATES,regisLogin.getstates);
   app.get(serviceConfig.CITIES,regisLogin.getcities);
   app.post(serviceConfig.USER_PROFILE_PHOTO_UPLOAD,regisLogin.pPhotoUpload);
//admin//////
 app.post(serviceConfig.GETALL_ACTIVE_USERS,Admin.getallActiveUsers);
app.get(serviceConfig.GETALL_INACTIVE_USERS,Admin.getallinActiveUsers);
app.post(serviceConfig.ADMIN_ACCEPT,Admin.adminAccept);

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
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}
   

   
}