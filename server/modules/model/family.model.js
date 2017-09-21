var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var familySchema   = new Schema({
    "user_id": String,
    "country_code": String,
	"beleave_hor": Boolean,
	"manglik": Boolean,
	"father": String,
	"father_occupation": String,
	"mother": String,
	"siblings": String,
	"mosal": String,
	"address": String,
	"phone_number":String,
	"city": String,
	"native_place":String,
	"place_birth": String,
	"time_birth_min": Number,
	"time_birth_hr": Number,
	"zodiac": String,
	"horoscope": String,
	"aincome": String
});

module.exports = mongoose.model('userfamilies',familySchema);
