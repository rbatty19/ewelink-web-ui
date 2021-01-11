/*
 *
 * PACKAGES
 *
 */
const ewelink = require('ewelink-api');


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const connection = new ewelink({
      email,
      password,
    });

    const data = await connection.getCredentials();
    //
    if (data.error) throw data.msg;
    //
    res.send({ status: 200, error: false, data });
  } catch (error) {
    res.status(400).send({ status: 400, error: true, data: error });
  }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.GetDevice = async (req, res) => {
  try {
    const { at, region, deviceid } = req.body;
    if (deviceid) {
      const connection = new ewelink({
        at,
        region,
      });

      const status = await connection.getDevicePowerState(deviceid);

      res.send({ status: 200, error: false, data: status });
    } else {
      res.status(400).send({
        status: 400,
        error: true,
        data: {
          body: {
            deviceid,
          },
        },
      });
    }
  } catch (error) {
    res.status(400).send({ status: 400, error: true, data: error });
  }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.GetDevices = async (req, res) => {
  try {
    const { at, region } = req.body;

    const connection = new ewelink({
      at,
      region,
    });

    const devices = await connection.getDevices();

    let report = [];

    for (const device of devices) {
      report.push({
        name: device.name,
        deviceid: device.deviceid,    
        deviceInfo: device,
        state: device.params.params.switch
      });
    }

    res.send({ status: 200, error: false, data: report });
  } catch (error) {
    res.status(400).send({ status: 400, error: true, data: error });
  }
};
