var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var educationSchema   = new Schema({
    "user_id": String,
    "high_edu": String,
	"filed_study": String,
	"occupation": String,
	"company": String,
	"designation": String
});

module.exports = mongoose.model('usereducations',educationSchema);
