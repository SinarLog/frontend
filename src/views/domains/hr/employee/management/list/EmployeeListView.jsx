/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import EmployeeListModel from "./EmployeeListModel";

// Components
import EmployeeListTable from "../../../../../../components/tables/EmployeeListTable";

export default function EmployeeListView() {
  const { values, fetchers, handlers } = EmployeeListModel();

  useEffect(() => {
    fetchers.employees();
  }, [values.jobId, values.currentPage, values.sortIndex]);

  useEffect(() => {
    fetchers.jobs();
  }, []);

  return (
    <div className="flex flex-col justify-center gap-8">
      <div className="flex flex-row justify-between">
        <h2 className="font-bold text-2xl self-center">
          List of {values.jobName !== "ALL" ? values.jobName : "Employees"}
        </h2>
        <div className="flex lg:flex-row flex-col justify-center items-center gap-4">
          {/* Search Bar */}
          <form onSubmit={handlers.submit}>
            <div className="join">
              <input
                className="input input-bordered body-container-color-button join-item w-40"
                placeholder="Search by name"
                onChange={handlers.search}
                value={values.fullName}
              />
              <button
                type="submit"
                className="btn btn-secondary-normal join-item border-slate-700 border-opacity-20"
              >
                <BiSearchAlt className="text-lg text-white" />
              </button>
            </div>
          </form>

          {/* Dropdown */}
          <div className="form-control">
            <select
              className="select select-bordered body-container-color-button font-extrabold w-fit"
              value={values.jobId}
              onChange={handlers.jobId}
            >
              <option value={"ALL"}>All</option>
              {values.jobs.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Join Date Sort */}
          <button
            className="btn btn-secondary-outline dark:btn-secondary-outline-dark font-extrabold w-fit normal-case"
            onClick={handlers.sort}
          >
            Join date{" "}
            {values.sortIndex ? (
              <AiOutlineArrowDown className="text-lg" />
            ) : (
              <AiOutlineArrowUp className="text-lg" />
            )}
          </button>

          {/* Create Employee Button */}
          <Link
            className="btn btn-secondary-normal normal-case font-bold text-white"
            to="create"
          >
            Create Employee +
          </Link>
        </div>
      </div>

      {/* Table */}
      <EmployeeListTable
        employees={values.employees}
        paging={values.paging}
        paginationCallback={handlers.pagination}
        withJoinDate={true}
        loading={values.loading}
        size={10}
      />
    </div>
  );
}
