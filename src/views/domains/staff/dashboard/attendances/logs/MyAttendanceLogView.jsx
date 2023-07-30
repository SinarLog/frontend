import MyAttendanceLogTable from "../../../../../../components/tables/MyAttendanceLogTable";
import { AiFillCaretDown } from "react-icons/ai";

export default function MyAttendanceLogView({ values, handlers, refs }) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="body-container">
      <div className="flex flex-row w-full justify-between">
        <h1 className="text-xl font-bold mb-4">My Attendances Log</h1>
        <div className="flex flex-row gap-4 self-end justify-evenly items-center">
          {/* Month */}
          <select
            className="select select-bordered text-secondary-normal font-extrabold w-fit dark:text-white body-container-color"
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
            className="select select-bordered text-secondary-normal font-extrabold w-fit dark:text-white body-container-color"
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
        </div>
      </div>
      <MyAttendanceLogTable
        attendances={values.attendances}
        paging={values.paging}
        loading={values.loading}
        paginationCallback={handlers.pagination}
        size={10}
      />
    </div>
  );
}
