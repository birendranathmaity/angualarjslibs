var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var whocanviewSchema   = new Schema({
    user_id: String,
    fields:Object,
    created_on:Date,
    updated_on:Date
});
module.exports = mongoose.model('whocanviews', whocanviewSchema);