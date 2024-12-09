const nodemailer = require("nodemailer");
const config = require("../config/config");
const transporter = nodemailer.createTransport({
  host: config.EMAIl.host,
  port: config.EMAIl.port,
  auth: {
    user: config.EMAIl.userName,
    pass: config.EMAIl.password,
  },
});

const setMailOption = (userEmail, subject, message) => {
  const mailOptions = {
    from: config.EMAIl.from,
    to: userEmail,
    subject: subject,
    message: message,
  };
  return mailOptions;
};
const sendEmail = async (userEmail, subject, message) => {
  try {
    const mailOptions = setMailOption(userEmail, subject, message);
    transporter.sendMail(mailOptions);
    console.log("sent successfully");
  } catch (err) {
    console.log("email not sent:", err);
  }
};
module.exports = { sendEmail };
