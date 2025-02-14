const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const referralRoutes = require('./routes/referralRoutes');
const cors = require('cors');
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware setup
app.use(bodyParser.json());
app.use(cors());
app.use('/api/referral', referralRoutes);// Referral routes to handle the referral logic

app.get('/callback', (req, res) => {
  const authCode = req.query.code;
  if (!authCode) {
    return res.status(400).send('Authorization code is missing.');
  }
  res.send(`Authorization code received: ${authCode}`);
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
