const { google } = require("googleapis");
const readline = require("readline");

const oauth2Client = new google.auth.OAuth2(
  "CLIENT_ID",
  "CLIENT_SECRET",
  "REDIRECT_URI"
);

const SCOPES = ["https://www.googleapis.com/auth/gmail.send"];


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getAccessToken = async () => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  console.log("Authorize this app by visiting this URL:", authUrl);

  rl.question("Enter the code from that page here: ", async (code) => {
    const { tokens } = await oauth2Client.getToken(code);
    console.log("Refresh Token:", tokens.refresh_token);
    rl.close();
  });
};

getAccessToken();
