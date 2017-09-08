var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var statesSchema   = new Schema({
    id: String,
    name: String,
    country_id: String
});

module.exports = mongoose.model('states', statesSchema);
