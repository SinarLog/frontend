import React, { useState } from "react";

// Views
import AttendanceView from "./attendances/AttendanceView";
import LeaveView from "./leaves/LeaveView";
import AnalyticsView from "./analytics/AnalyticsView";

// Components
import Clock from "../../../../components/clock/Clock";
import Schedule from "../../../../components/clock/Schedule";
import MyOvertimeSubmissionView from "./overtimes/MyOvertimeSubmissionsView";
import AttendanceLogView from "./attendances/AttendanceLogView";

export default function DashboardView() {
  const [toggleCallback, setToggleCallback] = useState(false);

  const callbackHandler = () => {
    setToggleCallback(!toggleCallback);
  };

  // const { ClockIn, ClockOut, AttendanceLogs } = AttendanceView();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex sm:flex-row flex-col gap-4">
        <Clock />
        <Schedule />
      </div>
      <AnalyticsView toggleCallback={toggleCallback} />
      <div className="grid grid-rows-3 grid-flow-col-dense gap-y-4 gap-x-2">
        <AttendanceView />
        <LeaveView callback={callbackHandler} />
      </div>
      <MyOvertimeSubmissionView />
      <AttendanceLogView />
    </div>
  );
}
