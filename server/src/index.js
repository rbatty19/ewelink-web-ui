/*
 *
 * PACKAGES
 *
 */
const express = require('express');
const { json, urlencoded } = express;
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const { errors } = require('celebrate');
/*
 *
 * USE
 *
 */
app.use(morgan('dev'));
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(errors());

/**
 *
 * <> ROUTES
 *
 */
require('./components/ewelink/ewelink.routes')(app); // ewelink routes

app.listen(process.env.PORT || 4231, () => {
  console.log('connected');
});

module.exports = app;
