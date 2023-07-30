import api from ".";

/**
 * @param {number} currentPage
 */
export const getMyLeaveRequest = async (query) => {
  try {
    const data = await api.get(`/empl/leaves`, { params: query });
    return data;
  } catch (e) {
    throw e;
  }
};

export const getMyLeaveQuota = async () => {
  try {
    const data = await api.get("/empl/leaves/quota");
    return data;
  } catch (e) {
    throw e;
  }
};

/**'
 * @param {{ from: string, to: string, reason: string, type: string }} leave
 * @returns {Promise<any>}
 */
export const requestLeave = async (leave) => {
  try {
    const data = await api.post("/empl/leaves/report", leave);
    return data;
  } catch (e) {
    throw e;
  }
};

export const applyLeave = async (payload) => {
  try {
    const data = await api.post("/empl/leaves", payload);
    return data;
  } catch (e) {
    throw e;
  }
};

export const getMyLeaveDetail = async (id) => {
  try {
    const data = await api.get(`/empl/leaves/${id}`);
    return data;
  } catch (e) {
    throw e;
  }
};

/**
 * @param {{month: number, year: number}} query
 */
export const getWhosTakingLeave = async (query, role = "staff") => {
  const localUser = localStorage.getItem("user");
  if (localUser != null) {
    role = JSON.parse(localUser).role.code;
  }
  role = role === "staff" || role === "mngr" ? "empl" : role;
  try {
    const data = await api.get(`/${role}/employees/whos-taking-leave`, {
      params: query,
    });
    return data;
  } catch (e) {
    throw e;
  }
};

export const getEmployeeLeavesFromProfile = async (
  query,
  id,
  code = "mngr"
) => {
  try {
    const data = await api.get(`/${code}/employees/leaves/${id}`, {
      params: query,
    });
    return data;
  } catch (e) {
    throw e;
  }
};
