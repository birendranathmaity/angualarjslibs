var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var shareProfileSchema   = new Schema({
    user_id:String,
    receiver_email:String,
    share_id:String,
    name:String,
    msg:String,
    share_on:Date,


});

module.exports = mongoose.model('shareprofiles', shareProfileSchema);