/*
 *
 * PACKAGES
 *
 */
const ewelink = require('ewelink-api-fixed');
const CryptoJS = require("crypto-js");

const app_keys = {
  APP_ID: 'oeVkj2lYFGnJu5XUtWisfW4utiN4u9Mq',
  APP_SECRET: '6Nz4n0xA8s8qdxQf2GqurZj2Fs55FUvM',
};

function decryptData(data) {

  try {
    const bytes = CryptoJS.AES.decrypt(data, 'ewelink');
    if (bytes.toString()) {
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    return data;
  } catch (e) {
    console.log(e);
  }
}

/**
 *
 * @param {*} req
 * @param {*} res
 */
exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const pass = decryptData(password)
    console.log([password, pass])

    const connection = new ewelink({
      email,
      password: pass,
      // ...app_keys,
    });

    const data = await connection.getCredentials();

    if (Number.isInteger(data?.error)) throw data;

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
        ...app_keys,
      });

      const status = await connection.getDevice(deviceid);
      // console.log(status);

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
    //
    const connection = new ewelink({
      at,
      region,
      ...app_keys,
    });
    //
    const devices = await connection.getDevices();
    //
    let report = [];
    //
    try {
      for (const device of devices) {
        let deviceToAdd = {
          name: device.name,
          deviceid: device.deviceid,
          deviceInfo: device,
          online: device.online,
          request: false, // used in socket wsp
          showBrand: device.showBrand,
        };
        //
        if (device?.tags?.ck_channel_name) {
          let deviceChannels = [];
          // [{ '0': '<NAME>', '1': '<NAME>' }]
          // console.log(device.tags.ck_channel_name)
          Object.values(device.tags.ck_channel_name).forEach((channel, index) => {
            // console.log(channel)
            deviceChannels.push({
              name: channel,
              parentName: device?.name,
              parentDeviceId: device?.deviceid,
              channel: index,
              switch: device?.params?.switches[index].switch,
              state: device?.params?.switches[index].switch === 'on',
            });
          });
          deviceToAdd = {
            ...deviceToAdd,
            isMultipleChannelDevice: true,
            deviceChannels,
          };
        } else if (device?.params?.switches?.length) {
          let deviceChannels = [];
          // 
          Object.values(device?.params?.switches).forEach((channel, index) => {
            deviceChannels.push({
              name: index,
              parentName: device?.name,
              parentDeviceId: device?.deviceid,
              channel: index,
              switch: device.params.switches[index].switch,
              state: device.params.switches[index].switch === 'on',
            });
          });
          deviceToAdd = {
            ...deviceToAdd,
            isMultipleChannelDevice: true,
            deviceChannels,
          };
        } else {
          deviceToAdd = {
            ...deviceToAdd,
            isMultipleChannelDevice: false,
            switch: device.params.switch,
            // Device is turned off, it's offline
            state: !device.online ? false : device.params.switch === 'on',
          };
        }
        //
        // console.log(deviceToAdd)
        report.push(deviceToAdd);
      }
    } catch (error) {
      console.error(error);
    }

    //
    if (devices?.error) {
      throw 'authorization error';
    }

    res.send({
      status: 200,
      error: false,
      data: report,
      devicesRaw: devices,
    });
    //
  } catch (error) {
    res.status(400).send({ status: 400, error: true, data: error });
  }
};
