/* eslint-disable default-case */
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { NotifContext } from "../../../../../app/context/notif";
import { getEmployeeFullProfileForManager } from "../../../../../app/services/api/employee";
import { getEmployeeLeavesFromProfile } from "../../../../../app/services/api/leave";
import usePagination from "../../../../../components/pagination/usePagination";
import {
  getEmployeeAttendancesFromProfile,
  getEmployeeOvertimesFromProfile,
} from "../../../../../app/services/api/attendance";

const initLeaves = {
  leaves: [],
  paging: {},
};

const initProposalQuery = {
  page: 1,
  size: 10,
  month: "",
  year: "",
};

const initAttendancesQuery = {
  early: false,
  late: false,
  closed: false,
  month: "",
  year: "",
};

const initOvertimes = {
  overtimes: [],
  paging: {},
};

const initAttendances = {
  attendances: [],
  paging: {},
};

export default function EmployeeDetailModel() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.currentUser);
  const { employeeId } = useParams();
  const { showAlert } = useContext(NotifContext);

  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const isUnderHim = detail?.manager
    ? currentUser.id === detail?.manager?.id
    : false;
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
  const [attendanceCurrentPage, handleAttendancePagination] = usePagination();
  const [attendancesLoading, setAttendancesLoading] = useState(false);

  /**
   ****************************
   * FETCHERS SECTION
   ****************************
   */
  const fetchEmployeeFullProfile = (id = employeeId) => {
    setLoading(true);
    getEmployeeFullProfileForManager(id, currentUser.role.code)
      .then((data) => setDetail(data))
      .catch((err) => showAlert("ERROR", err))
      .finally(() => setLoading(false));
  };

  const fetchLeaves = (q = leaveQuery, id = employeeId, code = "mngr") => {
    if (isUnderHim) {
      if (q.month !== "" && q.year !== "") {
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
    }
  };

  const fetchOvertimes = (
    q = overtimeQuery,
    id = employeeId,
    code = "mngr"
  ) => {
    if (isUnderHim) {
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
    }
  };

  const fetchAttendances = (
    q = attendanceQuery,
    id = employeeId,
    code = "mngr"
  ) => {
    if (isUnderHim) {
      if (q.month !== "" && q.year !== "") {
        setAttendancesLoading(true);
        getEmployeeAttendancesFromProfile(
          {
            ...q,
            month: q.month,
            year: q.year,
            page: attendanceCurrentPage,
            early: q.early && "true",
            late: q.late && "true",
            closed: q.closed && "true",
            size: 10,
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
            page: attendanceCurrentPage,
            early: q.early && "true",
            late: q.late && "true",
            closed: q.closed && "true",
            size: 10,
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
    }
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
   * LEAVES
   ****************************
   */
  const handleLeaveStatusOnChange = (event) => {
    setLeaveQuery({ ...leaveQuery, status: event.target.value.toLowerCase() });
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
        setAttendanceQuery({ ...attendanceQuery, late: !attendanceQuery.late });
        break;
      }
      case 2: {
        setAttendanceQuery({
          ...attendanceQuery,
          early: !attendanceQuery.early,
        });
        break;
      }
      case 3: {
        setAttendanceQuery({
          ...attendanceQuery,
          closed: !attendanceQuery.closed,
        });
        break;
      }
    }
  };

  const handleAttendanceMonthOnChage = (event) => {
    switch (event.target.value) {
      case "NONE":
        setAttendanceQuery({ ...attendanceQuery, month: "", year: "" });
        break;
      default:
        setAttendanceQuery({
          ...attendanceQuery,
          month: Number(event.target.value),
        });
    }
  };

  const handleAttendanceYearOnChange = (event) => {
    switch (event.target.value) {
      case "NONE":
        setAttendanceQuery({ ...attendanceQuery, month: "", year: "" });
        break;
      default:
        setAttendanceQuery({
          ...attendanceQuery,
          year: Number(event.target.value),
        });
    }
  };

  return {
    values: {
      employeeId,
      detail,
      loading,
      setLoading,
      isUnderHim,
      tabs,

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
        currentPage: attendanceCurrentPage,
        loading: attendancesLoading,
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
    },
    fetchers: {
      employee: fetchEmployeeFullProfile,
      leaves: fetchLeaves,
      overtimes: fetchOvertimes,
      attendances: fetchAttendances,
    },
  };
}
