/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
// Components
import CountUp from "react-countup";
import SmallPeople from "../../../../../components/icons/SmallPeople";
import ClockInIcon from "../../../../../components/icons/clock-in";
import ClockOutIcon from "../../../../../components/icons/clock-out";
import SmallPeopleBlack from "../../../../../components/icons/SmallPeopleBlack";
import AnalyticsModel from "./AnalyticsModel";
import SmallPeopleWhite from "../../../../../components/icons/SmallPeopleWhite";
import SmallPeopleW from "../../../../../components/icons/SmallPeopleW";

export default function AnalyticsView() {
  const { values, fetchers } = AnalyticsModel();

  useEffect(() => {
    fetchers.anal();
  }, []);

  return (
    <div className="flex flex-row justify-between gap-4">
      {/* LEFT */}
      <div className="p-4 body-container w-1/3">
        <div className="inline-flex flex-row justify-between p-2 border-b border-b-[#F3F3F3] mb-2 w-full">
          <h2 className="font-bold text-[#828282]">Total Employees</h2>
          <div className="inline-flex flex-row justify-around w-max gap-4">
            <h4 className="font-bold  ">{values.anal.totalEmployees}</h4>
            {values.isDarkTheme ? <SmallPeopleW /> : <SmallPeople />}
          </div>
        </div>
        <div className="flex flex-row gap-2 justify-between">
          {/* Late Clock In */}
          <div className="flex flex-row justify-start items-center align-middle gap-6 body-container-no-pad pl-4 border-l-8 border-primary-normal">
            <div className="w-8">
              <ClockInIcon />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-[16px] font-bold">Late Clock In</h2>
              <h5>
                <CountUp
                  className="text-[18px] font-bold"
                  end={values.anal.lateClockIns}
                  duration={3}
                />
                {"  "}employees
              </h5>
            </div>
          </div>
          {/* Early Clock Out  */}
          <div className="flex flex-row justify-start items-center align-middle gap-6 body-container-no-pad pl-4 border-l-8 border-primary-normal">
            <div className="w-8">
              <ClockOutIcon />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-[16px] font-bold">Early Clock Out</h2>
              <h5>
                <CountUp
                  className="text-[18px] font-bold w-1/6"
                  end={values.anal.earlyClockOuts}
                  duration={3}
                />
                {"  "}employees
              </h5>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="p-4 body-container w-2/3">
        <div className="p-2 border-b border-b-[#F3F3F3] mb-2 w-full">
          <h2 className="font-bold text-[#828282] inline-flex items-center gap-4">
            Leave Approval{" "}
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="6"
                viewBox="0 0 6 6"
                fill="none"
              >
                <circle cx="3" cy="3" r="3" fill="#4C4C4C" />
              </svg>
            </span>
            {values.anal.currentMonth}
          </h2>
        </div>
        <div className="flex flex-row gap-2 justify-between">
          {/* Approved Unpaid Leave */}
          <div className="flex flex-row justify-start items-center align-middle gap-6 body-container-no-pad pl-4 border-l-8 border-success-normal">
            <div className="w-8">
              {values.isDarkTheme ? <SmallPeopleWhite /> : <SmallPeopleBlack />}
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-[16px] font-bold">Approved Unpaid Leave</h2>
              <h5>
                <CountUp
                  className="text-[18px] font-bold"
                  end={values.anal.approvedUnpaidLeaves}
                  duration={3}
                />
                {"  "}employees
              </h5>
            </div>
          </div>
          {/* Approved Annual and Marriage  */}
          <div className="flex flex-row justify-start items-center align-middle gap-6 body-container-no-pad pl-4 border-l-8 border-success-normal">
            <div className="w-8">
              {values.isDarkTheme ? <SmallPeopleWhite /> : <SmallPeopleBlack />}
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-[16px] font-bold">
                Approved Annual and Marriage
              </h2>
              <h5>
                <CountUp
                  className="text-[18px] font-bold w-1/6"
                  end={values.anal.approvedAnnualMarriageLeaves}
                  duration={3}
                />
                {"  "}employees
              </h5>
            </div>
          </div>
          {/* Sick Leave  */}
          <div className="flex flex-row justify-start items-center align-middle gap-6 body-container-no-pad pl-4 border-l-8 border-success-normal">
            <div className="w-8">
              {values.isDarkTheme ? <SmallPeopleWhite /> : <SmallPeopleBlack />}
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-[16px] font-bold">Sick Leave</h2>
              <h5>
                <CountUp
                  className="text-[18px] font-bold w-1/6"
                  end={values.anal.sickLeaves}
                  duration={3}
                />
                {"  "}employees
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
