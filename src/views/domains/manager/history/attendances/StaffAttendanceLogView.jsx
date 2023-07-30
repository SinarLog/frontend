/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";

import EmployeeAttendanceLogTable from "../../../../../components/tables/EmployeeAttendanceLogTable";

export default function StaffAttendanceLogView({ values, handlers, fetchers }) {
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    fetchers.logs();
  }, [
    values.query.early,
    values.query.late,
    values.query.closed,
    values.query.month,
    values.query.year,
  ]);

  return (
    <div className="body-container">
      <div className="flex flex-row w-full justify-between">
        <h1 className="text-xl font-bold mb-4">My Staffs' Attendance Log</h1>
        <div className="flex flex-row gap-4 self-end justify-evenly items-center">
          {/* Month */}
          <select
            className="select select-bordered body-container-color-button font-extrabold w-fit"
            onChange={handlers.month}
            value={values.query.month}
          >
            <option disabled value="">
              Month
            </option>
            <option value="NONE">None</option>
            {Array(12)
              .fill()
              .map((_, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
          </select>

          {/* Year */}
          <select
            className="select select-bordered body-container-color-button font-extrabold w-fit"
            onChange={handlers.year}
            value={values.query.year}
          >
            <option disabled value="">
              Year
            </option>
            <option value="NONE">None</option>
            {Array(5)
              .fill()
              .map((_, index) => (
                <option key={index} value={currentYear + index + 1 - 5}>
                  {currentYear + index + 1 - 5}
                </option>
              ))}
          </select>

          {/* STATUS */}
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn hover:bg-transparent bg-transparent button-border-custom normal-case m-1 inline-flex flex-row"
            >
              <p className="text-secondary-normal font-bold dark:text-white">
                Status
              </p>
              <AiFillCaretDown className="text-secondary-normal font-bold dark:text-white" />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 max-w-content"
            >
              <li>
                <div className="flex flex-row gap-4 items-center">
                  <input
                    className="accent-secondary-normal text-secondary-normal w-6 h-6"
                    type="checkbox"
                    checked={values.query.late}
                    onChange={handlers.checks(1)}
                  />
                  <p className="font-semibold capitalize">Late Clock In</p>
                </div>
              </li>
              <li>
                <div className="flex flex-row gap-4">
                  <input
                    type="checkbox"
                    checked={values.query.early}
                    onChange={handlers.checks(2)}
                    className="accent-secondary-normal text-secondary-normal w-6 h-6"
                  />
                  <p className="font-semibold capitalize">Early Clock Out</p>
                </div>
              </li>
              <li>
                <div className="flex flex-row gap-4">
                  <input
                    type="checkbox"
                    checked={values.query.closed}
                    onChange={handlers.checks(3)}
                    className="accent-secondary-normal text-secondary-normal w-6 h-6"
                  />
                  <p className="font-semibold capitalize">Closed</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Search Bar */}
          <form onSubmit={handlers.submit}>
            <div className="join">
              <input
                className="input input-bordered body-container-color-button join-item w-40"
                placeholder="Search by name"
                onChange={handlers.name}
                value={values.query.name}
                onKeyDown={handlers.typing}
              />
              <button
                type="submit"
                className="btn btn-secondary-normal join-item border-slate-700 border-opacity-20"
              >
                <BiSearchAlt className="text-lg text-white" />
              </button>
            </div>
          </form>
        </div>
      </div>
      <EmployeeAttendanceLogTable
        attendances={values.attendances}
        paging={values.paging}
        loading={values.loading}
        paginationCallback={handlers.pagination}
        size={10}
      />
    </div>
  );
}
