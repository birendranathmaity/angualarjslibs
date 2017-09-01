var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var session = require('express-session');
var serverConfig = require('./serverConfig.json');
var app = express();
app.set('superSecret', "dholbaaje.com.nikhil"); 
app.set('port', (process.env.PORT || serverConfig.SERVER_PORT));
//app.set('port', (process.env.PORT || serverConfig.SERVER_PORT));

// app.use(session({
//     cookie: { maxAge: 60000 },
//     secret: 'dholbaaje',
//     resave: false,
//     saveUninitialized: false
// }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});
require('./connection');
require('./routes')(app,express,process);

process.on('uncaughtException', function(err) {
    console.log(err);
});
app.listen(app.get('port'), function () {
   console.log('Dholbaaje server Listening  on port ==> ' + serverConfig.SERVER_PORT);
});


