/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import LeaveModel from "./LeaveModel";
import LeaveListView from "./list/LeaveListView";
import LeaveRequestView from "./request/LeaveRequestView";

export default function LeaveView({ callback }) {
  const { values, fetchers, handlers, refs, blurs } = LeaveModel(callback);

  useEffect(() => {
    fetchers.biodata();
  }, []);

  useEffect(() => {
    fetchers.list();
  }, [values.list.currentPage, values.list.query]);

  return (
    <>
      <LeaveRequestView
        values={values.request}
        handlers={handlers.request}
        refs={refs}
        blurs={blurs}
      />
      <LeaveListView values={values.list} handlers={handlers.list} />
    </>
  );
}
