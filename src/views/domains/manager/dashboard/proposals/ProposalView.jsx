/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import ProposalModel from "./ProposalModel";

// Views
import IncomingLeaveView from "./leave/IncomingLeaveView";
import IncomingOvertimeView from "./overtime/IncomingOvertimeView";

export default function ProposalsView() {
  const { values, handlers, fetchers } = ProposalModel();

  return (
    <>
      <div className="inline-flex flex-row gap-4 space-x-4 mt-4">
        <button
          value={0}
          onClick={handlers.tabs}
          className={`text-xl font-bold cursor-pointer hover:text-primary-normal ${
            values.activeTab === 0 &&
            "text-primary-normal underline-offset-8 underline"
          }`}
        >
          Leave
        </button>
        <button
          value={1}
          onClick={handlers.tabs}
          className={`text-xl font-bold cursor-pointer hover:text-primary-normal ${
            values.activeTab === 1 &&
            "text-primary-normal underline-offset-8 underline"
          }`}
        >
          Overtime
        </button>
      </div>
      {values.activeTab === 0 ? (
        <div key={0} className="animate__animated animate__fadeIn">
          <IncomingLeaveView
            values={values.leaves}
            handlers={handlers.leaves}
            fetchers={fetchers.leaves}
          />
        </div>
      ) : (
        <div key={1} className="animate__animated animate__fadeIn">
          <IncomingOvertimeView
            values={values.overtimes}
            handlers={handlers.overtimes}
            fetchers={fetchers.overtimes}
          />
        </div>
      )}
    </>
  );
}
