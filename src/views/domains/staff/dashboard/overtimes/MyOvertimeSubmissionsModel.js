import { useContext, useState } from "react";
import {
  getMyOvertimeSubmissions,
  getOvertimeSubmissionDetail,
} from "../../../../../app/services/api/attendance";
import { NotifContext } from "../../../../../app/context/notif";

const initOvertimes = {
  overtimes: [],
  paging: {},
};

const initQuery = {
  status: "all",
  month: "",
  year: "",
  page: 1,
  size: 5,
};

const initState = {
  loading: true,
  detailLoading: false,
};

export default function MyOvertimeSubmissionsModel() {
  const { showAlert } = useContext(NotifContext);
  const [overtimes, setOvertimes] = useState(initOvertimes);
  const [query, setQuery] = useState(initQuery);
  const [state, setState] = useState(initState);
  const [detail, setDetail] = useState(null);

  /**
   ****************************
   * FETCHERS SECTION
   ****************************
   */
  const fetchOvertimes = (q = query) => {
    if (q.month !== "" && q.year !== "") {
      setState({ ...state, loading: true });
      getMyOvertimeSubmissions(q)
        .then((data) => {
          setOvertimes({ overtimes: data.data, paging: data.paging });
        })
        .catch((err) => {
          showAlert("ERROR", err);
        })
        .finally(() => {
          setState({ ...state, loading: false });
        });
    } else if (q.month === "" && q.year === "") {
      setState({ ...state, loading: true });
      getMyOvertimeSubmissions(q)
        .then((data) => {
          setOvertimes({ overtimes: data.data, paging: data.paging });
        })
        .catch((err) => {
          showAlert("ERROR", err);
        })
        .finally(() => {
          setState({ ...state, loading: false });
        });
    }
  };

  const fetchOvertimeDetail = (id) => {
    setState({ ...state, detailLoading: true });
    getOvertimeSubmissionDetail(id)
      .then((data) => {
        setDetail(data);
      })
      .catch((err) => {
        showAlert("ERROR", err);
      })
      .finally(() => {
        setState({ ...state, detailLoading: false });
      });
  };

  /**
   ****************************
   * HANDLERS SECTION
   ****************************
   */
  const handleStatusOnChange = (event) => {
    setQuery({ ...query, status: event.target.value.toLowerCase(), page: 1 });
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

  const handleDetail = (event) => {
    window.overtimeSubmissionDetail.showModal();
    fetchOvertimeDetail(event.target.value);
  };

  const handlePagination = (event) => {
    setQuery({ ...query, page: query.page + Number(event.target.value) });
  };

  return {
    values: {
      paging: overtimes.paging,
      overtimes: overtimes.overtimes,
      currentPage: query.page,
      query,
      state,
      detail,
    },

    handlers: {
      pagination: handlePagination,
      status: handleStatusOnChange,
      month: handleMonthOnChage,
      year: handleYearOnChange,
      detail: handleDetail,
    },

    fetchers: {
      overtimes: fetchOvertimes,
      detail: fetchOvertimeDetail,
    },
  };
}
