var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
var settingSchema   = new Schema({
    "user_id": String,
    "messgae": String,
    "contact":String,
    "photo":String,
    "create_on":Date
    
});
//settingSchema.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('settings', settingSchema);