const nodemailer = require("nodemailer");
const mg = require('nodemailer-mailgun-transport');
const smtpTransport = require('nodemailer-smtp-transport');
const SMTPClient = require('emailjs').SMTPClient;

const client = new SMTPClient({
    host: "smtp.gmail.com",
    user: 'btechproject2022@gmail.com',
	pass: 'Btechproject2022!',
    ssl: true,
    port : 465
});

module.exports = async (email,firstName, subject, text) => {
	try {

		// const nodemailerMailgun = nodemailer.createTransport(mg(auth));

		// const nodemailerMailgun = nodemailer.createTransport(smtpTransport({
		// 	service: 'gmail',
		// 	host: 'smtp.gmail.com',
		// 	auth: {
		// 	  user: process.env.user,
		// 	  pass: process.env.pass
		// 	}
		//   }));

		  const emailBody = {
			from: "btechproject2022@gmail.com",
			to: email,
			subject: subject,
			attachment  : composeResetPasswordEmail(firstName,text),
		};

		  client.send(emailBody, (e) => {
			if (e && (e.code == 5 || e.smtp == undefined)){
				callback('emailjs is not setup correctly, did you set your env variables?');
			}   else{
				// callback(null);
			}
			});

		// await nodemailerMailgun.sendMail({
		// 	from: "btechproject2022@gmail.com",
		// 	to: email,
		// 	subject: subject,
		// 	text: text,
		// });


		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};


const composeResetPasswordEmail = function(username,url)
{
    
    var baseurl = process.env.NL_SITE_URL || 'https://hci-login.herokuapp.com/';

    var html = "<html><body>";
        html += "Hi "+username+",<br><br>";
        html += "Your username is <b>"+username+"</b><br><br>";
        //html += "<a href='"+baseurl+'/reset-password/'+o.unique_id+'/'+o.username+"'>Click here to reset your password</a><br><br>";
        console.log("During composeReset");
        html += "<a href='"+url+"'>Click here to reset your password</a><br><br>";
        html += "Cheers,<br>";
        html += "FakeBook";
        html += "</body></html>";
    return [{data:html, alternative:true}];
}