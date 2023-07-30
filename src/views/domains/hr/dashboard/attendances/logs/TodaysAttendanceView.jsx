import { AiFillCaretDown } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";

import EmployeeAttendanceLogTable2 from "../../../../../../components/tables/EmployeeAttendanceLogTable2";

export default function TodaysAttendanceView({ values, handlers }) {
  return (
    <div className="body-container">
      <div className="flex flex-row w-full justify-between">
        <h1 className="text-2xl font-semibold mb-4">Today's Attendance Log</h1>
        <div className="flex flex-row gap-4 self-end justify-evenly items-center">
          {/* STATUS */}
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn hover:bg-transparent bg-transparent button-border-custom normal-case m-1 inline-flex flex-row"
            >
              <p className="text-secondary-normal font-bold dark:text-white body-container-color">
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
                    className="accent-secondary-normal body-container-color-button w-6 h-6"
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
                    className="accent-secondary-normal body-container-color-button w-6 h-6"
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
                    className="accent-secondary-normal body-container-color-button w-6 h-6"
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
      <EmployeeAttendanceLogTable2
        attendances={values.attendances}
        paging={values.paging}
        loading={values.loading}
        paginationCallback={handlers.pagination}
        size={10}
      />
    </div>
  );
}
