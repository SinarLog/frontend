/* eslint-disable default-case */
import { z } from "zod";
import { useContext, useState } from "react";
import { NotifContext } from "../../../../../app/context/notif";
import {
  getIncomingOvertimeSubmissionDetailForManager,
  getIncomingOvertimeSubmissionsForManager,
  getIncomingProposalDetailForManager,
  getIncomingProposalsForManager,
  saveLeaveProposalActionByManager,
  saveOvertimeSubmissionActionByHr,
} from "../../../../../app/services/api/proposal";

const initQuery = {
  page: 1,
  size: 5,
  month: "START",
  year: "START",
  name: "",
};

const initLeave = {
  proposals: [],
  paging: {},
};

const initOvertimes = {
  overtimes: [],
  paging: {},
};

const initState = {
  loading: true,
  detailLoading: false,
  disabled: true,
};

const initProposalPayload = {
  id: "",
  approved: null,
  reason: "",
  childs: [],
};

const initOvertimePayload = {
  id: "",
  approved: null,
  reason: "",
};

export default function ProposalModel() {
  const { showAlert } = useContext(NotifContext);
  const [proposals, setProposals] = useState(initLeave);
  const [proposalDetail, setProposalDetail] = useState(null);
  const [proposalPayload, setProposalPayload] = useState(initProposalPayload);
  const [proposalsState, setProposalsState] = useState(initState);
  const [tab, setTab] = useState(0);
  const [proposalQuery, setProposalQuery] = useState(initQuery);
  const [overtimes, setOvertimes] = useState(initOvertimes);
  const [overtimeQuery, setOvertimeQuery] = useState(initQuery);
  const [overtimeState, setOvertimeState] = useState(initState);
  const [overtimeDetail, setOvertimeDetail] = useState(null);
  const [overtimePayload, setOvertimePayload] = useState(initOvertimePayload);

  // console.log(query);
  // console.log(proposalDetail);
  // console.log(proposalPayload);
  // console.log(tab);
  // console.log(leaveCurrentPage);
  // console.log(overtimes);
  // console.log(overtimePayload);

  /**
   ****************************
   * FETCHERS SECTION
   ****************************
   */
  const fetchProposals = (q = proposalQuery) => {
    setProposalsState({ ...proposalsState, loading: true });
    getIncomingProposalsForManager({
      ...q,
      month: q.month === "START" || q.month === "NONE" ? null : Number(q.month),
      year: q.year === "START" || q.year === "NONE" ? null : Number(q.year),
    })
      .then((data) => {
        setProposals({ proposals: data.data, paging: data.paging });
      })
      .catch((err) => {
        showAlert("ERROR", err);
      })
      .finally(() => {
        setProposalsState({ ...proposalsState, loading: false });
      });
  };

  const fetchProposalDetail = (id) => {
    setProposalsState({ ...proposalsState, detailLoading: true });
    getIncomingProposalDetailForManager(id)
      .then((data) => {
        setProposalDetail(data);
        setProposalPayload({
          id: data.id,
          approved: null,
          reason: "",
          childs: data.childs
            ? data.childs.map((item) => ({
                id: item.id,
                approved: null,
                reason: "",
              }))
            : [],
        });
      })
      .catch((err) => {
        showAlert("ERROR", err);
      })
      .finally(() => {
        setProposalsState({ ...proposalsState, detailLoading: false });
      });
  };

  const fetchOvertimes = (q = overtimeQuery) => {
    setOvertimeState({ ...overtimeState, loading: true });
    getIncomingOvertimeSubmissionsForManager(q)
      .then((data) => {
        setOvertimes({ overtimes: data.data, paging: data.paging });
      })
      .catch((err) => {
        showAlert("ERROR", err);
      })
      .finally(() => {
        setOvertimeState({ ...overtimeState, loading: false });
      });
  };

  const fetchOvertimeDetail = (id) => {
    setOvertimeState({ ...overtimeState, detailLoading: true });
    getIncomingOvertimeSubmissionDetailForManager(id)
      .then((data) => {
        setOvertimeDetail(data);
        setOvertimePayload({
          id: data.id,
          approved: null,
          reason: "",
        });
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
   * LEAVES
   ****************************
   */
  const handleLeaveNameSearchOnChange = (event) => {
    setProposalQuery({ ...proposalQuery, name: event.target.value });
  };

  const handleNameSearchOnSubmit = (event) => {
    event.preventDefault();
    fetchProposals({ ...proposalQuery, page: 1 });
  };

  const handleLeaveMonthOnChange = (event) => {
    switch (event.target.value) {
      case "NONE":
        fetchProposals({
          ...proposalQuery,
          month: "START",
          year: "START",
          page: 1,
        });
        setProposalQuery({
          ...proposalQuery,
          month: "START",
          year: "START",
          page: 1,
        });
        break;
      default:
        if (proposalQuery.year !== "NONE" && proposalQuery.year !== "START") {
          fetchProposals({
            ...proposalQuery,
            month: Number(event.target.value),
            page: 1,
          });
        }
        setProposalQuery({
          ...proposalQuery,
          month: Number(event.target.value),
          page: 1,
        });
    }
  };

  const handleLeaveYearOnChange = (event) => {
    switch (event.target.value) {
      case "NONE":
        fetchProposals({ ...proposalQuery, month: "START", year: "START" });
        setProposalQuery({ ...proposalQuery, month: "START", year: "START" });
        break;
      default:
        if (proposalQuery.month !== "NONE" && proposalQuery.month !== "START") {
          fetchProposals({
            ...proposalQuery,
            year: Number(event.target.value),
          });
        }
        setProposalQuery({
          ...proposalQuery,
          year: Number(event.target.value),
        });
    }
  };

  const handleProposalSeeDetail = (event) => {
    window.incomingLeaveProposalDetail.showModal();
    fetchProposalDetail(event.target.value);
  };

  const handleActionProposal = (event) => {
    const arr = event.target.name.split("-");
    const type = arr[1];
    switch (type) {
      case "parent": {
        const payload = {
          ...proposalPayload,
          approved: arr[2] === "reject" ? false : true,
        };
        if (!payload.approved) {
          if (payload.childs.length) {
            payload.childs = payload.childs.map((item) => ({
              ...item,
              approved: false,
            }));
          }
        }
        setProposalPayload(payload);
        validateLeaveProposalSubmitDisabled(payload);
        break;
      }
      case "child": {
        if (proposalPayload.approved === false) {
          return;
        }
        const index = arr[2];
        const payload = {
          ...proposalPayload,
          childs: proposalPayload.childs.map((item, i) => {
            // eslint-disable-next-line eqeqeq
            if (i == index) {
              return { ...item, approved: arr[3] === "reject" ? false : true };
            } else {
              return item;
            }
          }),
        };
        setProposalPayload(payload);
        validateLeaveProposalSubmitDisabled(payload);
        break;
      }
      default:
    }
  };

  const handleParentRejectionReasonOnChange = (event) => {
    const payload = { ...proposalPayload, reason: event.target.value };
    if (!z.string().min(20).max(1000).safeParse(event.target.value).success) {
      event.target.classList.add("border-red-500");
    } else {
      event.target.classList.remove("border-red-500");
    }
    setProposalPayload(payload);
    validateLeaveProposalSubmitDisabled(payload);
  };

  const handleChildRejectionReasonOnChange = (index) => (event) => {
    const payload = {
      ...proposalPayload,
      childs: proposalPayload.childs.map((item, i) => {
        if (i === index) {
          return { ...item, reason: event.target.value };
        }
        return item;
      }),
    };
    if (!z.string().min(20).max(1000).safeParse(event.target.value).success) {
      event.target.classList.add("border-red-500");
    } else {
      event.target.classList.remove("border-red-500");
    }
    setProposalPayload(payload);
    validateLeaveProposalSubmitDisabled(payload);
  };

  /**
   * @param {React.KeyboardEvent<HTMLInputElement>} event
   */
  const handleNameSearchKeydown = (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Backspace") {
      fetchProposals({ ...proposalQuery, name: "" });
    } else if (event.key === "Backspace" && event.target.value === "") {
      fetchProposals({ ...proposalQuery, name: "" });
    }
  };

  const handleLeaveProposalSubmit = () => {
    saveLeaveProposalActionByManager(proposalPayload)
      .then(() => {
        showAlert("SUCCESS", "Your action has been successfully saved");
        fetchProposals();
      })
      .catch((err) => {
        showAlert("ERROR", err);
      })
      .finally(() => {
        window.incomingLeaveProposalDetail.querySelector("form").submit();
      });
  };

  const handleLeavePagination = (event) => {
    setProposalQuery({
      ...proposalQuery,
      page: proposalQuery.page + Number(event.target.value),
    });
  };

  /**
   ****************************
   * HANDLERS SECTION
   *
   * OVERTIMES
   ****************************
   */
  const handleOvertimeNameSearchOnChange = (event) => {
    setOvertimeQuery({ ...overtimeQuery, name: event.target.value });
  };

  const handleOvertimeNameSearchOnSubmit = (event) => {
    event.preventDefault();
    fetchOvertimes({ ...overtimeQuery, page: 1 });
  };

  const handleOvertimeRejectionReasonOnChange = (event) => {
    const p = { ...overtimePayload, reason: event.target.value };
    setOvertimePayload(p);
    validateOvertimeSubmissionSubmitDisabled(p);
  };

  const handleOvertimeSeeDetail = (event) => {
    window.incomingOvertimeSubmissionDetail.showModal();
    fetchOvertimeDetail(event.target.value);
  };

  const handleOvertimeAction = (event) => {
    switch (event.target.name) {
      case "reject": {
        const p = {
          ...overtimePayload,
          approved: false,
        };

        setOvertimePayload(p);
        validateOvertimeSubmissionSubmitDisabled(p);
        break;
      }
      case "approve": {
        const p = {
          ...overtimePayload,
          approved: true,
        };

        setOvertimePayload(p);
        validateOvertimeSubmissionSubmitDisabled(p);
        break;
      }
    }
  };

  const handleOvertimeSubmissionSubmit = () => {
    saveOvertimeSubmissionActionByHr(overtimePayload)
      .then(() => {
        showAlert("SUCCESS", "Your action has been successfully saved");
        fetchOvertimes();
      })
      .catch((err) => {
        showAlert("ERROR", err);
      })
      .finally(() => {
        window.incomingOvertimeSubmissionDetail.querySelector("form").submit();
      });
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
   ****************************
   */
  const handleTabs = (event) => {
    setTab(Number(event.target.value));
  };

  /**
   ****************************
   * VALIDATION SECTION
   ****************************
   */
  const validateLeaveProposalSubmitDisabled = (payload = proposalPayload) => {
    if (!(payload.approved == null)) {
      if (!payload.approved) {
        const res = z.string().min(20).max(1000).safeParse(payload.reason);
        if (!res.success) {
          setProposalsState({ ...proposalsState, disabled: true });
          return;
        }

        for (let item of payload.childs) {
          if (item.approved) {
            setProposalsState({ ...proposalsState, disabled: true });
            return;
          }
        }
      } else {
        for (let item of payload.childs) {
          if (item.approved == null) {
            setProposalsState({ ...proposalsState, disabled: true });
            return;
          } else if (
            !item.approved &&
            !z.string().min(20).max(1000).safeParse(item.reason).success
          ) {
            setProposalsState({ ...proposalsState, disabled: true });
            return;
          }
        }
      }
      setProposalsState({ ...proposalsState, disabled: false });
    }
  };

  const validateOvertimeSubmissionSubmitDisabled = (
    payload = overtimePayload
  ) => {
    setOvertimeState({
      ...overtimeState,
      disabled:
        payload.approved == null
          ? true
          : payload.approved === true
          ? false
          : !z.string().min(20).max(1000).safeParse(payload.reason).success,
    });
  };

  return {
    values: {
      leaves: {
        currentPage: proposalQuery.page,
        proposals: proposals.proposals,
        paging: proposals.paging,
        loading: proposalsState.loading,
        query: proposalQuery,
        detail: proposalDetail,
        detailIsLoading: proposalsState.detailLoading,
        payload: proposalPayload,
        submitDisabled: proposalsState.disabled,
      },
      overtimes: {
        currentPage: overtimeQuery.page,
        overtimes: overtimes.overtimes,
        paging: overtimes.paging,
        query: overtimeQuery,
        detail: overtimeDetail,
        payload: overtimePayload,
        submitDisabled: overtimeState.disabled,
      },
      activeTab: tab,
    },
    handlers: {
      leaves: {
        pagination: handleLeavePagination,
        search: handleLeaveNameSearchOnChange,
        searchSubmit: handleNameSearchOnSubmit,
        typing: handleNameSearchKeydown,
        month: handleLeaveMonthOnChange,
        year: handleLeaveYearOnChange,
        detail: handleProposalSeeDetail,
        action: handleActionProposal,
        parentReason: handleParentRejectionReasonOnChange,
        childReason: handleChildRejectionReasonOnChange,
        actionSubmit: handleLeaveProposalSubmit,
      },
      overtimes: {
        pagination: handleOvertimePagination,
        search: handleOvertimeNameSearchOnChange,
        searchSubmit: handleOvertimeNameSearchOnSubmit,
        reason: handleOvertimeRejectionReasonOnChange,
        detail: handleOvertimeSeeDetail,
        action: handleOvertimeAction,
        actionSubmit: handleOvertimeSubmissionSubmit,
      },
      tabs: handleTabs,
    },
    fetchers: {
      leaves: {
        proposals: fetchProposals,
        detail: fetchProposalDetail,
      },
      overtimes: {
        overtimes: fetchOvertimes,
        detail: fetchOvertimeDetail,
      },
    },
  };
}
