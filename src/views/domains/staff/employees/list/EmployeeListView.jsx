/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { BiSearchAlt } from "react-icons/bi";
import EmployeeListModel from "./EmployeeListModel";
import EmployeeListTable from "../../../../../components/tables/EmployeeListTable";

export default function EmployeeListView() {
  const { values, handlers, fetchers } = EmployeeListModel();

  useEffect(() => {
    fetchers.jobs();
  }, []);

  useEffect(() => {
    fetchers.employees();
  }, [values.query.jobId, values.currentPage]);

  return (
    <div className="body-container flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-xl font-bold">Employees List</h1>
        <div className="flex md:flex-row md:self-end md:gap-4 flex-col gap-2">
          {/* Search Bar */}
          <form onSubmit={handlers.submit}>
            <div className="join w-40 md:w-fit">
              <input
                className="input input-bordered join-item md:w-40 w-28 body-container-color"
                placeholder="Search by name"
                onChange={handlers.search}
                value={values.query.fullName}
                onKeyDown={handlers.typing}
              />
              <button
                type="submit"
                className="btn btn-secondary-normal join-item border-slate-700 border-opacity-20 w-12"
              >
                <BiSearchAlt className="text-lg text-white" />
              </button>
            </div>
          </form>

          {/* Dropdown */}
          <div className="form-control">
            <select
              className="select select-bordered text-secondary-normal font-extrabold md:w-fit w-40 body-container-color dark:text-white"
              value={values.query.jobId}
              onChange={handlers.job}
            >
              <option value={"ALL"}>All</option>
              {values.jobs.map(
                (item) =>
                  item.name !== "Human Resource" && (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  )
              )}
            </select>
          </div>
        </div>
      </div>

      <EmployeeListTable
        employees={values.employees}
        paging={values.paging}
        paginationCallback={handlers.pagination}
        withJoinDate={true}
        size={10}
        loading={values.loading}
      />
    </div>
  );
}
