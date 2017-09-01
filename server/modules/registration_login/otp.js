var OTP = require('./model/user.otp.model');
const SendOtp = require('sendotp');
const sendOtp = new SendOtp('172595AQbcw8YLo59a90f6d','Dholbaaje.com for your mobile verificationnumber is {{otp}}');


exports.sendOtpNumber=function(mobile_number){
    sendOtp.send(mobile_number, "PRIIND", function (error, data, response) {

  
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

