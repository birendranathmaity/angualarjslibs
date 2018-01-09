var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
var messageSchema   = new Schema({
    "user_id": String,
    "message_status": String,
    "message_type": String,
    "message": String,
    "creater_response":String,
    "reciver_response":String,
	"send_to":String,
    "send_on":Date,
    "recived_on":Date
});
messageSchema.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('messages', messageSchema);