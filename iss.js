/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');


const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request(`https://api64.ipify.org?format=json`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null);
    }

    const data = JSON.parse(body);

    return callback(null, data.ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://api.freegeoip.app/json/${ip}?apikey=40097d30-53fa-11ec-b3c6-bb0cf5babb06`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      return callback(Error(msg), null);
    }

    const data = JSON.parse(body);
    const coords = {
      latitude: data.latitude,
      longitude: data.longitude
    };
    return callback(null, coords);

    // Another way of doing the above.
    // const { latitude, longitude } = JSON.parse(body);
    // callback(null, { latitude, longitude });


  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS pass times. Response: ${body}`;
      return callback(Error(msg), null);
    }

    const risetimeArr = JSON.parse(body).response;
    callback(null, risetimeArr);

  });
  
};


/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */ 
 const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((err, ip) => {
    if (err) {
      return callback(err, null);
    }
  
    // console.log('It worked! Returned IP:', ip);
    fetchCoordsByIP(ip, (err, coords) => {
      if (err) {
        return callback(err, null);
      }
    
      // console.log("It worked! Returned coordinates:", coords);
      fetchISSFlyOverTimes(coords, (err, times) => {
        if (err) {
          return callback(err, null);
        }
      
        // console.log("It worked! Returned flyover times:", times);
        return callback(null, times);
      });
    });
  });
}


module.exports = { nextISSTimesForMyLocation };