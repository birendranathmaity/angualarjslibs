var jwt = require('jsonwebtoken');
var country = require('./../model/country.model');
var state = require('./../model/state.model');
var city = require('./../model/city.model');
var User = require('./../model/user.model');
var Token = require('./../model/user.token.model');
var OTP = require('./../model/user.otp.model');
var USER_P_STATUS = require('./../model/user.pstatus.model');
var basicInfo = require('./../model/basicinfo.model');
var education = require('./../model/education.model');
var interest = require('./../model/intrest.model');
var family = require('./../model/family.model');
var otpConfig = require('./otp');
//
exports.authenticate = function (req, res) {
    User.findOne({
        email: req.body.email,
        password: req.body.password
    }, function (err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user) {

                res.json({
                    type: true,
                    data: user,
                    token: user.token
                });
            } else {
                res.json({
                    type: false,
                    data: "Incorrect email/password"
                });
            }
        }
    });

};


exports.signup = function (req, res) {

    User.count().then((count) => {


        User.findOne({
            email: req.body.email,
            password: req.body.password
        }, function (err, user) {
            if (err) {
                res.json({
                    type: false,
                    data: "Error occured: " + err
                });
            } else {
                if (user) {
                    UpdateUser(req, res);
                } else {
                    var userNumber = 1 + count;
                    var UserId = "DB227" + userNumber;
                    req.body.created_on = new Date();
                    req.body.user_id = UserId;
                    req.body.email_vr = false;
                    req.body.phone_vr = false;
                    req.body.more_info_vr = false;
                    saverUser(req.body, res);
                }
            }
        });




    });


};
function UpdateUser(req, res) {
    req.body.updated_on = new Date();
    User.update({ user_id: req.body.user_id }, req.body, function (err, user) {

        res.json({
            success: true,
            data: "User updated"
        });
    });
}
function saverUser(user, res) {

    var userModel = new User(user);

    userModel.save(function (err, user) {
        //  saveUserProfileStatus(user.user_id, {email_vr: false, phone_vr: false,more_info_vr: false});
        afterUserSave(user, res)
    });

};
function afterUserSave(user, res) {

    if (user.created_by === "ADMIN") {

        res.json({
            success: true,
            user: user
        });
    }
    else {
        createToken(res, user);
        createOtp(user, "PHONE_NUMBER_VR");
        // otpConfig.sendOtpNumber("917330734341");
    }

};
function tokenId(user) {
    return jwt.sign(user, "dholbaaje.com.nikhil");
};
function createToken(res, user) {
    var token_Id = tokenId(user);
    var tokenDetails = {
        token: token_Id,
        created_on: new Date(),
        token_status: "VALID"
    };
    Token.findOneAndUpdate({ user_id: user.user_id }, tokenDetails, { new: true }, function (err, tokenData) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (tokenData) {
                res.json({
                    success: true,
                    token_updated: true,
                    token: tokenData.token
                });
            } else {
                tokenDetails.user_id = user.user_id;
                var tokenModel = new Token(tokenDetails);
                tokenModel.save(function (err, details) {
                    res.json({
                        success: true,
                        token_created: true,
                        token: details.token
                    });
                });
            }
        }

    });
};

function createOtp(user, vrType) {
    var otp = 12345;
    //172595AQbcw8YLo59a90f6d
    var otpDetails = {
        user_id: user.user_id,
        otp: otp,
        phone_number: user.phone_number,
        otp_vr_status: "SENT",
        otp_vr_type: vrType,
        created_on: new Date()

    };




    OTP.findOne({ user_id: user.user_id }, function (err, otpData) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {


            if (!otpData) {
                var OTPMODEL = new OTP(otpDetails);
                OTPMODEL.save(function (err, details) { });
            }
        }

    });

};
function updateMoreInfo(req, res) {
    req.body.basicinfo.updated_on = new Date();
    req.body.educationwork.updated_on = new Date();
    req.body.intrests.updated_on = new Date();
    req.body.family.updated_on = new Date();
    basicInfo.update({ user_id: req.body.user_id }, req.body.basicinfo, function (err, resultbasicinfo) {

        education.update({ user_id: req.body.user_id }, req.body.educationwork, function (err, resulteducationwork) {

            interest.update({ user_id: req.body.user_id }, req.body.intrests, function (err, resultintrests) {
                family.update({ user_id: req.body.user_id }, req.body.family, function (err, resultfamily) {
                    if (err) {
                        return res.send();
                    }

                    res.json({
                        success: true,
                        msg: "User moreinfo updated!"
                    });

                });
            });
        });



    });
}
exports.savemoreinfo = function (req, res) {
    basicInfo.findOne({
        user_id: req.body.user_id
    }, function (err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user) {

                updateMoreInfo(req, res);

            } else {
                req.body.basicinfo.user_id = req.body.user_id;
                req.body.basicinfo.created_on = new Date();
                var basicInfoModel = new basicInfo(req.body.basicinfo);

                basicInfoModel.save(function (err, basicinfo) {
                    req.body.educationwork.user_id = req.body.user_id;
                    req.body.educationwork.created_on = new Date();
                    var educationModel = new education(req.body.educationwork);
                    educationModel.save(function (err, education) {
                        req.body.intrests.user_id = req.body.user_id;
                        req.body.intrests.created_on = new Date();
                        var interestModel = new interest(req.body.intrests);
                        interestModel.save(function (err, interest) {
                            req.body.family.user_id = req.body.user_id;
                            req.body.family.created_on = new Date();
                            var familyModel = new family(req.body.family);

                            familyModel.save(function (err, family) {
                                var update = {

                                    more_info_vr: true
                                };


                                UserProfileUpdate(req.body.user_id, update, res);


                            });


                        });

                    });


                });
            }
        }
    });
};

