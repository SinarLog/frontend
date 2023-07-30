/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import AnalyticsModel from "./AnalyticsModel";

// Components
import CountUp from "react-countup";
import DocumentIcon from "../../../../../components/icons/document";
import ClockInIcon from "../../../../../components/icons/clock-in";
import ClockOutIcon from "../../../../../components/icons/clock-out";
import DocumnetListIcon from "../../../../../components/icons/document-list";

export default function AnalyticsView({ toggleCallback }) {
  const { values, fetchers } = AnalyticsModel();

  useEffect(() => {
    fetchers.anal();
  }, [
    values.anal.earlyClockOuts,
    values.anal.lateClockIns,
    values.anal.unpaidCount,
    values.anal.yearlyCount,
    toggleCallback,
  ]);

  return (
    <div className="md:grid lg:grid-cols-4 md:grid-cols-2 md:grid-flow-row flex flex-col gap-4">
      {/* Leave Allowance */}
      <div className="flex flex-row justify-start items-center align-middle gap-6 body-container-no-pad pl-4 border-l-8 border-success-normal">
        <div className="w-8">
          <DocumentIcon />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold">Leave Allowance</h2>
          <h5>
            <CountUp
              className="text-2xl font-bold"
              end={values.anal.yearlyCount}
              duration={values.dur}
            />
            {"  "}days
          </h5>
        </div>
      </div>
      {/* Late Clock In */}
      <div className="flex flex-row justify-start items-center align-middle gap-6 body-container-no-pad pl-4 border-l-8 border-primary-normal">
        <div className="w-8">
          <ClockInIcon />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">Late Clock In</h2>
          <h5>
            <CountUp
              className="text-2xl font-bold"
              end={values.anal.lateClockIns}
              duration={values.dur}
            />
            {"  "}times this month
          </h5>
        </div>
      </div>
      {/* Early Clock Out  */}
      <div className="flex flex-row justify-start items-center align-middle gap-6 body-container-no-pad pl-4 border-l-8 border-primary-normal">
        <div className="w-8">
          <ClockOutIcon />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">Early Clock Out</h2>
          <h5>
            <CountUp
              className="text-2xl font-bold w-1/6"
              end={values.anal.earlyClockOuts}
              duration={values.dur}
            />
            {"  "}times this month
          </h5>
        </div>
      </div>
      {/* Unpaid Count */}
      <div className="flex flex-row justify-start items-center align-middle gap-6 body-container-no-pad pl-4 border-l-8 border-warning-normal">
        <div className="w-8">
          <DocumnetListIcon />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">Unpaid Leave</h2>
          <h5>
            <CountUp
              className="text-2xl font-bold"
              end={values.anal.unpaidCount}
              duration={values.dur}
            />
            {"  "}this month
          </h5>
        </div>
      </div>
    </div>
  );
}
