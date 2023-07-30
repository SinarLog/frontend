/* eslint-disable default-case */
import { useContext, useState } from "react";
import { getTodaysAttendancesLog } from "../../../../../app/services/api/attendance";
import { NotifContext } from "../../../../../app/context/notif";

const initAttendance = {
  attendances: [],
  paging: {},
};

const initAttendanceQuery = {
  month: "",
  year: "",
  late: false,
  early: false,
  closed: false,
  page: 1,
  size: 10,
  name: "",
};

const initState = {
  loading: true,
  detailLoading: false,
};

export default function AttendanceModel() {
  const { showAlert } = useContext(NotifContext);
  // Attendances
  const [attendances, setAttendances] = useState(initAttendance);
  const [attendanceQuery, setAttendanceQuery] = useState(initAttendanceQuery);
  const [attendanceState, setAttendanceState] = useState(initState);

  /**
   ****************************
   * FETCHERS SECTION
   ****************************
   */
  const fetchTodaysAttendancesLog = (q = attendanceQuery) => {
    setAttendanceState({ loading: true });
    getTodaysAttendancesLog({
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

  const handleAttendanceNameOnChange = (event) => {
    setAttendanceQuery({ ...attendanceQuery, name: event.target.value });
  };

  const handleAttendanceSearchOnSubmit = (event) => {
    event.preventDefault();
    fetchTodaysAttendancesLog({
      ...attendanceQuery,
      page: 1,
    });
  };

  const handleAttendanceNameSearchKeydown = (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Backspace") {
      fetchTodaysAttendancesLog({ ...attendanceQuery, name: "" });
    } else if (event.key === "Backspace" && event.target.value === "") {
      fetchTodaysAttendancesLog({ ...attendanceQuery, name: "" });
    }
  };

  const handleAttendancePagination = (event) => {
    setAttendanceQuery({
      ...attendanceQuery,
      page: attendanceQuery.page + Number(event.target.value),
    });
  };

  return {
    values: {
      logs: {
        attendances: attendances.attendances,
        paging: attendances.paging,
        currentPage: attendanceQuery.page,
        loading: attendanceState.loading,
        query: attendanceQuery,
      },
    },
    handlers: {
      logs: {
        pagination: handleAttendancePagination,
        name: handleAttendanceNameOnChange,
        submit: handleAttendanceSearchOnSubmit,
        typing: handleAttendanceNameSearchKeydown,
        checks: handleLogsCheckOnChange,
      },
    },
    fetchers: {
      logs: fetchTodaysAttendancesLog,
    },
  };
}
