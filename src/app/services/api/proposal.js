import api from ".";

/**
 * This fetches the incoming leave proposals for manager
 * @param {{ page: number, size?: number, name?: string, month?: number, year?: number }} query
 */
export const getIncomingProposalsForManager = async (query) => {
  try {
    const data = await api.get("/mngr/proposals/leaves/incoming", {
      params: query,
    });
    return data;
  } catch (e) {
    throw e;
  }
};

/**
 * This fetches the incoming leave proposals for hr
 * @param {{ page: number, size?: number, name?: string, month?: number, year?: number }} query
 */
export const getIncomingProposalsForHr = async (query) => {
  try {
    const data = await api.get("/hr/proposals/leaves/incoming", {
      params: query,
    });
    return data;
  } catch (e) {
    throw e;
  }
};

export const getIncomingProposalDetailForManager = async (id) => {
  try {
    const data = await api.get(`/mngr/proposals/leaves/incoming/${id}`);
    return data;
  } catch (e) {
    throw e;
  }
};

export const getIncomingProposalDetailForHr = async (id) => {
  try {
    const data = await api.get(`/hr/proposals/leaves/incoming/${id}`);
    return data;
  } catch (e) {
    throw e;
  }
};

export const saveLeaveProposalActionByManager = async (payload) => {
  try {
    const data = await api.patch("/mngr/proposals/leaves/incoming", payload);
    return data;
  } catch (e) {
    throw e;
  }
};

export const saveLeaveProposalActionByHr = async (payload) => {
  try {
    const data = await api.patch("/hr/proposals/leaves/incoming", payload);
    return data;
  } catch (e) {
    throw e;
  }
};

/**
 * This fetches the incoming leave proposals for hr
 * @param {{ page: number, size?: number, name?: string }} query
 */
export const getIncomingOvertimeSubmissionsForManager = async (query) => {
  try {
    const data = await api.get("/mngr/proposals/overtimes/incoming", {
      params: query,
    });
    return data;
  } catch (e) {
    throw e;
  }
};

export const getIncomingOvertimeSubmissionDetailForManager = async (id) => {
  try {
    const data = await api.get(`/mngr/proposals/overtimes/incoming/${id}`);
    return data;
  } catch (e) {
    throw e;
  }
};

export const saveOvertimeSubmissionActionByHr = async (payload) => {
  try {
    const data = await api.patch("/mngr/proposals/overtimes/incoming", payload);
    return data;
  } catch (e) {
    throw e;
  }
};

export const getLeaveProposalHistoryForManager = async (query) => {
  try {
    const data = await api.get("/mngr/proposals/leaves/history", {
      params: query,
    });
    return data;
  } catch (e) {
    throw e;
  }
};

export const getLeaveProposalHistoryDetailForManager = async (id) => {
  try {
    const data = await api.get(`/mngr/proposals/leaves/history/${id}`);
    return data;
  } catch (e) {
    throw e;
  }
};

export const getOvertimeSubmissionHistoryForManager = async (query) => {
  try {
    const data = await api.get("/mngr/proposals/overtimes/history", {
      params: query,
    });
    return data;
  } catch (e) {
    throw e;
  }
};

export const getOvertimeSubmissionHistoryDetailForManager = async (id) => {
  try {
    const data = await api.get(`/mngr/proposals/overtimes/history/${id}`);
    return data;
  } catch (e) {
    throw e;
  }
};

export const getLeaveProposalHistoryForHr = async (query) => {
  try {
    const data = await api.get("/hr/proposals/leaves/history", {
      params: query,
    });
    return data;
  } catch (e) {
    throw e;
  }
};

export const getLeaveProposalHistoryDetailForHr = async (id) => {
  try {
    const data = await api.get(`/hr/proposals/leaves/history/${id}`);
    return data;
  } catch (e) {
    throw e;
  }
};

export const getOvertimeSubmissionHistoryForHr = async (query) => {
  try {
    const data = await api.get("/hr/proposals/overtimes/history", {
      params: query,
    });
    return data;
  } catch (e) {
    throw e;
  }
};

export const getOvertimeSubmissionHistoryDetailForHr = async (id) => {
  try {
    const data = await api.get(`/hr/proposals/overtimes/history/${id}`);
    return data;
  } catch (e) {
    throw e;
  }
};
