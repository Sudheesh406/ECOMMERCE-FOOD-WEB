
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: "sudheeshunni406@gmail.com",
    pass: "qrbl fmeq pnrk wdlf",
  },
});
// qrbl fmeq pnrk wdlf


module.exports = transporter