/*
 *
 * PACKAGES
 *
 */
const { celebrate, Joi, Segments } = require('celebrate');

/**
 *
 */
exports.LoginValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

/**
 *
 */
exports.GetDeviceValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    at: Joi.string().required(),
    region: Joi.string().required(),
    deviceid: Joi.string().required(),
  }),
});

/**
 *
 */
exports.GetDevicesValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    at: Joi.string().required(),
    region: Joi.string().required(),
  }),
});
