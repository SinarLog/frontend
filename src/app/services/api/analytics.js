import api from ".";

export const getDashboardAnalyticsForEmployee = async () => {
  try {
    const data = await api.get("/empl/anal/dashboard");
    return data;
  } catch (e) {
    throw e;
  }
};

export const getHrDashboardAnal = async () => {
  try {
    const data = await api.get("/hr/anal");
    return data;
  } catch (e) {
    throw e;
  }
};
