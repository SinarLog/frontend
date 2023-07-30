/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

import WhosTakingLeaveModel from "./WhosTakingLeaveModel";

// Components
import TableAvatar from "../../../../../components/avatars/TableAvatar";
import TablePlaceholderAvatar from "../../../../../components/avatars/TablePlaceholderAvatar";
import WhosOnLeaveCalendarTable from "../../../../../components/calendars/WhosOnLeaveCalendarTable";

// Constant
import {
  DAY_NAME,
  MONTH_NAME,
  ROLE_CODE_NAME_MAPPER,
} from "../../../../../app/utils/constants";

export default function WhosTakingLeaveView() {
  const { values, handlers, fetchers } = WhosTakingLeaveModel();

  useEffect(() => {
    fetchers.calendar();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-2 body-container">
      <div className="col-span-3">
        <div className="inline-flex flex-row gap-8 mb-4 align-top items-center">
          <h2 className="text-black dark:text-white text-xl font-bold">
            {MONTH_NAME[values.query.month - 1]}, {values.query.year}
          </h2>
          <div className="flex flex-row">
            <button
              className="btn btn-ghost w-8 h-min p-0"
              onClick={handlers.anchor(-1)}
            >
              <IoIosArrowBack className="text-dark dark:text-white text-lg" />
            </button>
            <button
              className="btn btn-ghost w-8 h-min p-0"
              onClick={handlers.anchor(1)}
            >
              <IoIosArrowForward className="text-dark dark:text-white text-lg" />
            </button>
          </div>
        </div>

        {/* CALENDAR */}
        <WhosOnLeaveCalendarTable
          calendars={values.calendars}
          days={values.days}
          loading={values.loading}
          detailCallback={handlers.detail}
        />
      </div>
      <div className="h-full flex flex-col gap-4 p-4">
        <h2 className="text-2xl font-bold">Who's on Leave</h2>

        {/* DETAILS */}
        {values.detail != null ? (
          <>
            <p>
              <span className="capitalize">
                {DAY_NAME[values.detail?.fullDate?.getDay()]}
              </span>
              {`, ${
                MONTH_NAME[values.detail?.fullDate?.getMonth()]
              } ${values.detail?.fullDate?.getDate()} ${values.detail?.fullDate?.getFullYear()}`}
            </p>
            {values.detail.employees.length ? (
              <div className="overflow-x-scroll">
                <table className="table">
                  <thead>
                    <tr>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {values.detail.employees.map((item) => (
                      <tr>
                        <td>
                          <div className="flex items-center space-x-3">
                            {item?.avatar ? (
                              <TableAvatar>
                                <img src={item?.avatar} alt="Employee Avatar" />
                              </TableAvatar>
                            ) : (
                              <TablePlaceholderAvatar
                                fullName={item?.fullName}
                                role="staff"
                              />
                            )}
                            <div>
                              <div className="font-bold">{item?.fullName}</div>
                              <div className="text-sm opacity-50">
                                {ROLE_CODE_NAME_MAPPER[item.role]}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="capitalize">
                          {item.type.toLowerCase()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="mt-4 h-20">
                <p className="text-center w-full mt-4">No employees</p>
              </div>
            )}
          </>
        ) : (
          <p>--,-- -- -- </p>
        )}
      </div>
    </div>
  );
}
