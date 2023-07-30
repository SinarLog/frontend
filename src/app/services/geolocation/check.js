/**
 * Checks whether geolocation has been enabled by the client's browser.
 * @returns {Promise<boolean>}
 */
export async function checkGeolocationEnabled() {
  return new Promise((resolve) => {
    if ("geolocation" in navigator) {
      if ("getCurrentPosition" in navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            console.log("Latitude: ", position.coords.latitude);
            console.log("Longitude: ", position.coords.longitude);
            resolve(position != null);
          },
          function (err) {
            console.error(err);
            resolve(false);
          }
        );
      } else {
        resolve(false);
      }
    } else {
      resolve(false);
    }
  });
}
