import { useContext, useRef, useState } from "react";
import {
  getChangesLogs,
  getConfig,
  putConfig,
} from "../../../../app/services/api/config";
import { getConfigurations } from "../../../../app/services/api/public";
import { NotifContext } from "../../../../app/context/notif";
import { useNavigate } from "react-router-dom";
import usePagination from "../../../../components/pagination/usePagination";
import {
  formatKitchenTimeToDuration,
  formatTimeString,
} from "../../../../app/utils/strings";

const initLogs = {
  logs: null,
  paging: {},
};

export default function ConfigModel() {
  const navigate = useNavigate();
  const { showAlert } = useContext(NotifContext);
  const [config, setConfig] = useState(null);
  const [payload, setPayload] = useState(null);
  const [configRead, setConfigRead] = useState(null);
  const submitBtnRef = useRef(null);
  const clockInBtnsRef = useRef(null);
  const clockOutBtnsRef = useRef(null);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Logs
  const [logs, setLogs] = useState(initLogs);
  const [currentPage, handlePagination] = usePagination();
  const [logsLoading, setLogsLoading] = useState(false);

  /**
   ****************************
   * FETCHERS SECTION
   ****************************
   */
  const fetchConfig = () => {
    getConfigurations()
      .then((data) => {
        setConfig(data);
      })
      .catch((err) => {
        showAlert("ERROR", err);
      });

    getConfig()
      .then((data) => {
        const p = {
          ...data,
          startTimeHour:
            data.startTimeHour % 12 > 9
              ? String(data.startTimeHour % 12)
              : `0${data.startTimeHour % 12}`,
          startTimeMinute:
            data.startTimeMinute > 9
              ? String(data.startTimeMinute)
              : `0${data.startTimeMinute}`,
          startTimeFoo: data.startTimeHour < 12 ? "AM" : "PM",
          endTimeHour:
            data.endTimeHour % 12 > 9
              ? String(data.endTimeHour % 12)
              : `0${data.endTimeHour % 12}`,
          endTimeMinute:
            data.endTimeMinute > 9
              ? String(data.endTimeMinute)
              : `0${data.endTimeMinute}`,
          endTimeFoo: data.endTimeHour < 12 ? "AM" : "PM",
          attendanceIntervalHour: formatTimeString(
            data.acceptanceAttendanceInterval
          ).split(":")[0],
          attendanceIntervalMinute: formatTimeString(
            data.acceptanceAttendanceInterval
          ).split(":")[1],
        };
        setPayload(p);
        setConfigRead(p);
      })
      .catch((err) => {
        showAlert("ERROR", err);
      });
  };

  const fetchChangeLogs = () => {
    setLogsLoading(true);
    getChangesLogs({ page: currentPage, size: 10 })
      .then((data) => {
        if (Array.isArray(data.data)) {
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

  /**
   ****************************
   * HANDLERS SECTION
   ****************************
   */
  const handleGoBack = () => {
    navigate(-1);
  };

  const handleOpen = () => {
    window.updateCompanyConfigModal.showModal();
  };

  const handleShowChanges = (id) => () => {
    setLogs({
      ...logs,
      logs: logs.logs.map((item) =>
        item.id === id ? { ...item, show: !item.show } : item
      ),
    });
  };

  const handleHourOnChange = (type) => (event) => {
    switch (type) {
      case "clockin": {
        const p = { ...payload, startTimeHour: event.target.value };
        validatePayload(p);
        setPayload(p);
        break;
      }
      case "clockout": {
        const p = { ...payload, endTimeHour: event.target.value };
        validatePayload(p);
        setPayload(p);
        break;
      }
      default:
    }
  };

  const handleMinuteOnChange = (type) => (event) => {
    switch (type) {
      case "clockin": {
        let p = { ...payload, startTimeMinute: event.target.value };
        validatePayload(p);
        setPayload(p);
        break;
      }
      case "clockout": {
        let p = { ...payload, endTimeMinute: event.target.value };
        validatePayload(p);
        setPayload(p);
        break;
      }
      default:
    }
  };

  const handleFooOnChange = (type) => (event) => {
    switch (type) {
      case "clockin": {
        let p = { ...payload, startTimeFoo: event.target.value };
        validatePayload(p);
        setPayload(p);
        break;
      }
      case "clockout": {
        let p = { ...payload, endTimeFoo: event.target.value };
        validatePayload(p);
        setPayload(p);
        break;
      }
      default:
    }
  };

  const handleAttMinuteOnChange = (event) => {
    const p = {
      ...payload,
      attendanceIntervalMinute: event.target.value,
      acceptanceAttendanceInterval: formatKitchenTimeToDuration(
        `${payload.attendanceIntervalHour}:${event.target.value}`
      ),
    };
    validatePayload(p);
    setPayload(p);
  };

  const handleAttHourOnChange = (event) => {
    const p = {
      ...payload,
      attendanceIntervalHour: event.target.value,
      acceptanceAttendanceInterval: formatKitchenTimeToDuration(
        `${event.target.value}:${payload.attendanceIntervalMinute}`
      ),
    };
    validatePayload(p);
    setPayload(p);
  };

  const handleLeaveIntervalOnChange = (event) => {
    const p = {
      ...payload,
      acceptanceLeaveInterval: Number(event.target.value),
    };
    validatePayload(p);
    setPayload(p);
  };

  const handleYearlyQuotaOnChange = (event) => {
    const p = {
      ...payload,
      defaultYearlyQuota: Number(event.target.value),
    };
    validatePayload(p);
    setPayload(p);
  };

  const handleMarriageQuotaOnChange = (event) => {
    const p = {
      ...payload,
      defaultMarriageQuota: Number(event.target.value),
    };
    validatePayload(p);
    setPayload(p);
  };

  /**
   ****************************
   * VALIDATION SECTION
   ****************************
   */
  const validatePayload = (p = payload) => {
    let hasChanges = false;
    for (let key in configRead) {
      if (configRead[key] !== p[key]) {
        hasChanges = true;
        break;
      }
    }

    if (hasChanges) {
      if (p.startTimeFoo === "PM" && p.endTimeFoo === "AM") {
        clockInBtnsRef.current.classList.add("border-red-500", "border", "p-2");
        clockOutBtnsRef.current.classList.add(
          "border-red-500",
          "border",
          "p-2"
        );
        setSubmitDisabled(true);
      } else if (p.startTimeFoo === p.endTimeFoo) {
        if (Number(p.startTimeHour) > Number(p.endTimeHour)) {
          clockInBtnsRef.current.classList.add(
            "border-red-500",
            "border",
            "p-2"
          );
          clockOutBtnsRef.current.classList.add(
            "border-red-500",
            "border",
            "p-2"
          );
          setSubmitDisabled(true);
        } else if (
          Number(p.startTimeHour) === Number(p.endTimeHour) &&
          Number(p.startTimeMinute) > Number(p.endTimeMinute)
        ) {
          clockInBtnsRef.current.classList.add(
            "border-red-500",
            "border",
            "p-2"
          );
          clockOutBtnsRef.current.classList.add(
            "border-red-500",
            "border",
            "p-2"
          );
          setSubmitDisabled(true);
        } else {
          clockInBtnsRef.current.classList.remove(
            "border-red-500",
            "border",
            "p-2"
          );
          clockOutBtnsRef.current.classList.remove(
            "border-red-500",
            "border",
            "p-2"
          );
          setSubmitDisabled(false);
        }
      } else {
        clockInBtnsRef.current.classList.remove(
          "border-red-500",
          "border",
          "p-2"
        );
        clockOutBtnsRef.current.classList.remove(
          "border-red-500",
          "border",
          "p-2"
        );
        setSubmitDisabled(false);
      }
    } else {
      clockInBtnsRef.current.classList.remove(
        "border-red-500",
        "border",
        "p-2"
      );
      clockOutBtnsRef.current.classList.remove(
        "border-red-500",
        "border",
        "p-2"
      );
      setSubmitDisabled(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitDisabled(true);
    setSubmitLoading(true);
    putConfig({
      ...payload,
      startTimeHour:
        payload.startTimeFoo === "PM"
          ? Number(payload.startTimeHour) + 12
          : Number(payload.startTimeHour),
      startTimeMinute: Number(payload.startTimeMinute),
      endTimeHour:
        payload.endTimeFoo === "PM"
          ? Number(payload.endTimeHour) + 12
          : Number(payload.endTimeHour),
      endTimeMinute: Number(payload.endTimeMinute),
    })
      .then(() => {
        window.updateCompanyConfigModal.querySelector("form").submit();
        showAlert(
          "SUCCESS",
          "Successfully saved data. Changes will apply accordingly."
        );
        fetchChangeLogs();
      })
      .catch((err) => {
        showAlert("ERROR", err);
      })
      .finally(() => {
        setSubmitLoading(false);
        setSubmitDisabled(false);
      });
  };

  return {
    values: {
      config: config,
      payload: payload,
      logs: logs.logs,
      paging: logs.paging,
      disabled: submitDisabled,
      submitLoading,
      currentPage,
      logsLoading,
    },
    handlers: {
      pagination: handlePagination,
      goBack: handleGoBack,
      detail: handleShowChanges,
      open: handleOpen,
      hour: handleHourOnChange,
      minute: handleMinuteOnChange,
      attHour: handleAttHourOnChange,
      attMinute: handleAttMinuteOnChange,
      leave: handleLeaveIntervalOnChange,
      yearly: handleYearlyQuotaOnChange,
      marriage: handleMarriageQuotaOnChange,
      foo: handleFooOnChange,
      submit: handleSubmit,
    },
    fetchers: {
      config: fetchConfig,
      logs: fetchChangeLogs,
    },
    refs: {
      submitBtn: submitBtnRef,
      clockInBtns: clockInBtnsRef,
      clockOutBtns: clockOutBtnsRef,
    },
  };
}
