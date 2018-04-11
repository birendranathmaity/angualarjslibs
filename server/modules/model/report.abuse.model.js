var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate-allowdiskuse');
var reportAbuseSchema   = new Schema({
    "user_id": String,
    "reportabuse_user_id": String,
    "reportabuse_status":String,
    "reason":Array,
    "message":String,
    "action_by":String,
    "created_on":Date,
    "recived_on":Date
});
reportAbuseSchema.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('reportabuses', reportAbuseSchema);