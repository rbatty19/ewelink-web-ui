/*
 *
 * IMPORTS
 *
 */
const { Login, GetDevices, GetDevice } = require('./ewelink.controller');
const { LoginValidator, GetDevicesValidator, GetDeviceValidator } = require('./ewelink.validator');

module.exports = (app) => {
  app.post('/login', LoginValidator, Login);
  app.post('/devices', GetDevicesValidator, GetDevices);
  app.post('/device', GetDeviceValidator, GetDevice);
};
