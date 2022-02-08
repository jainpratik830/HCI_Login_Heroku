const nodemailer = require("nodemailer");
const mg = require('nodemailer-mailgun-transport');
const smtpTransport = require('nodemailer-smtp-transport');


module.exports = async (email, subject, text) => {
	try {

		// const nodemailerMailgun = nodemailer.createTransport(mg(auth));

		const nodemailerMailgun = nodemailer.createTransport(smtpTransport({
			service: 'gmail',
			host: 'smtp.gmail.com',
			auth: {
			  user: process.env.user,
			  pass: process.env.pass
			}
		  }));


		await nodemailerMailgun.sendMail({
			from: "btechproject2022@gmail.com",
			to: email,
			subject: subject,
			text: text,
		});


		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};
