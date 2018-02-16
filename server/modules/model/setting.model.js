var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
var settingSchema   = new Schema({
    "user_id": String,
    "message": Boolean,
    "contact":Boolean,
    "photo":Boolean,
    "email":Boolean,
    notification:Boolean,
    "created_on":Date,
    "updated_on":Date
});
//settingSchema.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('settings', settingSchema);