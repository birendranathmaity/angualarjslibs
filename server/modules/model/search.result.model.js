var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
var sResultsSchema   = new Schema({
    user_id: String,
    name: String,
    fields:Object,
    created_on:Date,
    updated_on:Date
});
sResultsSchema.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('searchresults', sResultsSchema);