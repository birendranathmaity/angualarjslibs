var OTP = require('./../model/user.otp.model');
const SendOtp = require('sendotp');
const sendOtp = new SendOtp('201808AmER6ZGlyztE5aa25775','From www.dholbaaje.com otp is {{otp}}');


exports.sendOtpNumber=function(mobile_number,otp,success){
    sendOtp.send(mobile_number, "DHOLBAAJE",otp, function (error, data, response) {

      success(data);
});
};
exports.verifyOtpNumber=function(mobile_number,otp){
    sendOtp.verify(mobile_number, otp, function (error, data, response) {
  console.log(data); // data object with keys 'message' and 'type'
  if(data.type == 'success') console.log('OTP verified successfully')
  if(data.type == 'error') console.log('OTP verification failed')
});
};
exports.retryOtpNumber=function(mobile_number){
  sendOtp.retry(mobile_number, false, function (error, data, response) {
  console.log(data);
});
};

