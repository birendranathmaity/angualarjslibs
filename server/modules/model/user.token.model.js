var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var tokenSchema   = new Schema({
    user_id:String,
    socket_id:String,
    online:String,
    token:String,
    token_status:String,
    created_on:Date
   

});

module.exports = mongoose.model('usertokens', tokenSchema);