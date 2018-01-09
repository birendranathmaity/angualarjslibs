var multer = require('multer');
var photoModel = require('./../model/user.photo.model');
var mainPath = require('./../../setGlobal');
const fs = require('fs');
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './upload_user_images/');
    },
    filename: function (req, file, cb) {

        // + file.originalname.split('.')[file.originalname.split('.').length -1]
        var datetimestamp = Date.now();
        // cb(null, req.query.user_id + '-' + "P" + '.jpg');

        cb(null, req.query.user_id + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
    }
});

var upload = multer({ //multer settings
    storage: storage
}).single('file');
//
exports.pPhotoUpload = function (req, res) {

    uploadPhoto(req, res);

};
function uploadPhoto(req, res) {
    var userphoto = req.query;
    photoModel.find({ user_id: userphoto.user_id, photo_type: userphoto.photo_type }, function (error, photo) {

        if (userphoto.photo_type === "ALBUM") {
            if (photo.length >= 8) {
                res.json({
                    success: false,
                    msg: "YOU CAN UPLOAD MAXIMUM 8 PHOTOS"
                });
                return;

            }
            else {
                actionPhotoInDB(req, res, "SAVE", '');
            }


        }
        if (userphoto.photo_type === "PROFILE") {

            if (photo.length > 0) {

                actionPhotoInDB(req, res, "UPDATE", photo[0].photo_path);


            }
            else {
                actionPhotoInDB(req, res, "SAVE", '');
            }
        }


    });
};


function actionPhotoInDB(req, res, actionType, oldPhoto) {

    if (actionType === "UPDATE") {

        var fullpath = mainPath.config.PATH + "/upload_user_images/" + oldPhoto;
        fs.unlink(fullpath, (err) => {
            if (err) throw err;
            console.log("deleted")
            imgeUp();
        });

    }
    else {
        imgeUp();

    }

    function imgeUp() {
        upload(req, res, function (err) {
            if (err) {
                res.json({ error_code: 1, err_desc: err });
                return;
            }

            if (req.query.user_id != req.query.uploaded_by) {
                req.query.photo_vr = true;

                req.query.photo_vr_msg = "APPROVED";
            }
            else {
                req.query.photo_vr = false;
                req.query.photo_vr_msg = "PENDING_APPROVAL";
            }

            var photoDetails = {
                user_id: req.query.user_id,
                photo_type: req.query.photo_type,
                photo_vr: req.query.photo_vr,
                photo_vr_msg: req.query.photo_vr_msg,
                photo_path: req.file.filename,
                uploaded_on: new Date(),
                photo_visibility_status: req.query.photo_visibility_status,
                photo_approved_on: new Date(),
                uploaded_by: req.query.uploaded_by
            };

            if (actionType === "SAVE") {
                saveUserPhoto(photoDetails, res)
            }
            if (actionType === "UPDATE") {
                updateUserPhoto(photoDetails, res)
            }

        });

    }


};
function saveUserPhoto(photo, res) {

    var photoM = new photoModel(photo);
    photoM.save(function (result) {
        res.json({
            success: true,
            error_code: 0,
            err_desc: null,
            pic: photo,
            msg: "uploaded successfull"
        });
    });
};
function updateUserPhoto(photo, res) {
    var data = {
        "photo_path": photo.photo_path,
        "photo_vr": photo.photo_vr,
        "photo_visibility_status": photo.photo_visibility_status,
        "uploaded_by": photo.uploaded_by,
        "photo_vr_msg": photo.photo_vr_msg,
        "uploaded_on": photo.uploaded_on,
    };
    photoModel.findOneAndUpdate({ "user_id": photo.user_id }, photo, { upsert: true }, function (err, doc) {
        if (err) return res.send(500, { error: err });

        res.json({
            success: true,
            error_code: 0,
            err_desc: null,
            pic: photo,
            msg: "uploaded successfull"
        });
    });




};

exports.getAlbum = function (req, res) {
  
    photoModel.find({ user_id: req.body.user_id, photo_type: req.body.photo_type }, 
        function (error, photos) {

res.json(photos);
        });
        
      
    
    };