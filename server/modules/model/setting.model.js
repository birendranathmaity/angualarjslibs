var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
var settingSchema   = new Schema({
    "user_id": String,
    "messgae": Boolean,
    "contact":Boolean,
    "photo":Boolean,
    "create_on":Date
    
});
//settingSchema.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('settings', settingSchema);