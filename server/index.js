const express = require('express');
const { json, urlencoded } = express;
const app = express();
const morgan = require('morgan');
const QuickEncrypt = require('quick-encrypt');
const ewelink = require('ewelink-api');
const cors = require('cors');

const { privateKey, encryptedText } = require('./keys.json');
let [email, password] = String(QuickEncrypt.decrypt(encryptedText, privateKey)).split('|||');

// console.log(email, password)

const connection = new ewelink({
  email,
  password,
  // region: zone,
});

app.use(morgan('dev'));
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

let socket = '';
let auth = '';

(async () => {})();

app.get('/devices', async (req, res) => {
  try {
    const devices = await connection.getDevices();
    // console.log(devices, devices.length);
    let report = [];

    for (const device of devices) {
      const status = await connection.getDevicePowerState(device.deviceid);
      report.push(
        Object.assign(status, { name: device.name, deviceid: device.deviceid, request: false }),
      );
    }

    res.send({ status: 200, error: false, data: report });
  } catch (error) {
    res.send({ status: 400, error: true, data: error });
  }
});

app.post('/device', async (req, res) => {
  if (req.body.deviceid) {
    const status = await connection.getDevicePowerState(req.body.deviceid);
    console.log(status);
    res.send({ status: 200, error: false, data: status });
  } else {
    res.send({
      status: 400,
      error: true,
      data: {
        body: {
          deviceid: req.body.deviceid,
        },
      },
    });
  }
});

app.post('/setstatus', async (req, res) => {
  if (req.query.state == 'on' || (req.query.state == 'off' && req.body.deviceid)) {
    const status = await connection.setDevicePowerState(req.body.deviceid, req.query.state);
    res.send({ status: 200, error: false, data: status });
  } else {
    res.send({
      status: 400,
      error: true,
      data: {
        query: {
          state: req.query.state,
        },
        body: {
          deviceid: req.body.deviceid,
        },
      },
    });
  }
});

app.post('/toggle', async (req, res) => {
  if ('deviceid' in req.body) {
    try {
      const status = await connection.toggleDevice(req.body.deviceid);
      res.send({ status: 200, error: false, data: status });
    } catch (error) {
      console.log(error)
    }
  } else {
    res.send({
      status: 400,
      error: true,
      data: {
        message: 'deviceid is required',
        body: {
          deviceid: req.body.deviceid,
        },
      },
    });
  }
});

app.post('/test', async (req, res) => {
  try {
    // console.log(typeof socket)
    const { state } = await connection.getDevicePowerState('10008930f6');
    console.log(state);
    if (typeof socket != 'string')
      await socket.send(
        JSON.stringify({
          action: 'update',
          deviceid: '10008930f6',
          apikey: '6613294f-2a51-4c0c-9a88-9c5329959d82',
          userAgent: 'app',
          sequence: '1579309886515',
          ts: 0,
          params: { switch: state == 'on' ? 'off' : 'on' },
          tempRec: '10008930f6',
        }),
      );
    res.send({ msg: 'ok', error: false }).status(200);
  } catch (error) {
    console.log(error);
    res.send({ msg: 'error', error: true }).status(400);
  }
});

app.get('/ewecredentials', async (req, res) => {
  auth = await connection.getCredentials();

  console.log('access token: ', auth.at);
  console.log('api key: ', auth.user.apikey);
  console.log('region: ', auth.region);

  res.send({ auth, error: false });
});

app.get('/api', (req, res) => {
  const path = `/api/item/1`
  res.setHeader('Content-Type', 'text/html')
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate')
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`)
})


// app.listen(process.env.PORT || 4230, () => {
//   console.log('connected');
// });

module.exports = app