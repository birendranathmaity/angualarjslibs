var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var session = require('express-session');
var serverConfig = require('./serverConfig.json');
const socketEvents = require('./socket'); 
var app = express();
app.set('superSecret', "dholbaaje.com.nikhil"); 
var global = require('./setGlobal');
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


process.on('uncaughtException', function(err) {
    console.log(err);
});
// app.listen(app.get('port'), function () {
//    console.log('Dholbaaje server Listening  on port ==> ' + serverConfig.SERVER_PORT);
// });

var io = require('socket.io').listen(app.listen(serverConfig.SERVER_PORT,function(){
    console.log('Dholbaaje server Listening  on port ==> ' + serverConfig.SERVER_PORT);

}));//Telling Express+Socket.io App To Listen To Port
global.setIo(io);
require('./connection');
require('./routes')(app,express,process);

new socketEvents(io).socketConfig();


//console.log(global.config.io)
// io.sockets.on("connection",function(socket){
//     socket.emit("Start_Chat");
//     socket.on("Send_msg",function(data){
//         io.sockets.emit("msg",data+" SANGITA ");
//         //Now Listening To A Chat Message
//      })
//     //On Event Registar_Name
//     // socket.on("Register_Name",function(data){
//     //     console.log("kkk")
//     //  //  io.sockets.emit("r_name","<strong>"+data+"</strong> Has Joined The Chat");
//     //    //Now Listening To A Chat Message
//     //    socket.on("Send_msg",function(data){
//     //    io.sockets.emit("msg",data+" SANGITA ");
//     //    //Now Listening To A Chat Message
//     // })
//     // })
// });

