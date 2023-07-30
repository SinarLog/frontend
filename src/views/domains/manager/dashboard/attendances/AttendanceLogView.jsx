/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import AttendanceModel from "./AttendanceModel";
import MyAttendanceLogView from "./logs/MyAttendanceLogView";

export default function AttendanceLogView() {
  const { values, handlers, refs, fetchers } = AttendanceModel();

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

  return (
    <MyAttendanceLogView
      values={values.logs}
      handlers={handlers.logs}
      refs={refs.logs}
    />
  );
}
