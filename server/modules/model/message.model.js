var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var messageSchema   = new Schema({
    "user_id": String,
    "message_status": String,
    "message_type": String,
	"message": String,
	"send_to":String,
    "send_on":Date,
    "recived_on":Date
});

module.exports = mongoose.model('messages', messageSchema);