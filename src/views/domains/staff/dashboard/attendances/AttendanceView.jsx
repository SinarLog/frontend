/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import AttendanceModel from "./AttendanceModel";

// Views
import ClockInView from "./clock-in/ClockInView";
import ClockOutView from "./clock-out/ClockOutView";

export default function AttendanceView() {
  const { values, handlers, fetchers, refs, blurs } = AttendanceModel();

  useEffect(() => {
    fetchers.geolocation();
    fetchers.attendance();
  }, []);

  return (
    <>
      <ClockInView
        values={values.clockIn}
        handlers={handlers.clockIn}
        refs={refs.clockIn}
      />
      <ClockOutView
        values={values.clockOut}
        handlers={handlers.clockOut}
        refs={refs.clockOut}
        blurs={blurs}
      />
    </>
  );
}
