var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var otpSchema   = new Schema({
    user_id:String,
    phone_number:String,
    otp:Number,
    otp_vr_status:String,
    otp_vr_type:String,
    created_on:Date,
    created_by:String,
    vr_on:Date


});

module.exports = mongoose.model('userotp', otpSchema);