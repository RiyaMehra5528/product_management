const path=require('path')
// const ejs=require('ejs')

const nodemailer = require("nodemailer");
const e = require('express');
 let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "riyamehra5528@gmail.com", // generated ethereal user
      pass: "mviajbszcxtapcmn", // generated ethereal password
    },
  });

 async function sendMail(email,password){
    try {
        // const html= await ejs.renderFile(path.join(__dirname,'../views/welcome.ejs'))
        let info = await transporter.sendMail({
          from: "riyamehrsignupa5528@gmail.com", // sender address
          to:email, // list of receivers
          subject: "RESET PASSWORD ✔", // Subject line
          text: `Here's your new password:${password}`, // plain text body
        //   html: html, // html body
        });
        console.log(info)
    } catch (error) {
        console.log(error)
    }
  }

  module.exports=sendMail;