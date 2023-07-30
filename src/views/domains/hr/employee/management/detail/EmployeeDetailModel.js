/* eslint-disable default-case */
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { NotifContext } from "../../../../../../app/context/notif";
import {
  getEmployeeChangesLog,
  getEmployeeFullProfileForHr,
  getManagersList,
  patchEmployeeWorkInformation,
} from "../../../../../../app/services/api/employee";

import usePagination from "../../../../../../components/pagination/usePagination";
import { getEmployeeLeavesFromProfile } from "../../../../../../app/services/api/leave";
import {
  getEmployeeAttendancesFromProfile,
  getEmployeeOvertimesFromProfile,
} from "../../../../../../app/services/api/attendance";
import { getJobs, getRoles } from "../../../../../../app/services/api/public";
import { useSelector } from "react-redux";

const initLeaves = {
  leaves: [],
  paging: {},
};

const initProposalQuery = {
  month: "",
  year: "",
  page: 1,
  size: 10,
};

const initAttendancesQuery = {
  early: false,
  late: false,
  closed: false,
  month: "",
  year: "",
  page: 1,
  size: 10,
};

const initOvertimes = {
  overtimes: [],
  paging: {},
};

const initAttendances = {
  attendances: [],
  paging: {},
};

const initLogs = {
  logs: null,
  paging: {},
};

const initUpdates = {
  status: "", // Optional
  roleId: "", // Optional
  contractType: "", // Optional
  jobId: "", // Optional
  managerId: "", // Optional.. Have validation depending on roleId
};

