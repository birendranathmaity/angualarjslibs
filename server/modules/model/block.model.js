var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
var blockSchema   = new Schema({
    "user_id": String,
    "block_status": String,
    "block_user_id":String,
    "created_on":Date,
    "updated_on":Date
    
});
blockSchema.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('userblocks', blockSchema);