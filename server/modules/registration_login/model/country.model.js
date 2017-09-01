var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var countriesSchema   = new Schema({
    id: String,
    sortname: String,
    name: String
});

module.exports = mongoose.model('countries', countriesSchema);