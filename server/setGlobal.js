var io;
exports.config={
PATH:__dirname


};
exports.getIo = function (fname) {
    return io;
};

exports.setIo = function (iosocket) {
    io=iosocket;
};
exports.emit = function (eventname,data) {
    io.emit(eventname,data);
};
exports.secret = function () {
    var secret="dholbaaje.com.nikhil";
   return secret;
};