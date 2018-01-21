var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
var requestSchema   = new Schema({
    "user_id": String,
    "request_user_id": String,
    "request_status":String,
    "request_type":String,
    "request_action":String,
    "creater_response":String,
    "reciver_response":String,
    "created_on":Date,
    "recived_on":Date
});
requestSchema.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('requests', requestSchema);