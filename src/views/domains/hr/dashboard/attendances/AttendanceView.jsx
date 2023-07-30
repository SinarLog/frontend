/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import AttendanceModel from "./AttendanceModel";

// Views
import TodaysAttendanceView from "./logs/TodaysAttendanceView";

export default function AttendanceView() {
  const { values, handlers, fetchers } = AttendanceModel();

  useEffect(() => {
    fetchers.logs();
  }, [
    values.logs.query.early,
    values.logs.query.late,
    values.logs.query.closed,
    values.logs.query.month,
    values.logs.query.year,
    values.logs.currentPage,
  ]);

  return <TodaysAttendanceView values={values.logs} handlers={handlers.logs} />;
}
