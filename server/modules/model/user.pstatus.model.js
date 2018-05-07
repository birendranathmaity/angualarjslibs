var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var uprofileStatusSchema   = new Schema({
    user_id:String,
    reason:String,
    status_type:String,
    created_on:Date,
    created_by:String

});

module.exports = mongoose.model('userprofilestatus', uprofileStatusSchema);