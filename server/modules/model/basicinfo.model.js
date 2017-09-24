var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var basicInfoSchema   = new Schema({
    "user_id": String,
    "maritialstatus": String,
	"mothertounge": String,
	"religion": String,
	"caste": String,
	"subcaste": String,
	"gothram": String,
	"country": String,
	"state": String,
	"city": String,
	"updated_on":Date
});

module.exports = mongoose.model('userbasicinfos', basicInfoSchema);
