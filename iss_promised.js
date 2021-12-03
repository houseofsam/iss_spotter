const request = require('request-promise-native');

const fetchMyIP = function() {
  return request(`https://api64.ipify.org?format=json`);
}

const fetchCoordsByIP = function(body) {
  let ip = JSON.parse(body).ip;
  return request(`https://api.freegeoip.app/json/${ip}?apikey=40097d30-53fa-11ec-b3c6-bb0cf5babb06`);
}

const fetchISSFlyOverTimes = function(body) {
  const { longitude , latitude } = JSON.parse(body);
  return request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
}

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((body) => {
      const { response } = JSON.parse(body);
      return response
    });
};


module.exports = { nextISSTimesForMyLocation };