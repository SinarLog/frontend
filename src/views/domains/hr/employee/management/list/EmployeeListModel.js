import { useContext, useState } from "react";
import { getJobs } from "../../../../../../app/services/api/public";
import { NotifContext } from "../../../../../../app/context/notif";
import { getAllEmployees } from "../../../../../../app/services/api/employee";

const sortArr = ["ASC", "DESC"];

const initQuery = {
  jobId: "ALL",
  fullName: "",
  jobName: "ALL",
  sortIndex: 0,
  size: 10,
  page: 1,
};

const initData = {
  employees: [],
  paging: {},
};

export default function EmployeeListModel() {
  const { showAlert } = useContext(NotifContext);
  const [query, setQuery] = useState(initQuery);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(initData);
  const [jobs, setJobs] = useState([]);

  /**
   ****************************
   * HANDLERS SECTION
   ****************************
   */
  const handleSearchNameOnChange = (event) => {
    setQuery({ ...query, fullName: event.target.value });
  };

  const handleJobIdOnChange = (event) => {
    if (event.target.value === "ALL") {
      setQuery({
        ...query,
        page: 1,
        jobId: event.target.value,
        jobName: event.target.value,
      });
    } else {
      const job = jobs.find((item) => item.id === event.target.value);
      setQuery({
        ...query,
        jobId: event.target.value,
        jobName: job.name,
        page: 1,
      });
    }
  };

  const handleJoinDateOnChange = () => {
    setQuery({ ...query, sortIndex: (query.sortIndex + 1) % sortArr.length });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchEmployeeList({ ...query, page: 1 });
  };

  const handlePagination = (event) => {
    setQuery({ ...query, page: query.page + Number(event.target.value) });
  };

  /**
   ****************************
   * FETCHERS SECTION
   ****************************
   */
  const fetchJobs = () => {
    getJobs()
      .then((data) => setJobs(data))
      .catch((err) => showAlert("ERROR", err));
  };

  const fetchEmployeeList = (q = query) => {
    setLoading(true);
    getAllEmployees({
      ...q,
      jobId: query.jobId !== "ALL" ? query.jobId : "",
      fullName: query.fullName,
      sort: sortArr[query.sortIndex],
    })
      .then((data) => {
        setData({ employees: data.data, paging: data.paging });
      })
      .catch((err) => showAlert("ERROR", err))
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    values: {
      jobId: query.jobId,
      jobName: query.jobName,
      fullName: query.fullName,
      employees: data.employees,
      paging: data.paging,
      currentPage: query.page,
      jobs: jobs,
      sortArr: sortArr,
      sortIndex: query.sortIndex,
      loading: loading,
    },
    handlers: {
      search: handleSearchNameOnChange,
      jobId: handleJobIdOnChange,
      sort: handleJoinDateOnChange,
      submit: handleSubmit,
      pagination: handlePagination,
    },
    fetchers: {
      jobs: fetchJobs,
      employees: fetchEmployeeList,
    },
  };
}
