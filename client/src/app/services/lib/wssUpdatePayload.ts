export const wssUpdatePayload = ({ apiKey, deviceId, params }) => {
  const timeStamp = (new Date()).getTime() / 1000;
  const sequence = Math.floor(timeStamp * 1000);
  const payload = {
    action: 'update',
    deviceid: `${deviceId}`,
    apikey: apiKey,
    selfApikey: apiKey,
    params,
    sequence,
    userAgent: 'app',
  };
  return JSON.stringify(payload);
};

