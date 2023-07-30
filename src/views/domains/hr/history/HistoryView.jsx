import HistoryModel from "./HistoryModel";
import EmployeesAttendanceLogView from "./attendances/EmployeesAttendanceLogView";

// Views
import LeaveHistoryView from "./leaves/LeaveHistoryView";
import OvertimeHistoryView from "./overtimes/OvertimeHistoryView";

export default function HistoryView() {
  const { values, handlers, fetchers } = HistoryModel();

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="inline-flex flex-row gap-4 space-x-4 mt-4">
          <button
            value={0}
            onClick={handlers.tabs}
            className={`text-xl font-bold cursor-pointer hover:text-primary-normal ${
              values.tab === 0 &&
              "text-primary-normal underline-offset-8 underline"
            }`}
          >
            Leave
          </button>
          <button
            value={1}
            onClick={handlers.tabs}
            className={`text-xl font-bold cursor-pointer hover:text-primary-normal ${
              values.tab === 1 &&
              "text-primary-normal underline-offset-8 underline"
            }`}
          >
            Overtime
          </button>
        </div>
        {values.tab === 0 ? (
          <div
            key={0}
            className="animate__animated animate__fadeIn animate__fast"
          >
            <LeaveHistoryView
              values={values.leaves}
              handlers={handlers.leaves}
              fetchers={fetchers.leaves}
            />
          </div>
        ) : (
          <div
            key={1}
            className="animate__animated animate__fadeIn animate__fast"
          >
            <OvertimeHistoryView
              values={values.overtimes}
              handlers={handlers.overtimes}
              fetchers={fetchers.overtimes}
            />
          </div>
        )}

        <EmployeesAttendanceLogView
          values={values.logs}
          handlers={handlers.logs}
          fetchers={fetchers.logs}
        />
      </div>
    </>
  );
}
