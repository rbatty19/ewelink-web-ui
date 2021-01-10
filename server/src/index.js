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

/*
 *
 * USE
 *
 */
app.use(morgan('dev'));
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

/**
 *
 * <> ROUTES
 *
 */
require('./routes/routes')(app);

app.listen(process.env.PORT || 4231, () => {
  console.log('connected');
});

module.exports = app;
