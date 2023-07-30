import api, { defaultPaginationSize } from ".";

export const postCreateNewEmployee = async (data) => {
  try {
    const res = await api.post("/hr/employees", data);
    return res;
  } catch (err) {
    throw err;
  }
};

export const getManagersList = async () => {
  try {
    const res = await api.get("/hr/employees/managers");
    return res;
  } catch (err) {
    throw err;
  }
};

/**
 * @param {{jobId: string, fullName: string, page: number, sort: string}} query
 * @returns {Promise<any>}
 */
export const getAllEmployees = async (query) => {
  try {
    const res = await api.get(
      `/hr/employees?fullName=${query.fullName}&jobId=${query.jobId}&size=${defaultPaginationSize}&page=${query.page}&sort=${query.sort}`
    );
    return res;
  } catch (err) {
    throw err;
  }
};

export const getAllEmployeesForStaff = async (query) => {
  try {
    const data = await api.get(`/empl/employees`, { params: query });
    return data;
  } catch (e) {
    throw e;
  }
};

export const getAllEmployeesForManager = async (query) => {
  try {
    const data = await api.get(`/mngr/employees`, { params: query });
    return data;
  } catch (e) {
    throw e;
  }
};

export const getEmployeeFullProfileForStaff = async (id) => {
  try {
    const res = await api.get(`/empl/employees/${id}`);
    return res;
  } catch (err) {
    throw err;
  }
};

export const getEmployeeFullProfileForManager = async (id) => {
  try {
    const res = await api.get(`/mngr/employees/${id}`);
    return res;
  } catch (err) {
    throw err;
  }
};

export const getEmployeeFullProfileForHr = async (id) => {
  try {
    const res = await api.get(`/hr/employees/${id}`);
    return res;
  } catch (err) {
    throw err;
  }
};

export const getEmployeeChangesLog = async (id, q) => {
  try {
    const data = await api.get(`/hr/employees/logs/${id}`, { params: q });
    return data;
  } catch (e) {
    throw e;
  }
};

export const getMyBiodata = async (id) => {
  try {
    const res = await api.get(`/empl/employees/me/biodata`);
    return res;
  } catch (e) {
    throw e;
  }
};

export const patchEmployeeWorkInformation = async (id = "", payload) => {
  try {
    const res = await api.patch(`/hr/employees/${id}`, payload);
    return res;
  } catch (e) {
    throw e;
  }
};
