import { useContext, useState } from "react";
import { NotifContext } from "../../../../../app/context/notif";
import { getJobs } from "../../../../../app/services/api/public";
import { getAllEmployeesForStaff } from "../../../../../app/services/api/employee";

const sortArr = ["ASC", "DESC"];

const initEmployees = {
  employees: [],
  paging: {},
};

const initQuery = {
  jobId: "ALL",
  fullName: "",
  jobName: "ALL",
  sortIndex: 0,
  page: 1,
  size: 10,
};

export default function EmployeeListModel() {
  const { showAlert } = useContext(NotifContext);
  const [query, setQuery] = useState(initQuery);
  const [employees, setEmployees] = useState(initEmployees);
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);

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

  const fetchEmployeeList = () => {
    setLoading(true);
    getAllEmployeesForStaff({
      ...query,
      jobId: query.jobId !== "ALL" ? query.jobId : "",
      sort: sortArr[query.sortIndex],
    })
      .then((data) => {
        setEmployees({ employees: data.data, paging: data.paging });
      })
      .catch((err) => {
        console.error(err);
        showAlert("ERROR", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /**
   ****************************
   * HANDLERS SECTION
   ****************************
   */
  const handleSearchNameOnChange = (event) => {
    setQuery({ ...query, fullName: event.target.value });
  };

  const handleSearchNameTyping = (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Backspace") {
      fetchEmployeeList({ ...query, fullName: "" });
    } else if (event.key === "Backspace" && event.target.value === "") {
      fetchEmployeeList({ ...query, fullName: "" });
    }
  };

  const handleJobIdOnChange = (event) => {
    if (event.target.value === "ALL") {
      setQuery({
        ...query,
        jobId: event.target.value,
        jobName: event.target.value,
        page: 1,
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

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchEmployeeList({ ...query, page: 1 });
  };

  const handlePagination = (event) => {
    setQuery({ ...query, page: query.page + Number(event.target.value) });
  };

  return {
    values: {
      employees: employees.employees,
      paging: employees.paging,
      currentPage: query.page,
      jobs,
      query,
      loading,
    },
    handlers: {
      pagination: handlePagination,
      search: handleSearchNameOnChange,
      submit: handleSubmit,
      typing: handleSearchNameTyping,
      job: handleJobIdOnChange,
    },
    fetchers: {
      employees: fetchEmployeeList,
      jobs: fetchJobs,
    },
  };
}
