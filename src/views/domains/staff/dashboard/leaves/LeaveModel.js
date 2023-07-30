import dayjs from "dayjs";
import { z } from "zod";
import { useContext, useRef, useState } from "react";
import {
  applyLeave,
  getMyLeaveDetail,
  getMyLeaveRequest,
  requestLeave,
} from "../../../../../app/services/api/leave";
import { NotifContext } from "../../../../../app/context/notif";
import { getMyBiodata } from "../../../../../app/services/api/employee";
import { useSelector } from "react-redux";
import { ConfigContext } from "../../../../../app/context/config";

const initList = {
  leaves: [],
  paging: {},
};

const initQuery = {
  page: 1,
  size: 5,
  month: "",
  year: "",
  status: "",
};

const initBiodata = {
  maritalStatus: false,
};

const initRequest = {
  type: "",
  dates: { startDate: null, endDate: null },
  reason: "",
  minDate: null,
  startFrom: null,
  attachment: null,
  overflows: [],
};

const initRequestState = {
  submitDisabled: true,
  checkDisabled: true,
};

export default function LeaveModel(callback) {
  const user = useSelector((state) => state.currentUser);
  const { showAlert } = useContext(NotifContext);
  const { config } = useContext(ConfigContext);
  const [query, setQuery] = useState(initQuery);
  const [list, setList] = useState(initList);
  const [detail, setDetail] = useState(null);
  const [detailIsLoading, setDetailIsLoading] = useState(false);
  const [detailBackId, setDetailBackId] = useState("NULL");
  const [listLoading, setListLoading] = useState(true);
  const [request, setRequest] = useState(initRequest);
  const [reqState, setReqState] = useState(initRequestState);
  const [biodata, setBiodata] = useState(initBiodata);
  const [toggleOverflow, setToggleOverflow] = useState(false);
  const [report, setReport] = useState(null);
  const requestModal = useRef(null);
  const dateRef = useRef(null);
  const attachmentRef = useRef(null);
  const isManager = user.role.code === "mngr";

  // console.log(request);
  // console.log(report);
  // console.log(config);
  // console.log(reqState);

  /**
   ****************************
   * VALIDATORS SECTION
   ****************************
   */
  const isCheckDisabled = (req = request, rep = report) => {
    let submitDisabled = true;
    const check = z
      .object({
        reason: z.string().min(20).max(1000),
        type: z.string().min(1),
        dates: z.object({ startDate: z.string(), endDate: z.string() }),
      })
      .safeParse(req);

    if (rep) {
      if (rep?.isLeaveLeakage === true) {
        let sum = 0;
        req.overflows.forEach((item) => {
          if (item.checked) {
            sum += Number(item.count);
          }
        });

        if (sum === rep?.excessLeaveDuration) {
          submitDisabled = false;
        }
      } else if (rep.isLeaveLeakage === false) {
        submitDisabled = false;
      }
    }

    setReqState({
      submitDisabled:
        submitDisabled === false ? false : submitDisabled || !check.success,
      checkDisabled: !check.success,
    });
  };

  /**
   ****************************
   * HANDLERS SECTION
   *
   * LIST
   ****************************
   */
  const handleLeaveStatusOnChange = (event) => {
    setQuery({
      ...query,
      status: event.target.value.toLowerCase(),
      page: 1,
    });
  };

  const handleLeaveMonthOnChage = (event) => {
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

  const handleLeaveYearOnChange = (event) => {
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
    setQuery({
      ...query,
      page: query.page + Number(event.target.value),
    });
  };

  /**
   ****************************
   * HANDLERS SECTION
   ****************************
   */
  const handleRequestLeaveOnClick = (event) => {
    event.stopPropagation();
    window.leaveRequestModal.showModal();
  };

  const handleLeaveTypeOnChange = (event) => {
    let state = {
      ...request,
      type: event.target.value,
    };
    if (report != null) {
      if (event.target.value !== "SICK") {
        state = {
          ...state,
          minDate: dayjs(new Date())
            .add(config?.acceptedLeaveInterval, "day")
            .toDate(),
          startFrom: dayjs(new Date())
            .add(config?.acceptedLeaveInterval, "day")
            .toDate()
            .toDateString(),
        };
      } else {
        state = {
          ...state,
          minDate: null,
          startFrom: null,
        };
      }
      setRequest({ ...state, dates: { startDate: null, endDate: null } });
      setReqState({ checkDisabled: true, submitDisabled: true });
      setReport(null);
    } else {
      if (event.target.value !== "SICK") {
        state = {
          ...state,
          minDate: dayjs(new Date())
            .add(config?.acceptedLeaveInterval, "day")
            .toDate(),
          startFrom: dayjs(new Date())
            .add(config?.acceptedLeaveInterval, "day")
            .toDate()
            .toDateString(),
        };
      } else {
        state = {
          ...state,
          minDate: null,
          startFrom: null,
        };
      }
      setRequest(state);
    }
  };

  const handleResetRequest = () => {
    setRequest(initRequest);
    setReport(null);
    setReqState(initRequestState);
  };

  const handleLeaveDateOnChange = (val) => {
    const res = z
      .object({ startDate: z.string(), endDate: z.string() })
      .required({ startDate: true })
      .safeParse(val);
    if (res.success) {
      dateRef.current.classList.remove("border-red-500");
    } else {
      dateRef.current.classList.add("border-red-500");
    }
    if (report != null) {
      setReport(null);
    }
    setRequest({ ...request, dates: val });
    isCheckDisabled();
  };

  const handleReasonOnChange = (event) => {
    setRequest({ ...request, reason: event.target.value });
    isCheckDisabled({ ...request, reason: event.target.value });
  };

  const handleAttachmentOnChange = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const fileTypes = ["png", "pdf", "jpg", "jpeg"];
    if (event.target.files != null && event.target.files[0] != null) {
      const file = event.target.files[0];
      if (fileTypes.includes(file.type.split("/")[1])) {
        if (file.size <= 5e6) {
          setRequest({ ...request, attachment: event.target.files });
        } else {
          showAlert("ERROR", "File size is too large");
        }
      } else {
        showAlert("ERROR", "File type is not acceptable");
      }
    }
  };

  const handleOverflowCountOnSelected = (index) => (event) => {
    const newRequest = {
      ...request,
      overflows: request.overflows.map((item, i) =>
        index === i ? { ...item, checked: event.target.checked } : item
      ),
    };
    setRequest(newRequest);
    isCheckDisabled(newRequest);
  };

  const handleOverflowCountOnChange = (index) => (event) => {
    if (!isNaN(event.target.value)) {
      const newRequest = {
        ...request,
        overflows: request.overflows.map((item, i) =>
          index === i ? { ...item, count: Number(event.target.value) } : item
        ),
      };
      setRequest(newRequest);
      isCheckDisabled(newRequest);
    }
  };

  const datesOnClick = () => {
    setToggleOverflow(true);
  };

  const handleSeeDetailOnClick = (event) => {
    fetchMyLeaveDetail(event.target.value);
    setDetailBackId("NULL");
    window.leaveDetailModal.showModal();
  };

  const handleDetailBackOnClick = (backId) => {
    const splitted = backId.split(";");
    const parentId = splitted[1];
    setDetailBackId("NULL");
    window.leaveDetailModal.querySelector("form").submit();
    fetchMyLeaveDetail(parentId);
    window.leaveDetailModal.showModal();
  };

  const handleChildOnClick = (event) => {
    const splitted = event.target.value?.split(";");
    const parentId = splitted[0];
    const childId = splitted[1];
    setDetailBackId(`${childId};${parentId}`);
    window.leaveDetailModal.querySelector("form").submit();
    fetchMyLeaveDetail(childId);
    window.leaveDetailModal.showModal();
  };

  const handleCheckLeaveRequest = () => {
    requestLeave({
      from: request.dates.startDate,
      to: request.dates.endDate,
      reason: request.reason,
      type: request.type,
    })
      .then((data) => {
        let r = request;
        setReport(data);
        setReqState({ ...reqState, submitDisabled: true });
        if (data.isLeaveLeakage) {
          r = {
            ...r,
            overflows: data.availables.map((item) => {
              return {
                type: item.type.toUpperCase(),
                count: 0,
                checked: false,
              };
            }),
          };
          setRequest(r);
        }
        isCheckDisabled(r, data);
      })
      .catch((e) => {
        showAlert("ERROR", e);
      });
  };

  const handleSubmit = () => {
    // const ov = request.overflows.filter((item) => Number(item.count) !== 0);
    const ov = request.overflows.filter((item) => item.checked);
    const payload = {
      parent: {
        from: request.dates.startDate,
        to: request.dates.endDate,
        reason: request.reason,
        type: request.type,
      },
      overflows: ov.map((item) => {
        return {
          type: item.type.toUpperCase(),
          count: Number(item.count),
        };
      }),
    };

    const form = new FormData();
    form.append("leave", JSON.stringify(payload));

    // Checks if there is an attachment
    if (request.attachment) {
      form.append("attachment", request.attachment[0]);
    }

    applyLeave(form)
      .then(() => {
        requestModal.current.querySelector("form").submit();
        fetchMyLeaveRequests();
        callback();
        setReport(null);
        setReqState(initRequestState);
        setRequest(initRequest);
        window.successApplyLeaveModal.showModal();
      })
      .catch((err) => {
        showAlert("ERROR", err);
      });
  };

  /**
   ****************************
   * FETCHERS SECTION
   ****************************
   */
  const fetchMyLeaveRequests = (q = query) => {
    if (q.month !== "" && q.year !== "") {
      setListLoading(true);
      getMyLeaveRequest(query)
        .then((data) => {
          setList({ leaves: data.data, paging: data.paging });
        })
        .catch((err) => {
          showAlert("ERROR", err);
        })
        .finally(() => {
          setListLoading(false);
        });
    } else if (q.month === "" && q.year === "") {
      setListLoading(true);
      getMyLeaveRequest(query)
        .then((data) => {
          setList({ leaves: data.data, paging: data.paging });
        })
        .catch((err) => {
          showAlert("ERROR", err);
        })
        .finally(() => {
          setListLoading(false);
        });
    }
  };

  const fetchBiodata = () => {
    getMyBiodata(user.id)
      .then((data) => {
        setBiodata(data);
      })
      .catch((err) => showAlert(err));
  };

  const fetchMyLeaveDetail = (id) => {
    setDetailIsLoading(true);
    getMyLeaveDetail(id)
      .then((data) => {
        setDetail(data);
        setDetailIsLoading(false);
      })
      .catch((err) => {
        showAlert("ERROR", err);
        setDetailIsLoading(false);
      });
  };

  /**
   ****************************
   * BLURS SECTION
   ****************************
   */
  const leaveTypeOnBlur = (event) => {
    if (event.target.value === "") {
      event.target.classList.add("border-red-500");
    } else {
      event.target.classList.remove("border-red-500");
    }
  };

  const datesOnBlur = (event) => {
    const res = z
      .object({ startDate: z.string(), endDate: z.string() })
      .required({ startDate: true })
      .safeParse(request.dates);
    if (res.success) {
      event.target.classList.remove("border-red-500");
    } else {
      event.target.classList.add("border-red-500");
    }
    setToggleOverflow(false);
    isCheckDisabled();
  };

  const reasonOnBlur = (event) => {
    const res = z.string().min(20).max(1000).safeParse(event.target.value);
    if (res.success) {
      event.target.classList.remove("border-red-500");
    } else {
      event.target.classList.add("border-red-500");
    }
    isCheckDisabled();
  };

  return {
    values: {
      list: {
        leaves: list.leaves,
        paging: list.paging,
        loading: listLoading,
        currentPage: query.page,
        detail,
        backId: detailBackId,
        isManager,
        detailIsLoading,
        query,
      },
      request: {
        biodata,
        request,
        state: reqState,
        report,
        toggleOverflow,
      },
    },
    handlers: {
      request: {
        request: handleRequestLeaveOnClick,
        overflowCount: handleOverflowCountOnChange,
        overflowChecked: handleOverflowCountOnSelected,
        type: handleLeaveTypeOnChange,
        reset: handleResetRequest,
        date: handleLeaveDateOnChange,
        reason: handleReasonOnChange,
        attachment: handleAttachmentOnChange,
        check: handleCheckLeaveRequest,
        submit: handleSubmit,
        toggle: datesOnClick,
      },
      list: {
        pagination: handlePagination,
        detail: handleSeeDetailOnClick,
        child: handleChildOnClick,
        back: handleDetailBackOnClick,
        status: handleLeaveStatusOnChange,
        month: handleLeaveMonthOnChage,
        year: handleLeaveYearOnChange,
      },
    },
    refs: {
      request: requestModal,
      date: dateRef,
      attachment: attachmentRef,
    },
    fetchers: {
      list: fetchMyLeaveRequests,
      biodata: fetchBiodata,
      detail: fetchMyLeaveDetail,
    },
    blurs: {
      type: leaveTypeOnBlur,
      dates: datesOnBlur,
      reason: reasonOnBlur,
    },
  };
}
