'use strict';
const fs = require('fs');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('express-cors');
const jwt = require('express-jwt');

const app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true ,limit: '50mb' }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
  allowedOrigins: ['*.forestadmin.com'],
  headers: ['Authorization', 'X-Requested-With', 'Content-Type'],
  credentials: true
}));

app.use(jwt({
  secret: process.env.FOREST_AUTH_SECRET,
  credentialsRequired: false
}));

fs.readdirSync('./routes').forEach((file) => {
  if (file !== '.gitkeep') {
    app.use('/forest', require('./routes/' + file));
  }
});

app.use(require('forest-express-sequelize').init({
  modelsDir: __dirname + '/models',
  envSecret: process.env.FOREST_ENV_SECRET,
  authSecret: process.env.FOREST_AUTH_SECRET,
  sequelize: require('./models').sequelize
}));

// console.log(NODE_ENV)

module.exports = app;
