'use strict';
var nodemailer = require('nodemailer');
var handlebars = require('handlebars');
var fs = require('fs');
//var smtpTransport = require("nodemailer-smtp-transport");
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'dholbaaje1@gmail.com',
      pass: 'hinikhil123#@'
    }
  });
// var transporter = nodemailer.createTransport(smtpTransport({
//     host: '192.169.136.224',
//     pool: true,
//     port: 25,
//     direct:true,
//     secure: false, // use TLS
//        auth: {
//       user: 'dholbaaje1@gmail.com',
//       pass: 'hinikhil123#@'
//     }
// }));

  // var mailOptions = {
  //   from: 'dholbaaje@dholbaaje.com',
  //   to: "birendranathmaity@gmail.com",
  //   subject: 'bbbbbbbbbbbbbbbbbbbbbbbb',
  //   body:"hello"
  // };
  //     transporter.sendMail(mailOptions, function (error, response) {
  //        if (error) {
  //     console.log(error);
  //   } else {
  //     console.log('Email sent: ');
  //   }
  //     });
 var email={};
 var readHTMLFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
           // callback(err);
        }
        else {
            callback(null, html);
        }
    });
};

 email.readTemplate=function(config,success){
 config.data=config.data || null;
    readHTMLFile(__dirname + '/tpls/'+config.tpl, function(err, html) {
        var template = handlebars.compile(html);
        var replacements =config.data;
        var htmlToSend = template(replacements);
        success(htmlToSend);
    
    });

 }

    var mailOptions = {
        from: 'dholbaaje1@gmail.com',
        to: "birendranathmaity@gmail.com",
        subject: '',
        html : ""
      };

    //   config={
    //       to,type,data
    //   }
    email.send=function(config,success){
        var tpl="";
        if(config.type==="SENDOTP"){
             tpl="otp.html";
        }
        var subject="Dholbaaje Verification OTP";
        config.tpl=tpl;
        email.readTemplate(config,function(template){
            mailOptions.html=template;
            mailOptions.subject=subject;
            mailOptions.to=config.to;
            transporter.sendMail(mailOptions, function (error, response) {
                if (error) {
             console.log(error);
           } else {
            success(true)
           }
             });


        });
        
        
         }
//s192-169-136-224.secureserver.net
// var transporter = nodemailer.createTransport(smtpTransport({
//     host: '192.169.136.224',
//     pool: true,
//     port: 25,
//     secure: false, // use TLS
    
// }));
// const xoauth2 = require('xoauth2');
// var transporter = nodemailer.createTransport("SMTP", {
//     service: "Gmail",
//     auth: {
//         xoauth2: xoauth2.createXOAuth2Generator({
//             user: "birendranathmaity@gmail.com",
//             pass: "manabiru123#"
//         })
//     }
    
// });
// let smtp_options = {
//     pool: true,
//     host: 'smtp.dholbaaje.com',
//     port: 25,
//     secure: true, // use TLS
//     auth: {
//         user: '',
//         pass: ''
//     }
// };
// //var transport = nodemailer.createTransport("SMTP", {smtp_options});
// transporter.verify(function(error, success) {
//     if (error) {
//          console.log(error);
//     } else {
//          console.log('Server is ready to take our messages');
//     }
//  });

//   // setup email data with unicode symbols
//   let mailOptions = {
//     from: 'birendranathmaity@gmail.com', // sender address
//     to: 'birendranathmaity@gmail.com', // list of receivers
//     subject: 'Hello ✔', // Subject line
//     text: 'Hello world?', // plain text body
//     html: '<b>Hello world?</b>' // html body
// };

// // send mail with defined transport object
// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         return console.log(error);
//     }
//     console.log('Message sent: %s', info.messageId);
//     // Preview only available when sending through an Ethereal account
//     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

//     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
//     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// });
module.exports = email;