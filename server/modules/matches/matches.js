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

exports.get_pre_matches = function (req, res) {
    console.log(req.body)
var reqData=req.body.condition;
    var reqData2 = {
        age: [20, 50],
        height: 5.1,
        gender: "FEMALE",
        //countries:["101"],
        //states:["36","12","10"],
        //cities:["4460","706"],
        //maritualstatus:["SINGLE","ANNULLED"],
        mother_tounge: ["AF", "BN"],
     //   religion: ["Hinduism"],
        //caste:["Brahmin"],
        //postedBy:["SELF"],
        //heighestEducation:["No formal education","Secondary education","GED","Master's degree","Bachelor's degree"],
        //occupation:["1","2","3","5","4","9","6","7","8","71","16"],
        //annualIncome:[],
        //physicalStatus:["NORMAL"],
        //expectation:["ONLYMUMBAI","READY_TO_RELOCATE_OF_INDIA"]

    }

    var obj = {
        "user_status": { "$eq": "ACTIVE" },
        "age": { $lte: reqData.age[1], $gte: reqData.age[0] }
    };

    if (reqData.gender == "MALE") {
        obj["gender"] = "FEMALE";
        obj["userintrest.height"] = {
            $lte: reqData.height
        };

    }
    else {
        obj["gender"] = "MALE";
        obj["userintrest.height"] = {
            $gte: reqData.height
        };
    }
    for (var key in reqData) {
        if (reqData[key].length > 0) {

            if (key == "countries") {
                obj["basicinfos.country"] = { $in: reqData[key] };
            }
            if (key == "states") {
                obj["basicinfos.state"] = { $in: reqData[key] };
            }
            if (key == "cities") {
                obj["basicinfos.city"] = { $in: reqData[key] };
            }
            if (key == "maritualstatus") {
                obj["basicinfos.maritialstatus"] = { $in: reqData[key] };
            }
            if (key == "mother_tounge") {
                obj["basicinfos.mothertounge"] = { $in: reqData[key] };
            }
            if (key == "religion") {
                obj["basicinfos.religion"] = { $in: reqData[key] };
            }
            if (key == "caste") {
                obj["basicinfos.caste"] = { $in: reqData[key] };
            }
            if (key == "heighestEducation") {
                obj["usereducation.high_edu"] = { $in: reqData[key] };
            }
            if (key == "physicalStatus") {
                obj["userintrest.physical_status"] = { $in: reqData[key] };
            }
            if (key == "occupation") {
                obj["usereducation.occupation"] = { $in: reqData[key] };
            }


        }


    }
   // console.log(obj)
    var aggregate = User.aggregate([


        { $sort: { created_on: -1 } },
        //age//



        { $lookup: { from: "userbasicinfos", localField: "user_id", foreignField: "user_id", as: "basicinfos" } },


        { "$unwind": { "path": "$basicinfos", "preserveNullAndEmptyArrays": true } },





        { $lookup: { from: "countries", localField: "basicinfos.country", foreignField: "id", as: "country" } },

        { $lookup: { from: "states", localField: "basicinfos.state", foreignField: "id", as: "state" } },

        { $lookup: { from: "cities", localField: "basicinfos.city", foreignField: "id", as: "city" } },

        { $lookup: { from: "userphotos", localField: "user_id", foreignField: "user_id", as: "pic" } },
        { $lookup: { from: "userintrests", localField: "user_id", foreignField: "user_id", as: "userintrest" } },


        { "$unwind": { "path": "$userintrest", "preserveNullAndEmptyArrays": true } },



        // { "$unwind": { "path": "$pic", "preserveNullAndEmptyArrays": true } },
        //$or: [ { 'userintrest.expectation': { $in: reqData.expectation, $exists: true } },{'userintrest.expectation':{$exists: false}} ],

        { "$unwind": { "path": "$country", "preserveNullAndEmptyArrays": true } },

        { "$unwind": { "path": "$state", "preserveNullAndEmptyArrays": true } },

        { "$unwind": { "path": "$city", "preserveNullAndEmptyArrays": true } },
        { "$unwind": { "path": "$pic", "preserveNullAndEmptyArrays": true } },
        { $match: { $or: [{ 'pic.photo_type': { $eq: "PROFILE", $exists: true } }, { 'pic': { $exists: false } }] } },
        { $lookup: { from: "usereducations", localField: "user_id", foreignField: "user_id", as: "usereducation" } },


        { "$unwind": { "path": "$usereducation", "preserveNullAndEmptyArrays": true } },
        {
            $match: obj
        },

        {
            $project: {

                "_id": 1,

                "user_id": "$user_id",

                "first_name": "$first_name",

                "last_name": "$last_name",

                "age": "$age",

                "height": "$userintrest.height",

                "country": "$country.name",

                "state": "$state.name",

                "city": "$city.name",
                "maritualstatus": "$basicinfos.maritialstatus",
                "mothertounge": "$basicinfos.mothertounge",
                "religion": "$basicinfos.religion",
                "caste": "$basicinfos.caste",
                "heighestEducation": "$usereducation.high_edu",
                "physical_status": "$userintrest.physical_status",
                "pic": "$pic",
                "created_by":"$created_by",

                // pic: {
                //     $filter: {
                //         input: "$pic",
                //         as: "item",
                //         cond: { $eq: ["$$item.photo_type", "PROFILE"] }
                //     }
                // },
                "created_on": "$created_on"

            }
        }





    ]);
    var options = {
        page: req.body.page,
        limit: req.body.limit
    };
    User.aggregatePaginate(aggregate, options, function (err, results, pageCount, count) {
        if (err) {
            res.json(err);
            console.err(err)
        }
        else {
            var docs = {
                users: results,
                pages: pageCount,
                total: count

            };
            res.json(docs);
        }
    });


}