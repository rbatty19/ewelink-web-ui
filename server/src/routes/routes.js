

/*
 *
 * PACKAGES
 *
 */
const ewelink = require('ewelink-api');

module.exports = (app) => {

/*
<>
<> INSTANCES
<>
*/
let auth = '';
let connection = '';
let socket = '';

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email || password))
      return res.json({
        email: Boolean(email),
        password: Boolean(password),
      });

    connection = new ewelink({
      email,
      password,
      // region: zone,
    });

    const data = await connection.getCredentials();
    if (data.error) throw data.msg;
    res.send({ status: 200, error: false, data });
  } catch (error) {
    res.status(400).send({ status: 400, error: true, data: error });
  }
});

app.post('/devices', async (req, res) => {
  try {
    const { at, region } = req.body;

    connection = new ewelink({
      at,
      region,
    });

    const devices = await connection.getDevices();
    // console.log(devices);
    let report = [];

    for (const device of devices) {
      const status = await connection.getDevicePowerState(device.deviceid);
      report.push(
        Object.assign(status, { name: device.name, deviceid: device.deviceid, request: false }),
      );
    }

    res.send({ status: 200, error: false, data: report });
  } catch (error) {
    res.status(400).send({ status: 400, error: true, data: error });
  }
});

app.post('/device', async (req, res) => {
  try {
    const { at, region } = req.body;
    if (req.body.deviceid) {
      connection = new ewelink({
        at,
        region,
      });

      const status = await connection.getDevicePowerState(req.body.deviceid);
      // console.log(status);
      res.send({ status: 200, error: false, data: status });
    } else {
      res.status(400).send({
        status: 400,
        error: true,
        data: {
          body: {
            deviceid: req.body.deviceid,
          },
        },
      });
    }
  } catch (error) {
    res.status(400).send({ status: 400, error: true, data: error });
  }
});

// app.post('/setstatus', async (req, res) => {
//   if (req.query.state == 'on' || (req.query.state == 'off' && req.body.deviceid)) {
//     const status = await connection.setDevicePowerState(req.body.deviceid, req.query.state);
//     res.send({ status: 200, error: false, data: status });
//   } else {
//     res.send({
//       status: 400,
//       error: true,
//       data: {
//         query: {
//           state: req.query.state,
//         },
//         body: {
//           deviceid: req.body.deviceid,
//         },
//       },
//     });
//   }
// });

// app.post('/toggle', async (req, res) => {
//   if ('deviceid' in req.body) {
//     try {
//       const status = await connection.toggleDevice(req.body.deviceid);
//       res.send({ status: 200, error: false, data: status });
//     } catch (error) {
//       console.log(error)
//     }
//   } else {
//     res.send({
//       status: 400,
//       error: true,
//       data: {
//         message: 'deviceid is required',
//         body: {
//           deviceid: req.body.deviceid,
//         },
//       },
//     });
//   }
// });

app.get('/', (req, res) => {
  res.send({
    message: 'Welcome to Ewelink API REST for Ewelink Web UI',
  });
});

app.get('/ewecredentials', async (req, res) => {
  auth = await connection.getCredentials();

  console.log('access token: ', auth.at);
  console.log('api key: ', auth.user.apikey);
  console.log('region: ', auth.region);

  res.send({ auth, error: false });
});

app.listen(process.env.PORT || 4230, () => {
  console.log('connected');
});

module.exports = app;


}