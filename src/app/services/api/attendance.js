import api from ".";

export const requestClockIn = async () => {
  try {
    const data = await api.get("/empl/attendances/clockin");
    return data;
  } catch (err) {
    throw err;
  }
};

export const clockIn = async (payload) => {
  try {
    const data = await api.post("/empl/attendances/clockin", payload);
    return data;
  } catch (err) {
    throw err;
  }
};

/**
 * @typedef {Object}  OvertimeOnAttendanceReport
 * @property {boolean} isOvertime
 * @property {boolean} isOnHoliday
 * @property {boolean} isOvertimeLeakage
 * @property {boolean} isOvertimeAvailable
 * @property {string} overtimeDuration
 * @property {string} overtimeWeeklyTotalDuration
 * @property {string} overtimeAcceptedDuration
 * @property {string} maxAllowedDailyDuration
 * @property {string} maxAllowedWeeklyDuration
 */

/**
 * requestClockOut requests an overtime on attendance report from the backend.
 * @returns {Promise<OvertimeOnAttendanceReport>}
 */
export const requestClockOut = async () => {
  try {
    const data = await api.get("/empl/attendances/clockout");
    return data;
  } catch (e) {
    throw e;
  }
};

export const clockOut = async (payload) => {
  try {
    const data = await api.post("/empl/attendances/clockout", payload);
    return data;
  } catch (e) {
    throw e;
  }
};

export const getTodaysAttendance = async () => {
  try {
    const data = await api.get("/empl/attendances/active");
    return data;
  } catch (err) {
    throw err;
  }
};

export const getMyOvertimeSubmissions = async (query) => {
  try {
    const data = await api.get("/empl/overtimes", { params: query });
    return data;
  } catch (e) {
    throw e;
  }
};

export const getOvertimeSubmissionDetail = async (id) => {
  try {
    const data = await api.get(`/empl/overtimes/${id}`);
    return data;
  } catch (e) {
    throw e;
  }
};

export const getMyAttendancesLog = async (query) => {
  try {
    const data = await api.get(`/empl/attendances/history`, { params: query });
    return data;
  } catch (e) {
    throw e;
  }
};

export const getStaffsAttendancesLog = async (query) => {
  try {
    const data = await api.get(`/mngr/attendances/history`, { params: query });
    return data;
  } catch (e) {
    throw e;
  }
};

export const getEmployeesAttendancesLog = async (query) => {
  try {
    const data = await api.get(`/hr/attendances/history`, { params: query });
    return data;
  } catch (e) {
    throw e;
  }
};

export const getTodaysAttendancesLog = async (query) => {
  try {
    const data = await api.get(`/hr/attendances/today`, { params: query });
    return data;
  } catch (e) {
    throw e;
  }
};

export const getEmployeeOvertimesFromProfile = async (
  query,
  id,
  code = "mngr"
) => {
  try {
    const data = await api.get(`/${code}/employees/overtimes/${id}`, {
      params: query,
    });
    return data;
  } catch (e) {
    throw e;
  }
};

export const getEmployeeAttendancesFromProfile = async (
  query,
  id,
  code = "mngr"
) => {
  try {
    const data = await api.get(`/${code}/employees/attendances/${id}`, {
      params: query,
    });
    return data;
  } catch (e) {
    throw e;
  }
};
