const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const sendReferralEmail = async (recipientEmail, referredBy, friendName) => {
  try {
    // OAuth2 Client setup with credentials
    const oauth2Client = new OAuth2(
      process.env.CLIENT_ID,  // Add your client ID from Google Developer Console
      process.env.CLIENT_SECRET, // Add your client secret from Google Developer Console
      process.env.REDIRECT_URI  // Add your redirect URI
    );

    // Set the refresh token (assumed that you already have a refresh token)
    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN, // Add your refresh token here
    });

    // Get access token from refresh token
    const accessToken = await oauth2Client.getAccessToken();

    // Setup Nodemailer transporter using OAuth2
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.SENDER_EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: recipientEmail,
      subject: "You've Been Referred!",
      text: `Dear ${friendName},\n\nWe are pleased to inform you that you have been referred to our service by ${referredBy}. We would like to invite you to join us and explore the benefits our platform has to offer.\n\nWe look forward to welcoming you aboard.\n\nBest regards,\nThe Accredian Team`,

    };

    await transporter.sendMail(mailOptions);
    console.log("Referral email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendReferralEmail;
