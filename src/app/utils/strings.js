const googleMapInitUrl = "https://www.google.com/maps/";
const googleMapPlace = "place/";
const googleMapZoom = 20;

/**
 * Capitalize a string
 * @param {string} str
 * @returns
 */
export function toCapitalize(str) {
  if (str) {
    str = str[0].toUpperCase() + str.slice(1, str.length);
    let wasPeriod = false;
    let start = 1;
    for (let i = start; i < str.length; i++) {
      try {
        if (str.charCodeAt(i) === 46) {
          wasPeriod = true;
        } else if (wasPeriod) {
          let code = str.charCodeAt(i);
          if ((code >= 65 && code <= 90) || code >= 97 || code <= 122) {
            str =
              str[0] +
              str.slice(start, i) +
              str[i].toUpperCase() +
              str.slice(i, str.length);
            wasPeriod = false;
          }
        }
      } catch (err) {
        // Catches out of bound
        break;
      }
    }
  }

  return str;
}

/**
 * appends error message from api response
 * @param {any[]} err
 */
export function appendErrorMessage(err) {
  let message = "";
  if (Array.isArray(err)) {
    for (let i = 0; i < err.length; i++) {
      if (i === err.length)
        message = message.concat(toCapitalize(err[i].message));
      else message = message.concat(toCapitalize(err[i].message), "\n");
    }
  } else {
    message = toCapitalize(err.message);
  }

  return message;
}

/**
 * @param {string} name
 */
export function getInitialsFromFullName(name) {
  name = getFirstAndLastName(name);
  let initials = "";

  if (name !== "") {
    name?.split(" ").forEach((element) => {
      initials += element[0].toUpperCase();
    });
  }

  return initials;
}

/**
 * @param {string} fullName
 * @returns {string}
 */
export function getFirstAndLastName(fullName = "") {
  if (fullName !== "") {
    let res = "";
    const arr = fullName.split(" ");
    if (arr.length >= 2) {
      return res.concat(arr[0], " ", arr[arr.length - 1]);
    }
  }

  return fullName;
}

/**
 * @param {number} lat
 * @param {number} long
 * @returns {string}
 */
export function getGoogleMapsUrlFromLocation(lat, long) {
  const latAsStr = convertDMSToGoogleDMS(convertDDToDMS(lat, false));
  const longAsStr = convertDMSToGoogleDMS(convertDDToDMS(long, true));

  return (
    googleMapInitUrl +
    googleMapPlace +
    latAsStr +
    "+" +
    longAsStr +
    "/@" +
    lat +
    "," +
    long +
    "," +
    googleMapZoom +
    "z"
  );
}

/**
 *
 * @param {number} D
 * @param {boolean} lng
 * @returns {{dir: string, deg: number, min: number, sec: number}}
 */
function convertDDToDMS(D, lng) {
  return {
    dir: D < 0 ? (lng ? "W" : "S") : lng ? "E" : "N",
    deg: 0 | (D < 0 ? (D = -D) : D),
    min: 0 | (((D += 1e-9) % 1) * 60),
    sec: (0 | (((D * 60) % 1) * 6000)) / 100,
  };
}

/**
 *
 * @param {{dir: string, deg: number, min: number, sec: number}} dms
 * @returns {string}
 */
function convertDMSToGoogleDMS(dms) {
  let str = "";
  str += dms.deg + "°";
  str += dms.min + "'";
  str += dms.sec + '"';
  str += dms.dir;
  return str;
}

/**
 * @param {string} dur
 * @returns {string}
 */
export function formatTimeString(dur) {
  if (typeof dur === "string") {
    const regex = /\d+/g;
    const matches = dur.match(regex);
    const hours = matches.length > 1 ? matches[0].padStart(2, "0") : "00";
    const minutes =
      matches.length > 1
        ? matches[1].padStart(2, "0")
        : matches[0].padStart(2, "0");
    return `${hours}:${minutes}`;
  } else {
    return dur;
  }
}

/**
 *
 * @param {string} key
 * @param {string|number} value
 * @returns
 */
export function whatChangedConfigMapper(key, value) {
  switch (key) {
    case "acceptance_leave_interval":
      return `${value} days`;
    case "acceptance_attendance_interval":
      return formatTimeString(value);
    case "default_yearly_quota":
      return `${value} days`;
    case "default_marriage_quota":
      return `${value} days`;
    default:
      return value;
  }
}

/**
 * @param {string} kitchen
 * @returns {string}
 */
export function formatKitchenTimeToDuration(kitchen) {
  const splitted = kitchen.split(":");
  return `${Number(splitted[0])}h${Number(splitted[1])}m`;
}

/**
 * @param {string} agent navigator.userAgent
 * @returns
 */
export function getBrowserName(agent) {
  let match =
    agent.match(
      /(opera|chrome|safari|edge|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
    ) || [];
  let temp;

  if (/trident/i.test(match[1])) {
    temp = /\brv[ :]+(\d+)/g.exec(agent) || [];

    return `IE ${temp[1] || ""}`;
  }

  if (match[1] === "Chrome") {
    temp = agent.match(/\b(OPR|Edge)\/(\d+)/);

    if (temp !== null) {
      return temp.slice(1).join(" ").replace("OPR", "Opera");
    }

    temp = agent.match(/\b(Edg)\/(\d+)/);

    if (temp !== null) {
      return temp.slice(1).join(" ").replace("Edg", "Edge (Chromium)");
    }
  }

  match = match[2]
    ? [match[1], match[2]]
    : [navigator.appName, navigator.appVersion, "-?"];
  temp = agent.match(/version\/(\d+)/i);

  if (temp !== null) {
    match.splice(1, 1, temp[1]);
  }

  return match[0];
}
