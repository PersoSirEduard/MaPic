const express = require('express');
const fs = require('fs');
const historyApiFallback = require('connect-history-api-fallback');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser')

const config = require('./config/config');

const isDev = process.env.NODE_ENV !== 'production';
const port  = process.env.PORT || 8081;

/* 
==================
  Configurations
==================
*/

// Set up Mongoose
mongoose.connect(isDev ? config.db_dev : config.db, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;

// Set up express
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '10mb'})); // Max 10 MB size GET & POST requests


// API routes
require('./routes')(app);

if (isDev) {
  app.use(historyApiFallback({
    verbose: false
  }));
  app.use(express.static(path.resolve(__dirname, '../dist')));

} else {
  app.use(express.static(path.resolve(__dirname, '../dist')));
  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'));
    res.end();
  });
}

app.listen(port, '0.0.0.0', (err) => { //Start express server
  if (err) {
    console.log(err);
  }

  console.info("API server is running! Open http://localhost:%s/ in your browser.", port);
});

module.exports = app;
