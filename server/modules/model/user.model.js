var mongoose     = require('mongoose');
mongoose.Promise = global.Promise;
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate-allowdiskuse');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    user_id:String,
    email: String,
    password: String,
    first_name: String,
    last_name:String,
    country_code:String,
    phone_number:String,
    gender:String,
    age:Number,
    dob:Date,
    user_status:String,
    user_role:String,
    profile_complete_status:String,
    email_vr: Boolean,
    phone_vr: Boolean,
    more_info_vr: Boolean,
    online:String,
    socket_id:String,
    created_on:Date,
    created_by:String,
    updated_on:Date,
    uploaded_by:String,
    admin_action_on:Date


});

UserSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('dbusers', UserSchema);