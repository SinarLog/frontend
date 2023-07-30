/* eslint-disable default-case */
import { useContext, useState } from "react";
import { NotifContext } from "../../../../app/context/notif";
import {
  getLeaveProposalHistoryDetailForManager,
  getLeaveProposalHistoryForManager,
  getOvertimeSubmissionHistoryDetailForManager,
  getOvertimeSubmissionHistoryForManager,
} from "../../../../app/services/api/proposal";
import { getStaffsAttendancesLog } from "../../../../app/services/api/attendance";

const initLeave = {
  leaves: [],
  paging: {},
};

const initOvertime = {
  overtimes: [],
  paging: {},
};

const initAttendance = {
  attendances: [],
  paging: {},
};

const initQuery = {
  month: "",
  year: "",
  status: "all",
  sort: 0, // 0 means DESC, 1 means ASC
  name: "",
  page: 1,
  size: 10,
};

const initAttendanceQuery = {
  month: "",
  year: "",
  late: false,
  early: false,
  closed: false,
  name: "",
  page: 1,
  size: 10,
};

const initState = {
  loading: true,
  detailLoading: false,
};

export default function HistoryModel() {
  const { showAlert } = useContext(NotifContext);
  // Leaves
  const [leaves, setLeaves] = useState(initLeave);
  const [leaveQuery, setLeaveQuery] = useState(initQuery);
  const [leaveState, setLeaveState] = useState(initState);
  const [leaveDetail, setLeaveDetail] = useState(null);
  // Overtimes
  const [overtimes, setOvertimes] = useState(initOvertime);
  const [overtimeQuery, setOvertimeQuery] = useState(initQuery);
  const [overtimeState, setOvertimeState] = useState(initState);
  const [overtimeDetail, setOvertimeDetail] = useState(null);
  // Attendances
  const [attendances, setAttendances] = useState(initAttendance);
  const [attendanceQuery, setAttendanceQuery] = useState(initAttendanceQuery);
  const [attendanceState, setAttendanceState] = useState(initState);
  // Tabs
  const [tab, setTab] = useState(0);

  // console.log(leaveQuery);
  // console.log(overtimes);
  // console.log(overtimeQuery);

  /**
   ****************************
   * FETCHERS SECTION
   ****************************
   */
  const fetchLeaves = (q = leaveQuery) => {
    if (q.month !== "" && q.year !== "") {
      setLeaveState({ ...leaveState, loading: true });
      getLeaveProposalHistoryForManager({
        ...q,
        month: q.month,
        year: q.year,
        sort: q.sort === 0 ? "DESC" : "ASC",
      })
        .then((data) => {
          setLeaves({ leaves: data.data, paging: data.paging });
        })
        .catch((err) => {
          showAlert("ERROR", err);
        })
        .finally(() => {
          setLeaveState({ ...leaveState, loading: false });
        });
    } else if (q.month === "" && q.year === "") {
      setLeaveState({ ...leaveState, loading: true });
      getLeaveProposalHistoryForManager({
        ...q,
        sort: q.sort === 0 ? "DESC" : "ASC",
      })
        .then((data) => {
          setLeaves({ leaves: data.data, paging: data.paging });
        })
        .catch((err) => {
          showAlert("ERROR", err);
        })
        .finally(() => {
          setLeaveState({ ...leaveState, loading: false });
        });
    }
  };

  const fetchLeaveDetail = (id) => {
    setLeaveState({ ...leaveState, detailLoading: true });
    getLeaveProposalHistoryDetailForManager(id)
      .then((data) => {
        setLeaveDetail(data);
      })
      .catch((err) => {
        showAlert("ERROR", err);
      })
      .finally(() => {
        setLeaveState({ ...leaveState, detailLoading: false });
      });
  };

  const fetchAttendancesLog = (q = attendanceQuery) => {
    if (q.month !== "" && q.year !== "") {
      setAttendanceState({ loading: true });
      getStaffsAttendancesLog({
        ...q,
        early: q.early && "true",
        late: q.late && "true",
        closed: q.closed && "true",
      })
        .then((data) => {
          setAttendances({ attendances: data.data, paging: data.paging });
        })
        .catch((err) => {
          showAlert("ERROR", err);
        })
        .finally(() => {
          setAttendanceState({ loading: false });
        });
    } else if (q.month === "" && q.year === "") {
      setAttendanceState({ loading: true });
      getStaffsAttendancesLog({
        ...q,
        early: q.early && "true",
        late: q.late && "true",
        closed: q.closed && "true",
      })
        .then((data) => {
          setAttendances({ attendances: data.data, paging: data.paging });
        })
        .catch((err) => {
          showAlert("ERROR", err);
        })
        .finally(() => {
          setAttendanceState({ loading: false });
        });
    }
  };

  const fetchOvertimes = (q = overtimeQuery) => {
    if (q.month !== "" && q.year !== "") {
      setOvertimeState({ ...overtimeState, loading: true });
      getOvertimeSubmissionHistoryForManager({
        ...q,
        sort: q.sort === 0 ? "DESC" : "ASC",
      })
        .then((data) => {
          setOvertimes({ overtimes: data.data, paging: data.paging });
        })
        .catch((err) => {
          showAlert("ERROR", err);
        })
        .finally(() => {
          setOvertimeState({ ...overtimeState, loading: false });
        });
    } else if (q.month === "" && q.year === "") {
      setOvertimeState({ ...overtimeState, loading: true });
      getOvertimeSubmissionHistoryForManager({
        ...q,
        sort: q.sort === 0 ? "DESC" : "ASC",
      })
        .then((data) => {
          setOvertimes({ overtimes: data.data, paging: data.paging });
        })
        .catch((err) => {
          showAlert("ERROR", err);
        })
        .finally(() => {
          setOvertimeState({ ...overtimeState, loading: false });
        });
    }
  };

  const fetchOvertimeDetail = (id) => {
    setOvertimeState({ ...overtimeState, detailLoading: true });
    getOvertimeSubmissionHistoryDetailForManager(id)
      .then((data) => {
        setOvertimeDetail(data);
      })
      .catch((err) => {
        showAlert("ERROR", err);
      })
      .finally(() => {
        setOvertimeState({ ...overtimeState, detailLoading: false });
      });
  };

  /**
   ****************************
   * HANDLERS SECTION
   *
   * LEAVE
   ****************************
   */
  const handleLeaveStatusOnChange = (event) => {
    setLeaveQuery({
      ...leaveQuery,
      status: event.target.value.toLowerCase(),
      page: 1,
    });
  };

  const handleLeaveSortOnClick = () => {
    setLeaveQuery({ ...leaveQuery, sort: (leaveQuery.sort + 1) % 2 });
  };

  const handleLeaveNameOnChange = (event) => {
    setLeaveQuery({ ...leaveQuery, name: event.target.value });
  };

  /**
   * @param {React.KeyboardEvent<HTMLInputElement>} event
   */
  const handleLeaveNameSearchKeydown = (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Backspace") {
      fetchLeaves({ ...leaveQuery, name: "" });
    } else if (event.key === "Backspace" && event.target.value === "") {
      fetchLeaves({ ...leaveQuery, name: "" });
    }
  };

  const handleLeaveSearchOnSubmit = (event) => {
    event.preventDefault();
    fetchLeaves({ ...leaveQuery, page: 1 });
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

  const handleLeaveDetailOnClick = (event) => {
    window.leaveProposalHistoryDetail.showModal();
    fetchLeaveDetail(event.target.value);
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
      page: 1,
    });
  };

  const handleOvertimeSortOnClick = () => {
    setOvertimeQuery({ ...overtimeQuery, sort: (overtimeQuery.sort + 1) % 2 });
  };

  const handleOvertimeNameOnChange = (event) => {
    setOvertimeQuery({ ...overtimeQuery, name: event.target.value });
  };

  const handleOvertimeNameSearchKeydown = (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Backspace") {
      fetchOvertimes({ ...overtimeQuery, name: "" });
    } else if (event.key === "Backspace" && event.target.value === "") {
      fetchOvertimes({ ...overtimeQuery, name: "" });
    }
  };

  const handleOvertimeSearchOnSubmit = (event) => {
    event.preventDefault();
    fetchOvertimes({ ...overtimeQuery, page: 1 });
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

  const handleOvertimeDetailOnClick = (event) => {
    window.overtimeSubmissionHistoryDetail.showModal();
    fetchOvertimeDetail(event.target.value);
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

  const handleAttendanceNameOnChange = (event) => {
    setAttendanceQuery({ ...attendanceQuery, name: event.target.value });
  };

  const handleAttendanceSearchOnSubmit = (event) => {
    event.preventDefault();
    fetchAttendancesLog({ ...attendanceQuery, page: 1 });
  };

  const handleAttendancePagination = (event) => {
    setAttendanceQuery({
      ...attendanceQuery,
      page: attendanceQuery.page + Number(event.target.value),
    });
  };

  const handleAttendanceNameSearchKeydown = (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Backspace") {
      fetchAttendancesLog({ ...attendanceQuery, name: "" });
    } else if (event.key === "Backspace" && event.target.value === "") {
      fetchAttendancesLog({ ...attendanceQuery, name: "" });
    }
  };

  /**
   ****************************
   * HANDLERS SECTION
   *
   * OTHERS
   ****************************
   */
  const handleTabs = (event) => {
    setTab(Number(event.target.value));
  };

  return {
    values: {
      tab,
      leaves: {
        leaves: leaves.leaves,
        paging: leaves.paging,
        loading: leaveState.loading,
        currentPage: leaveQuery.page,
        query: leaveQuery,
        detail: leaveDetail,
        detailIsLoading: leaveState.detailLoading,
      },
      overtimes: {
        overtimes: overtimes.overtimes,
        paging: overtimes.paging,
        loading: overtimeState.loading,
        currentPage: overtimeQuery.page,
        query: overtimeQuery,
        detail: overtimeDetail,
        detailIsLoading: overtimeState.detailLoading,
      },
      logs: {
        attendances: attendances.attendances,
        paging: attendances.paging,
        currentPage: attendanceQuery.page,
        loading: attendanceState.loading,
        query: attendanceQuery,
      },
    },
    handlers: {
      leaves: {
        pagination: handleLeavePagination,
        month: handleLeaveMonthOnChage,
        year: handleLeaveYearOnChange,
        status: handleLeaveStatusOnChange,
        sort: handleLeaveSortOnClick,
        name: handleLeaveNameOnChange,
        submit: handleLeaveSearchOnSubmit,
        typing: handleLeaveNameSearchKeydown,
        detail: handleLeaveDetailOnClick,
      },
      overtimes: {
        pagination: handleOvertimePagination,
        month: handleOvertimeMonthOnChage,
        year: handleOvertimeYearOnChange,
        status: handleOvertimeStatusOnChange,
        sort: handleOvertimeSortOnClick,
        name: handleOvertimeNameOnChange,
        submit: handleOvertimeSearchOnSubmit,
        typing: handleOvertimeNameSearchKeydown,
        detail: handleOvertimeDetailOnClick,
      },
      logs: {
        pagination: handleAttendancePagination,
        name: handleAttendanceNameOnChange,
        submit: handleAttendanceSearchOnSubmit,
        typing: handleAttendanceNameSearchKeydown,
        checks: handleLogsCheckOnChange,
        month: handleAttendanceMonthOnChage,
        year: handleAttendanceYearOnChange,
      },
      tabs: handleTabs,
    },
    fetchers: {
      leaves: {
        leaves: fetchLeaves,
        detail: fetchLeaveDetail,
      },
      overtimes: {
        overtimes: fetchOvertimes,
        detail: fetchOvertimeDetail,
      },
      logs: {
        logs: fetchAttendancesLog,
      },
    },
  };
}
