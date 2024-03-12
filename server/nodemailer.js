const nodemailer = require('nodemailer');


//nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'danamil2022',
      pass: 'fgwn zvrn ftuf bybz',
    },
  });

  module.exports.transporter = transporter;