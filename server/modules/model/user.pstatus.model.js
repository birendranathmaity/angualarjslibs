var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var uprofileStatusSchema   = new Schema({
    user_id:String,
    email_vr:Boolean,
    phone_vr:Boolean,
    more_info_vr:Boolean,
    created_on:Date,
    created_by:String

});

module.exports = mongoose.model('userprofilestatus', uprofileStatusSchema);