exports.checkemail = function (req, res) {
    User.find({
        email: req.body.email
    }, function (err, emails) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (emails.length > 0) {

                res.json({
                    success: true
                });
            } else {
                res.json({
                    success: false
                });
            }
        }
    });
};
exports.verifyotp = function (req, res) {
    OTP.findOneAndUpdate({
        otp: req.body.otp,
        user_id: req.body.user_id
    }, {
            otp_vr_status: "SUCCESS",
            vr_on: new Date()
        }, {
            new: true
        }, function (err, result) {
            if (err) {
                res.json({
                    type: false,
                    data: "Error occured: " + err
                });
            } else {

                if (result) {


                    var update = {
                        phone_vr: true
                    };
                    UserProfileUpdate(req.body.user_id, update, res);


                }
                else {
                    res.json({
                        success: false,
                        msg: "Invalid otp"
                    });
                }

            }
        });
};
function UserProfileUpdate(userId, update, res) {
    User.findOneAndUpdate({
        user_id: userId
    }, update, {
            new: true
        }, function (err, user) {

            res.json({
                success: true,
                user: user

            });
            // if(user.created_by==="ADMIN"){
            //         res.json({
            //         success: true,
            //         msg: ""
            //     });
            // }
            // else{
            //    createToken(res, user);
            // }


        });
};
// function saveUserProfileStatus(user_id, updateData) {
//     USER_P_STATUS.findOne({
//         "user_id": user_id
//     }, updateData, {
//         new: true
//     }, function(err, userPStatus) {
//         if (err) {
//             res.json({
//                 type: false,
//                 data: "Error occured: " + err
//             });
//         } else {
//            // if (userPStatus) {
//                 updateData.user_id = user_id;
//                 var ststus = new USER_P_STATUS(updateData);
//                 ststus.save(function(err) {});


//           //  }

//         }
//     });


// };
exports.signin = function (req, res) {

    User.findOne({
        email: req.body.email,
        password: req.body.password
    }, function (err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user) {

                if (!user.phone_vr) {

                    createOtp(user, "PHONE_NUMBER_VR");
                }
                createToken(res, user);


            }
            else {
                res.json({
                    success: false,
                    msg: "Invalid username/password"
                });
            }
        }
    });
};
function afterSignIn(user, res) {



};
// function userProfileStatusCheccker(user,res){
//  USER_P_STATUS.findOne({
//         "user_id": user.user_id
//     },  function(err, userPStatus) {
//         if (err) {
//             res.json({
//                 type: false,
//                 data: "Error occured: " + err
//             });
//         } else {

// if(!userPStatus.phone_vr){
// createOtp(user.phone_number, userPStatus.user_id,"PHONE_NUMBER");
// }

// Token.findOneAndUpdate({
//         "user_id": user.user_id
//     }, {
//         token:tokenId({user:user,user_p_status:userPStatus}),
//         token_status:"VALID",
//         created_on:new Date()
//     }, {
//         new: true
//     }, function(err, tokendetails) {
//      res.json({
//      success:true,
//      token:tokendetails.token
// });

//     });

//         }
//     });
// };

exports.logout = function (req, res) {
    Token.findOneAndUpdate({ user_id: req.body.user_id }, { token_status: "INVALID" }, { new: true }, function (err, tokenData) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (tokenData) {
                res.json({
                    success: true

                });
            }
        }
    });

};
exports.getcountries = function (req, res) {
    country.find(function (err, countries) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (countries) {

                res.json(countries);
            }
        }
    });
};
exports.getstates = function (req, res) {
    state.find({
        country_id: req.params.countryId
    },{_id: 0}, function (err, states) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (states) {

                res.json(states);
            }

        }
    });
};
exports.getcities = function (req, res) {
    city.find({
        state_id: req.params.state_id
    },{_id: 0}, function (err, cities) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (cities) {

                res.json(cities);
            }

        }
    });
};
exports.getUserLocation = function (req, res) {
    country.aggregate([
        {
            "$match": {
                "id": { "$eq": req.params.country_id }

            }
        },
        { $lookup: { from: "states", localField: "id", foreignField: "country_id", as: "state" } },
        { "$unwind": { "path": "$state", "preserveNullAndEmptyArrays": true } },



        {
            "$match": {
                "state.id": { "$eq": req.params.state_id }

            }
        },
        { $lookup: { from: "cities", localField: "state.id", foreignField: "state_id", as: "city" } },
        { "$unwind": { "path": "$city", "preserveNullAndEmptyArrays": true } },
        {
            "$match": {
                "city.id": { "$eq": req.params.city_id }

            }
        },

    ], function (err, location) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (location.length > 0) {

                res.json(location[0]);
            }
            else {
                res.json(null);
            }

        }
    });
};