var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var citiesSchema   = new Schema({
    id: String,
    name: String,
    state_id: String
});

module.exports = mongoose.model('cities', citiesSchema);
