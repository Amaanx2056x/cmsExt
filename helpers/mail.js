const nodemailer = require('nodemailer')
const {
  google
} = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  "Y819531127074-091c14shlrjq3l36kpk9mm5504fpjrcj.apps.googleusercontent.com", // ClientID
  "egNi3G328BlBn2hq0-Mf8LTz", // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);
oauth2Client.setCredentials({
  refresh_token: "1//04wK211BiDPw_CgYIARAAGAQSNwF-L9IrGB0Fpsv4vs_aXZWMFJh4ryZZRCVX0UH-ZcHPnghlpZX5K53RGXsHfjrfYYYsh1bUdQ0"
});
const accessToken = oauth2Client.getAccessToken()
module.exports = {

  welcomeMail: function(username, email, otp) {
    var welcomeBody =

    `<div style=" border-radius: 5px;color: white; background-color: black;">
    <center><h1>WELCOME TO TeamCMS</h1>
    <p>
    Hi ${username}, <br>We have received a request from ${email} for your CMS account. We are glad to have you here.
    </p>
    <p>
    HERE IS YOUR OTP:<b> ${otp}</b>.
    </p>
    <p>
    Do Not share this email or otp with Anyone.
    </p>
    <p>
    Click on the Link to verify your account:<br> <a style="color: cyan;" href="https://teamcms.herokuapp.com/verify">VERIFY MY ACCOUNT</a>
    </p>
    </center>
    <p align="right">
    Regards,<br>TeamCMS
    </p>
    </div>`


    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: "OAuth2",
        user: "teamcms01r@gmail.com",
        clientId: "Y819531127074-091c14shlrjq3l36kpk9mm5504fpjrcj.apps.googleusercontent.com",
        clientSecret: "egNi3G328BlBn2hq0-Mf8LTz",
        refreshToken: "1//04wK211BiDPw_CgYIARAAGAQSNwF-L9IrGB0Fpsv4vs_aXZWMFJh4ryZZRCVX0UH-ZcHPnghlpZX5K53RGXsHfjrfYYYsh1bUdQ0",
        accessToken: accessToken
      }
    });
    var mailOptions = {

      from: 'teamcms01r@gmail.com',
      to: email.toString(),
      subject: 'VERIFY YOUR ACCOUNT',
      html: welcomeBody
    }
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        req.flash('error_msg', 'UNABLE TO SEND REQUEST DUE TO SOME UNKNOWN ERROR, PLEASE TRY AGAIN LATER.')
        res.redirect('/')
      } else {

        req.flash('success_msg', `An e-mail with otp has been sent to ${email}`)
        res.redirect('/verify')
      }
    });

  },
  forgetMail: function (username, email, token) {
    var forgetBody =
    `<div style=" border-radius: 5px;color: white; background-color: black;">
    <center><h1>PASSWORD RESET REQUEST</h1>
    <p>
    Hi ${username}, We have received Password reset request from ${email} for your CMS account. If this wasn't you, check your Account for any suspicious activity and ignore the message.
    </p>
    <p>
    Password reset token:<b> ${token}</b>.
    </p>
    <p>
    Do Not share this email or token with Anyone.
    </p>
    <p>
    Click on the Link to reset Your Password:<br> <a style="color: cyan;" href="https://teamcms.herokuapp.com/https://teamcms.herokuapp.com/reset">RESET PASSWORD</a>
    </p>
    </center>
    <p align="right">
    Regards,<br>TeamCMS
    </p>
    </div>`
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'teamcms01r@gmail.com',
        pass: 'TeamCMS01r'
      }
    });
    var mailOptions = {

      from: 'teamcms01r@gmail.com',
      to: email.toString(),
      subject: 'RESET YOUR PASSWORD ',
      html: forgetBody
    }

    transporter.sendMail(mailOptions,
      function(error, info) {
        if (error) {
          req.flash('error_msg', 'UNABLE TO SEND REQUEST DUE TO SOME UNKNOWN ERROR, PLEASE TRY AGAIN LATER.')
          res.redirect('/forgot')
        } else {
          req.flash('success_msg', `An e-mail with Password Reset instructions had been sent to ${user.email}`)
          res.redirect('/forgot')
        }
      });

  },
  deleteMail: function (username,
    email) {
    var deleteBody =
    `<div style=" border-radius: 5px;color: white; background-color: black;">
    <center><h1>ACCOUNT DELETED</h1><p>
    Hi ${username}, we're sorry to see you go. This mail is sent to you to inform you that your account has been deleted.
    </p>
    </center><p align="right">
    Regards,<br>TeamCMS
    </p>

    </div>`

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'teamcms01r@gmail.com',
        pass: 'TeamCMS01r'
      }
    });

    var mailOptions = {

      from: 'teamcms01r@gmail.com',
      to: email.toString(),
      subject: 'ACCOUNT DELETED',
      html: deleteBody
    }
    transporter.sendMail(mailOptions,
      function(error, info) {
        if (error) {
          req.flash('error_msg', 'UNABLE TO SEND REQUEST DUE TO SOME UNKNOWN ERROR, PLEASE TRY AGAIN LATER.')
          res.redirect('/')
        } else {
          req.flash('success_msg',
            `Account was deleted successfully!`)
          res.redirect('/login')
        }
      });

  }

}