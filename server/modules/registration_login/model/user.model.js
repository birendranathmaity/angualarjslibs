var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    user_id:String,
    email: String,
    password: String,
    first_name: String,
    last_name:String,
    phone_number:String,
    gender:String,
    age:Number,
    dob:Date,
    user_status:String,
    user_role:String,
    profile_complete_status:String,
    email_vr: Boolean,
    phone_vr: Boolean,
    more_info_vr: Boolean,
    created_on:Date,
    created_by:String

});

module.exports = mongoose.model('dbusers', UserSchema);