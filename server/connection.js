// DB var defined
var serverConfig = require('./serverConfig.json');
var mongoose = require('mongoose');
mongoose.connect(serverConfig.DATABASE_URL+"/"+serverConfig.DATABASE);
var db = mongoose.connection;
mongoose.Promise = global.Promise;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});