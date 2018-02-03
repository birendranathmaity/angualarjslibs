var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var searchbySchema = new Schema({
    user_id: String,
    age: Object,
    height: Object,
    maritialstatus: Array,
    mothertounge: Array,
    religion: Array,
    caste: Array,
    country: Array,
    state: Array,
    city: Array,
    physical_status: Array,
    complexion: Array,
    occupation: Array,
    aincome: Array,
    expectation: Array,
    high_edu: Array,
    body_type: Array,
    horoscope: Array,
    showprofile: Array,
    postedby: Array,
    dontshow: Array,
    created_on: Date,
    updated_on: Date


});

module.exports = mongoose.model('searches', searchbySchema);

