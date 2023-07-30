/* eslint-disable default-case */
import { z } from "zod";
import { useContext, useState } from "react";
import { NotifContext } from "../../../../../app/context/notif";
import {
  getIncomingProposalsForHr,
  getIncomingProposalDetailForHr,
  saveLeaveProposalActionByHr,
} from "../../../../../app/services/api/proposal";

const initLeave = {
  proposals: [],
  paging: {},
};

const initQuery = {
  page: 1,
  size: 5,
  month: "",
  year: "",
  name: "",
};

const initPayload = {
  id: "",
  approved: null,
  reason: "",
  childs: [],
};

const initState = {
  loading: true,
  detailLoading: false,
  disabled: true,
};

export default function ProposalModel() {
  const { showAlert } = useContext(NotifContext);
  const [proposals, setProposals] = useState(initLeave);
  const [query, setQuery] = useState(initQuery);
  const [detail, setDetail] = useState(null);
  const [payload, setPayload] = useState(initPayload);
  const [state, setState] = useState(initState);

  // console.log(detail);
  // console.log(state);

  /**
   ****************************
   * FETCHERS SECTION
   ****************************
   */
  const fetchLeaveProposals = (q = query) => {
    setState({ ...state, loading: true });
    getIncomingProposalsForHr(q)
      .then((data) => {
        setProposals({ proposals: data.data, paging: data.paging });
      })
      .catch((err) => {
        showAlert("ERROR", err);
      })
      .finally(() => {
        setState({ ...state, loading: false });
      });
  };

  const fetchLeaveProposalDetail = (id) => {
    setState({ ...state, detailLoading: true });
    getIncomingProposalDetailForHr(id)
      .then((data) => {
        setDetail(data);
        setPayload({
          id: data.id,
          approved: null,
          reason: "",
          childs: data.childs
            ? data.childs
                .filter((item) => item.status === "PENDING")
                .map((item) => ({ id: item.id, approved: null, reason: "" }))
            : [],
        });
      })
      .catch((err) => showAlert("ERROR", err))
      .finally(() => setState({ ...state, detailLoading: false }));
  };

  /**
   ****************************
   * VALIDATION SECTION
   ****************************
   */
  const validateSubmitDisabled = (p = payload) => {
    if (!(p.approved == null)) {
      if (!p.approved) {
        const res = z.string().min(20).max(1000).safeParse(p.reason);
        if (!res.success) {
          setState({ ...state, disabled: true });
          return;
        }

        for (let item of p.childs) {
          if (item.approved) {
            setState({ ...state, disabled: true });
            return;
          }
        }
      } else {
        for (let item of p.childs) {
          if (item.approved == null) {
            setState({ ...state, disabled: true });
            return;
          } else if (
            !item.approved &&
            !z.string().min(20).max(1000).safeParse(item.reason).success
          ) {
            setState({ ...state, disabled: true });
            return;
          }
        }
      }
      setState({ ...state, disabled: false });
    }
  };

  /**
   ****************************
   * HANDLERS SECTION
   ****************************
   */
  const handlePagination = (event) => {
    setQuery({ ...query, page: query.page + Number(event.target.value) });
  };

  const handleMonthOnChange = (event) => {
    switch (event.target.value) {
      case "NONE": {
        const r = { ...query, month: "", year: "", page: 1 };
        fetchLeaveProposals(r);
        setQuery(r);
        break;
      }
      default: {
        const r = { ...query, month: Number(event.target.value), page: 1 };
        if (query.year !== "NONE" && query.year !== "") {
          fetchLeaveProposals(r);
        }
        setQuery(r);
      }
    }
  };

  const handleYearOnChange = (event) => {
    switch (event.target.value) {
      case "NONE": {
        const r = { ...query, month: "", year: "", page: 1 };
        fetchLeaveProposals(r);
        setQuery(r);
        break;
      }
      default: {
        const r = { ...query, year: Number(event.target.value), page: 1 };
        if (query.month !== "NONE" && query.month !== "") {
          fetchLeaveProposals(r);
        }
        setQuery(r);
      }
    }
  };

  const handleNameSearchOnChange = (event) => {
    setQuery({ ...query, name: event.target.value });
  };

  const handleNameSearchSubmit = (event) => {
    event.preventDefault();
    fetchLeaveProposals({ ...query, page: 1 });
  };

  const handleSeeDetailOnClick = (event) => {
    window.incomingLeaveProposalAction.showModal();
    fetchLeaveProposalDetail(event.target.value);
  };

  /**
   * @param {React.KeyboardEvent<HTMLInputElement>} event
   */
  const handleNameSearchKeydown = (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Backspace") {
      fetchLeaveProposals({ ...query, name: "" });
    } else if (event.key === "Backspace" && event.target.value === "") {
      fetchLeaveProposals({ ...query, name: "" });
    }
  };

  const handleActionLeaveProposal = (event) => {
    const arr = event.target.name.split(";");
    const type = arr[0];
    switch (type) {
      case "parent": {
        const p = {
          ...payload,
          approved: arr[1] === "reject" ? false : true,
        };
        if (!p.approved) {
          if (p.childs.length) {
            p.childs = p.childs.map((item) => ({
              ...item,
              approved: false,
            }));
          }
        }
        setPayload(p);
        validateSubmitDisabled(p);
        break;
      }
      case "child": {
        if (payload.approved === false) {
          return;
        }
        const id = arr[1];
        const p = {
          ...payload,
          childs: payload.childs.map((item) => {
            if (item.id === id) {
              return { ...item, approved: arr[2] === "reject" ? false : true };
            } else {
              return item;
            }
          }),
        };
        setPayload(p);
        validateSubmitDisabled(p);
        break;
      }
    }
  };

  const handleParentRejectionReasonOnChange = (event) => {
    const p = { ...payload, reason: event.target.value };
    if (!z.string().min(20).max(1000).safeParse(event.target.value).success) {
      event.target.classList.add("border-red-500");
    } else {
      event.target.classList.remove("border-red-500");
    }
    setPayload(p);
    validateSubmitDisabled(p);
  };

  const handleChildRejectionReasonOnChange = (id) => (event) => {
    const p = {
      ...payload,
      childs: payload.childs.map((item) => {
        if (item.id === id) {
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
    setPayload(p);
    validateSubmitDisabled(p);
  };

  const handleLeaveProposalSubmit = () => {
    saveLeaveProposalActionByHr(payload)
      .then(() => {
        showAlert("SUCCESS", "Your action has been successfully saved");
        fetchLeaveProposals();
      })
      .catch((err) => {
        showAlert("ERROR", err);
      })
      .finally(() => {
        window.incomingLeaveProposalAction.querySelector("form").submit();
      });
  };

  return {
    values: {
      proposals: proposals.proposals,
      paging: proposals.paging,
      detailIsLoading: state.detailLoading,
      submitDisabled: state.disabled,
      loading: state.loading,
      currentPage: query.page,
      query,
      detail,
      payload,
    },
    handlers: {
      pagination: handlePagination,
      month: handleMonthOnChange,
      year: handleYearOnChange,
      typing: handleNameSearchKeydown,
      name: handleNameSearchOnChange,
      searchSubmit: handleNameSearchSubmit,
      detail: handleSeeDetailOnClick,
      action: handleActionLeaveProposal,
      parentReason: handleParentRejectionReasonOnChange,
      childReason: handleChildRejectionReasonOnChange,
      actionSubmit: handleLeaveProposalSubmit,
    },
    fetchers: {
      proposals: fetchLeaveProposals,
    },
  };
}
