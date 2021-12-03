const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss");

// fetchMyIP((err, ip) => {
//   if (err) {
//     console.log('It didn\'t work!', err);
//     return;
//   }

//   console.log('It worked! Returned IP:', ip);
// });


// fetchCoordsByIP('198.54.132.101', (err, coords) => {
//   if (err) {
//     console.log("It didn't work!", err);
//     return;
//   }

//   console.log("It worked! Returned coordinates:", coords);
// });


// let coords = {latitude: 43.6227, longitude: -79.3892};

// fetchISSFlyOverTimes(coords, (err, times) => {
//   if (err) {
//     console.log("It didn't work!", err);
//     return;
//   }

//   console.log("It worked! Returned flyover times:", times);
// });
