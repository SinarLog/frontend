/* eslint-disable default-case */
import { z } from "zod";
import { useContext, useRef, useState } from "react";
import {
  clockIn,
  clockOut,
  getMyAttendancesLog,
  getTodaysAttendance,
  requestClockIn,
  requestClockOut,
} from "../../../../../app/services/api/attendance";
import { NotifContext } from "../../../../../app/context/notif";
import { checkGeolocationEnabled } from "../../../../../app/services/geolocation/check";

const initClockInPayload = {
  otp: "",
  lat: 0,
  long: 0,
};

const clockInitState = {
  loading: false,
  time: null,
  loc: null,
  prevLoc: null,
};

const initClockOutPayload = {
  confirmation: false,
  reason: "",
  lat: 0,
  long: 0,
};

const initQuery = {
  early: false,
  late: false,
  closed: false,
  month: "",
  year: "",
  page: 1,
  size: 10,
};

const initAttendance = {
  attendances: [],
  paging: {},
};

const initState = {
  loading: true,
};

/**
 * Handles clock in and clock out logical and view.
 */
export default function AttendanceModel() {
  const { showAlert } = useContext(NotifContext);
  const [query, setQuery] = useState(initQuery);
  const [attendances, setAttendances] = useState(initAttendance);
  const [attendanceState, setAttendanceState] = useState(initState);
  const [clockInPayload, setClockInPayload] = useState(initClockInPayload);
  const [clockOutPayload, setClockOutPayload] = useState(initClockOutPayload);
  const [clockInState, setClockInState] = useState(clockInitState);
  const [report, setReport] = useState(null);
  const [clockOutState, setClockOutState] = useState(clockInitState);
  const [geolocationDisbabled, setGeolocationDisabled] = useState(true);
  const inputOTPModal = useRef(null);
  const successOTPModal = useRef(null);
  const earlyRef = useRef(null);
  const lateRef = useRef(null);
  const closedRef = useRef(null);

  /**
   ****************************
   * HANDLERS SECTION
   ****************************
   */

  /**
   * Handles OTP value on change.
   * @param {string} val
   */
  const handleOTPOnChange = (val) => {
    setClockInPayload({ ...clockInPayload, otp: val });
  };

  /**
   * Handles OTP modal when closed
   */
  const handleOTPModalOnClose = () => {
    setClockInPayload(initClockInPayload);
    setClockInState({ ...clockInState, loading: false });
  };

  const handleClockInRequest = () => {
    requestClockIn()
      .then(() => {
        setClockInState({ ...clockInState, loading: true });
        inputOTPModal.current.showModal();
      })
      .catch((err) => {
        setClockInState({ ...clockInState, loading: false });
        showAlert("ERROR", err);
      });
  };

  const handleOTPSubmit = (event) => {
    event.preventDefault();

    clockIn(clockInPayload)
      .then(() => {
        setClockInState({ ...clockInState, loading: false });
        // probably next time, just use window.modalId.showModal()
        // and use ref to the form...
        inputOTPModal.current.querySelector("form").submit();
        successOTPModal.current.showModal();
        fetchTodaysAttendance();
      })
      .catch((err) => {
        animateErrorInputOTP();
        showAlert("ERROR", err);
      });
  };

  /**
   * Handles when the clock out button is pressed..
   */
  const handleClockOutRequest = () => {
    requestClockOut()
      .then((res) => {
        setReport(res);
        setClockOutState({ ...clockOutState, loading: true });
        if (res.isOvertime) {
          if (res.isOnHoliday) {
            window.overtimeSubmissionCheckoutModal.showModal();
          } else if (res.isOvertimeAvailable) {
            window.overtimeSubmissionConfirmationModal.showModal();
          } else {
            window.overtimeSubmissionLimitModal.showModal();
            handleClockOutSubmit();
          }
        } else {
          handleClockOutSubmit();
        }
      })
      .catch((err) => {
        showAlert("ERROR", err);
      });
  };

  const handleClockOutSubmit = () => {
    clockOut(clockOutPayload)
      .then(() => {
        showAlert("SUCCESS", "Your attendance was successfully saved");
        fetchTodaysAttendance();
      })
      .catch((err) => {
        if (err.message.includes("distance")) {
          window.oopsOutOfRangeModal.showModal();
        } else {
          showAlert("ERROR", err);
        }
      })
      .finally(() => {
        setClockOutState({ ...clockOutState, loading: false });
      });
  };

  const handleOvertimeReasonOnChange = (event) => {
    setClockOutPayload({ ...clockOutPayload, reason: event.target.value });
  };

  const handleReasonReset = () => {
    setClockOutState({ ...clockOutState, loading: false });
    setClockOutPayload({ ...clockOutPayload, reason: "" });
  };

  const isSubmitReasonButtonDisabled = () => {
    const res = z.string().min(20).max(1000).safeParse(clockOutPayload.reason);
    return !res.success;
  };

  const handleLogsCheckOnChange = (i) => () => {
    switch (i) {
      case 1: {
        setQuery({ ...query, late: !query.late, page: 1 });
        break;
      }
      case 2: {
        setQuery({ ...query, early: !query.early, page: 1 });
        break;
      }
      case 3: {
        setQuery({ ...query, closed: !query.closed, page: 1 });
        break;
      }
    }
  };

  const handleMonthOnChage = (event) => {
    switch (event.target.value) {
      case "NONE":
        setQuery({ ...query, month: "", year: "", page: 1 });
        break;
      default:
        setQuery({
          ...query,
          month: Number(event.target.value),
          page: 1,
        });
    }
  };

  const handleYearOnChange = (event) => {
    switch (event.target.value) {
      case "NONE":
        setQuery({ ...query, month: "", year: "", page: 1 });
        break;
      default:
        setQuery({
          ...query,
          year: Number(event.target.value),
          page: 1,
        });
    }
  };

  const handlePagination = (event) => {
    setQuery({ ...query, page: query.page + Number(event.target.value) });
  };

  /**
   ****************************
   * FETCHERS SECTION
   ****************************
   */
  const fetchGeolocation = () => {
    checkGeolocationEnabled().then((res) => {
      setGeolocationDisabled(!res);
    });

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setClockInPayload({
            ...clockInPayload,
            lat: position.coords.latitude,
            long: position.coords.longitude,
          });
          setClockOutPayload({
            ...clockOutPayload,
            lat: position.coords.latitude,
            long: position.coords.longitude,
          });
        },
        function (_) {
          showAlert("EROR", "Unable to get your current location");
        }
      );
    }
  };

  const fetchTodaysAttendance = () => {
    getTodaysAttendance()
      .then((data) => {
        if (data) {
          setClockInState({
            loading: false,
            time: data.clockInAt,
            loc: data.clockInLoc,
          });
          setClockOutState({
            loading: false,
            time: data.clockOutAt,
            loc: data.clockOutLoc,
            prevLoc: data.clockInLoc,
          });
        }
      })
      .catch((err) => {
        showAlert("ERROR", err);
      });
  };

  const fetchAttendancesLog = (q = query) => {
    if (q.month !== "" && q.year !== "") {
      setAttendanceState({ loading: true });
      getMyAttendancesLog({
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
      getMyAttendancesLog({
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
  /**
   ****************************
   * BLURS SECTION
   ****************************
   */
  const animateErrorInputOTP = () => {
    const node = inputOTPModal.current.firstChild;
    node.classList.add("animate__animated", "animate__headShake");

    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove("animate__animated", "animate__headShake");
    }

    node.addEventListener("animationend", handleAnimationEnd, {
      once: true,
    });
  };

  const handleOvertimeReasonBlur = (event) => {
    const res = z.string().min(20).max(1000).safeParse(event.target.value);
    if (res.success) {
      event.target.classList.remove("border-red-500");
    } else {
      event.target.classList.add("border-red-500");
    }
  };

  return {
    values: {
      clockIn: {
        otp: clockInPayload.otp,
        lat: clockInPayload.lat,
        long: clockInPayload.long,
        loading: clockInState.loading,
        geolocationDisbabled,
        time: clockInState.time,
        loc: clockInState.loc,
      },
      clockOut: {
        loading: clockOutState.loading,
        geolocationDisbabled,
        time: clockOutState.time,
        reason: clockOutPayload.reason,
        isReasonDisabled: isSubmitReasonButtonDisabled,
        loc: clockOutState.loc,
        prevLoc: clockOutState.prevLoc,
        report,
      },
      logs: {
        attendances: attendances.attendances,
        paging: attendances.paging,
        currentPage: query.page,
        loading: attendanceState.loading,
        query,
      },
    },
    handlers: {
      clockIn: {
        otp: handleOTPOnChange,
        submit: handleOTPSubmit,
        modal: handleOTPModalOnClose,
        request: handleClockInRequest,
      },
      clockOut: {
        request: handleClockOutRequest,
        reason: handleOvertimeReasonOnChange,
        reset: handleReasonReset,
        submit: handleClockOutSubmit,
      },
      logs: {
        pagination: handlePagination,
        checks: handleLogsCheckOnChange,
        month: handleMonthOnChage,
        year: handleYearOnChange,
      },
    },
    refs: {
      clockIn: {
        input: inputOTPModal,
        success: successOTPModal,
      },
      logs: {
        early: earlyRef,
        late: lateRef,
        closed: closedRef,
      },
    },
    fetchers: {
      geolocation: fetchGeolocation,
      attendance: fetchTodaysAttendance,
      logs: fetchAttendancesLog,
    },
    blurs: {
      reason: handleOvertimeReasonBlur,
    },
  };
}
