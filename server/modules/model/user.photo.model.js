var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var userPhotoSchema   = new Schema({
    user_id:String,
    photo_type:String,
    photo_vr:Boolean,
    photo_path:String,
    uploaded_on:Date,
    photo_visibility_status:Boolean,
    photo_vr_msg:String,
    photo_approved_on:Date,
    uploaded_by:String,
    action_by:String

});

module.exports = mongoose.model('userphotos', userPhotoSchema);