export default function EmployeeDetailModel() {
  const navigate = useNavigate();
  const { employeeId } = useParams();
  const { showAlert } = useContext(NotifContext);
  const isCurrentUser =
    useSelector((state) => state.currentUser).id === employeeId;

  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tabs, setTabs] = useState(0);

  // Leaves
  const [leaves, setLeaves] = useState(initLeaves);
  const [leaveQuery, setLeaveQuery] = useState(initProposalQuery);
  const [leaveLoading, setLeaveLoading] = useState(false);
  // Overtimes
  const [overtimes, setOvertimes] = useState(initOvertimes);
  const [overtimeQuery, setOvertimeQuery] = useState(initProposalQuery);
  const [overtimeLoading, setOvertimeLoading] = useState(false);
  // Attendances
  const [attendances, setAttendances] = useState(initAttendances);
  const [attendanceQuery, setAttendanceQuery] = useState(initAttendancesQuery);
  const [attendancesLoading, setAttendancesLoading] = useState(false);
  // Logs
  const [logs, setLogs] = useState(initLogs);
  const [logsCurrentPage, handleLogsPagination] = usePagination();
  const [logsLoading, setLogsLoading] = useState(false);
  // Updates
  const [updates, setUpdates] = useState(initUpdates);
  const [jobs, setJobs] = useState([]);
  const [roles, setRoles] = useState([]);
  const [managers, setManagers] = useState([]);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [submitDisbaled, setSubmitDisabled] = useState(true);
  const managerInput = useRef(null);

  /**
   ****************************
   * FETCHERS SECTION
   ****************************
   */
  const fetchEmployeeFullProfile = (id = employeeId) => {
    setLoading(true);
    getEmployeeFullProfileForHr(id)
      .then((data) => {
        setDetail(data);
        setUpdates({
          status: data.status,
          roleId: data.role.id,
          contractType: data.contractType,
          jobId: data.job.id,
          managerId: data.manager?.id ?? "",
        });
      })
      .catch((err) => showAlert("ERROR", err))
      .finally(() => setLoading(false));
  };

  const fetchLeaves = (q = leaveQuery, id = employeeId, code = "hr") => {
    if (q.month !== "" && q.year !== "") {
      setLeaveLoading(true);
      getEmployeeLeavesFromProfile(
        {
          ...q,
          month: q.month,
          year: q.year,
        },
        id,
        code
      )
        .then((data) => {
          setLeaves({ leaves: data.data, paging: data.paging });
        })
        .catch((err) => {
          showAlert("ERROR", err);
        })
        .finally(() => {
          setLeaveLoading(false);
        });
    } else if (q.month === "" && q.year === "") {
      setLeaveLoading(true);
      getEmployeeLeavesFromProfile(q, id, code)
        .then((data) => {
          setLeaves({ leaves: data.data, paging: data.paging });
        })
        .catch((err) => {
          showAlert("ERROR", err);
        })
        .finally(() => {
          setLeaveLoading(false);
        });
    }
  };

  const fetchOvertimes = (q = overtimeQuery, id = employeeId, code = "hr") => {
    if (q.month !== "" && q.year !== "") {
      setOvertimeLoading(true);
      getEmployeeOvertimesFromProfile(q, id, code)
        .then((data) => {
          setOvertimes({ overtimes: data.data, paging: data.paging });
        })
        .catch((err) => {
          showAlert("ERROR", err);
        })
        .finally(() => {
          setOvertimeLoading(false);
        });
    } else if (q.month === "" && q.year === "") {
      setOvertimeLoading(true);
      getEmployeeOvertimesFromProfile(q, id, code)
        .then((data) => {
          setOvertimes({ overtimes: data.data, paging: data.paging });
        })
        .catch((err) => {
          showAlert("ERROR", err);
        })
        .finally(() => {
          setOvertimeLoading(false);
        });
    }
  };

  const fetchAttendances = (
    q = attendanceQuery,
    id = employeeId,
    code = "hr"
  ) => {
    if (q.month !== "" && q.year !== "") {
      setAttendancesLoading(true);
      getEmployeeAttendancesFromProfile(
        {
          ...q,
          month: q.month,
          year: q.year,
          early: q.early && "true",
          late: q.late && "true",
          closed: q.closed && "true",
        },
        id,
        code
      )
        .then((data) => {
          setAttendances({ attendances: data.data, paging: data.paging });
        })
        .catch((err) => {
          showAlert("ERROR", err);
        })
        .finally(() => {
          setAttendancesLoading(false);
        });
    } else if (q.month === "" && q.year === "") {
      setAttendancesLoading(true);
      getEmployeeAttendancesFromProfile(
        {
          ...q,
          early: q.early && "true",
          late: q.late && "true",
          closed: q.closed && "true",
        },
        id,
        code
      )
        .then((data) => {
          setAttendances({ attendances: data.data, paging: data.paging });
        })
        .catch((err) => {
          showAlert("ERROR", err);
        })
        .finally(() => {
          setAttendancesLoading(false);
        });
    }
  };

  const fetchLogs = (id = employeeId) => {
    setLogsLoading(true);
    getEmployeeChangesLog(id, {
      page: logsCurrentPage,
      size: 10,
      sort: "DESC",
    })
      .then((data) => {
        if (data.data) {
          setLogs({
            logs: data.data.map((item) => ({ ...item, show: false })),
            paging: data.paging,
          });
        }
      })
      .catch((err) => {
        showAlert("ERROR", err);
      })
      .finally(() => {
        setLogsLoading(false);
      });
  };

  const fetchRoles = new Promise((resolve, reject) => {
    getRoles()
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });

  const fetchJobs = new Promise((resolve, reject) => {
    getJobs()
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });

  const fetchManagers = new Promise((resolve, reject) => {
    getManagersList()
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });

  const fetchUpdates = () => {
    setUpdateLoading(true);
    Promise.all([fetchRoles, fetchJobs, fetchManagers])
      .then((values) => {
        setRoles(values[0]);
        setJobs(values[1]);
        setManagers(values[2]);
      })
      .catch((err) => {
        showAlert("ERROR", err);
      })
      .finally(() => {
        setUpdateLoading(false);
      });
  };

  /**
   ****************************
   * HANDLERS SECTION
   *
   * GLOBAL
   ****************************
   */
  const handleGoBack = () => {
    navigate(-1);
  };

  const handleTabs = (event) => {
    setTabs(Number(event.target.value));
  };

  /**
   ****************************
   * HANDLERS SECTION
   *
   * EDIT EMPLOYEE
   ****************************
   */
  const handleUpdateOnClick = () => {
    fetchUpdates();
    window.updateEmployeeData.showModal();
  };

  const handleUpdatesClose = () => {
    window.updateEmployeeData.querySelector("form").submit();
  };

  const handleEmployementTypeOnChange = (event) => {
    const update = { ...updates, contractType: event.target.value };
    setUpdates(update);
    handleValidateUpdate(update);
  };

  const handleStatusOnChange = (event) => {
    const update = { ...updates, status: event.target.value };
    setUpdates(update);
    handleValidateUpdate(update);
  };

  const handleRoleOnChange = (event) => {
    const role = roles.find((item) => item.id === event.target.value);
    let update = { ...updates, roleId: event.target.value };
    if (role.code !== "staff") {
      update = { ...update, managerId: "" };
    }
    setUpdates(update);
    handleValidateUpdate(update);
  };

  const handleJobOnChange = (event) => {
    const update = { ...updates, jobId: event.target.value };
    setUpdates(update);
    handleValidateUpdate(update);
  };

  const handleManagerOnChange = (event) => {
    const update = { ...updates, managerId: event.target.value };
    setUpdates(update);
    handleValidateUpdate(update);
  };

  const handleValidateUpdate = (obj = updates) => {
    if (obj.roleId !== "") {
      const role = roles.find((item) => item.id === obj.roleId);
      if (role.code === "staff" && obj.managerId === "") {
        setSubmitDisabled(true);
        managerInput.current.disabled = false;
        managerInput.current.classList.add("border-red-500");
      } else if (role.code !== "staff") {
        setSubmitDisabled(false);
        managerInput.current.disabled = true;
        managerInput.current.classList.remove("border-red-500");
      } else {
        setSubmitDisabled(false);
        managerInput.current.classList.remove("border-red-500");
      }
    } else {
      setSubmitDisabled(false);
      managerInput.current.classList.remove("border-red-500");
    }
  };

  const handleUpdateSubmit = () => {
    patchEmployeeWorkInformation(detail.id, updates)
      .then(() => {
        showAlert("SUCCESS", "Successfully updated profile");
        handleUpdatesClose();
        fetchEmployeeFullProfile(employeeId);
        fetchLogs(employeeId);
      })
      .catch((err) => {
        showAlert("ERROR", err);
      });
  };

  /**
   ****************************
   * HANDLERS SECTION
   *
   * LEAVES
   ****************************
   */
  const handleLeaveStatusOnChange = (event) => {
    setLeaveQuery({
      ...leaveQuery,
      status: event.target.value.toLowerCase(),
      page: 1,
    });
  };

  const handleLeaveMonthOnChage = (event) => {
    switch (event.target.value) {
      case "NONE":
        setLeaveQuery({ ...leaveQuery, month: "", year: "", page: 1 });
        break;
      default:
        setLeaveQuery({
          ...leaveQuery,
          month: Number(event.target.value),
          page: 1,
        });
    }
  };

  const handleLeaveYearOnChange = (event) => {
    switch (event.target.value) {
      case "NONE":
        setLeaveQuery({ ...leaveQuery, month: "", year: "", page: 1 });
        break;
      default:
        setLeaveQuery({
          ...leaveQuery,
          year: Number(event.target.value),
          page: 1,
        });
    }
  };

  const handleLeavePagination = (event) => {
    setLeaveQuery({
      ...leaveQuery,
      page: leaveQuery.page + Number(event.target.value),
    });
  };

  /**
   ****************************
   * HANDLERS SECTION
   *
   * OVERTIME
   ****************************
   */
  const handleOvertimeStatusOnChange = (event) => {
    setOvertimeQuery({
      ...overtimeQuery,
      status: event.target.value.toLowerCase(),
    });
  };

  const handleOvertimeMonthOnChage = (event) => {
    switch (event.target.value) {
      case "NONE":
        setOvertimeQuery({ ...overtimeQuery, month: "", year: "", page: 1 });
        break;
      default:
        setOvertimeQuery({
          ...overtimeQuery,
          month: Number(event.target.value),
          page: 1,
        });
    }
  };

  const handleOvertimeYearOnChange = (event) => {
    switch (event.target.value) {
      case "NONE":
        setOvertimeQuery({ ...overtimeQuery, month: "", year: "", page: 1 });
        break;
      default:
        setOvertimeQuery({
          ...overtimeQuery,
          year: Number(event.target.value),
          page: 1,
        });
    }
  };

  const handleOvertimePagination = (event) => {
    setOvertimeQuery({
      ...overtimeQuery,
      page: overtimeQuery.page + Number(event.target.value),
    });
  };

  /**
   ****************************
   * HANDLERS SECTION
   *
   * ATTENDANCE LOGS
   ****************************
   */
  const handleLogsCheckOnChange = (i) => () => {
    switch (i) {
      case 1: {
        setAttendanceQuery({
          ...attendanceQuery,
          late: !attendanceQuery.late,
          page: 1,
        });
        break;
      }
      case 2: {
        setAttendanceQuery({
          ...attendanceQuery,
          early: !attendanceQuery.early,
          page: 1,
        });
        break;
      }
      case 3: {
        setAttendanceQuery({
          ...attendanceQuery,
          closed: !attendanceQuery.closed,
          page: 1,
        });
        break;
      }
    }
  };

  const handleAttendanceMonthOnChage = (event) => {
    switch (event.target.value) {
      case "NONE":
        setAttendanceQuery({
          ...attendanceQuery,
          month: "",
          year: "",
          page: 1,
        });
        break;
      default:
        setAttendanceQuery({
          ...attendanceQuery,
          month: Number(event.target.value),
          page: 1,
        });
    }
  };

  const handleAttendanceYearOnChange = (event) => {
    switch (event.target.value) {
      case "NONE":
        setAttendanceQuery({
          ...attendanceQuery,
          month: "",
          year: "",
          page: 1,
        });
        break;
      default:
        setAttendanceQuery({
          ...attendanceQuery,
          year: Number(event.target.value),
          page: 1,
        });
    }
  };

  const handleAttendancePagination = (event) => {
    setAttendanceQuery({
      ...attendanceQuery,
      page: attendanceQuery.page + Number(event.target.value),
    });
  };

  /**
   ****************************
   * HANDLERS SECTION
   *
   * CHANGES LOG
   ****************************
   */
  const handleShowChanges = (id) => () => {
    setLogs({
      ...logs,
      logs: logs.logs.map((item) =>
        item.id === id ? { ...item, show: !item.show } : item
      ),
    });
  };

  return {
    values: {
      employeeId,
      detail,
      loading,
      setLoading,
      tabs,
      isCurrentUser,

      leaves: {
        leaves: leaves.leaves,
        paging: leaves.paging,
        query: leaveQuery,
        currentPage: leaveQuery.page,
        loading: leaveLoading,
      },
      overtimes: {
        overtimes: overtimes.overtimes,
        paging: overtimes.paging,
        query: overtimeQuery,
        currentPage: overtimeQuery.page,
        loading: overtimeLoading,
      },
      attendances: {
        attendances: attendances.attendances,
        paging: attendances.paging,
        query: attendanceQuery,
        currentPage: attendanceQuery.page,
        loading: attendancesLoading,
      },
      logs: {
        logs: logs.logs,
        paging: logs.paging,
        currentPage: logsCurrentPage,
        loading: logsLoading,
      },
      updates: {
        loading: updateLoading,
        ...updates,
        roles,
        jobs,
        managers,
        disabled: submitDisbaled,
      },
    },
    handlers: {
      back: handleGoBack,
      tabs: handleTabs,
      leaves: {
        pagination: handleLeavePagination,
        month: handleLeaveMonthOnChage,
        year: handleLeaveYearOnChange,
        status: handleLeaveStatusOnChange,
      },
      overtimes: {
        pagination: handleOvertimePagination,
        month: handleOvertimeMonthOnChage,
        year: handleOvertimeYearOnChange,
        status: handleOvertimeStatusOnChange,
      },
      attendances: {
        pagination: handleAttendancePagination,
        checks: handleLogsCheckOnChange,
        month: handleAttendanceMonthOnChage,
        year: handleAttendanceYearOnChange,
      },
      logs: {
        pagination: handleLogsPagination,
        detail: handleShowChanges,
      },
      updates: {
        open: handleUpdateOnClick,
        close: handleUpdatesClose,
        contractType: handleEmployementTypeOnChange,
        status: handleStatusOnChange,
        role: handleRoleOnChange,
        job: handleJobOnChange,
        manager: handleManagerOnChange,
        submit: handleUpdateSubmit,
      },
    },
    fetchers: {
      employee: fetchEmployeeFullProfile,
      leaves: fetchLeaves,
      overtimes: fetchOvertimes,
      attendances: fetchAttendances,
      logs: fetchLogs,
    },
    refs: {
      manager: managerInput,
    },
  };
}
