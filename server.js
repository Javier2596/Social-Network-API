const express = require('express');
const db = require('./config/connection');

const { Social } = require('./models');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//get function for getting all data in model?
app.get('/all-socials', (req, res) => {
  Social.find({}, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(result);
    }
  });
});

//get aggregate function goes here
app.get();

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
