var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var intrestSchema   = new Schema({
    "user_id": String,
    "physical_status":String,
	"height": Number,
	"weight": String,
	"complexion": String,
	"body_type": String,
	"hobbie": String,
	"expectation": String
});

module.exports = mongoose.model('userintrests',intrestSchema);
