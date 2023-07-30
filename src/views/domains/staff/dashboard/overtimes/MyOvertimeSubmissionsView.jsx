/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import MyOvertimeSubmissionsModel from "./MyOvertimeSubmissionsModel";

// Components
import MyOvertimeSubmissions from "../../../../../components/tables/MyOvertimeSubmissions";
import InfoModalBackdrop from "../../../../../components/modals/InfoModalBackdrop";
import InlineLoading from "../../../../../components/loaders/InlineLoading";
import OvertimeStatusAggregate from "../../../../../components/indicators/OvertimeStatusAggregate";

export default function MyOvertimeSubmissionView() {
  const { values, handlers, fetchers } = MyOvertimeSubmissionsModel();
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    fetchers.overtimes();
  }, [values.query, values.currentPage]);

  return (
    <>
      <div className="body-container">
        <div className="flex flex-row w-full justify-between">
          <h1 className="text-xl font-bold mb-4 self-start">
            My Overtime Submissions
          </h1>
          <div className="flex flex-row gap-4 self-end justify-evenly items-center">
            <select
              className="select select-bordered font-extrabold w-fit body-container-color-button"
              onChange={handlers.month}
              value={values.query.month}
            >
              <option disabled value="">
                Month
              </option>
              <option value="NONE">None</option>
              {Array(12)
                .fill()
                .map((_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
            </select>
            <select
              className="select select-bordered font-extrabold w-fit body-container-color-button"
              onChange={handlers.year}
              value={values.query.year}
            >
              <option disabled value="">
                Year
              </option>
              <option value="NONE">None</option>
              {Array(5)
                .fill()
                .map((_, index) => (
                  <option key={index} value={currentYear + index + 1 - 5}>
                    {currentYear + index + 1 - 5}
                  </option>
                ))}
            </select>
            <select
              name="status"
              id="overtime-status"
              value={values.query.status}
              className="select select-bordered font-extrabold w-fit body-container-color-button"
              onChange={handlers.status}
            >
              <option disabled>Status</option>
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
        <MyOvertimeSubmissions
          overtimes={values.overtimes}
          paging={values.paging}
          paginationCallback={handlers.pagination}
          detailCallback={handlers.detail}
          loading={values.state.loading}
        />
      </div>

      {/* DETAIL MODAL */}
      <InfoModalBackdrop
        id="overtimeSubmissionDetail"
        additionalClass="w-8/12 max-w-4xl"
        withCloseButton={true}
      >
        {values.detailIsLoading ? (
          <div className="container h-20 flex justify-center align-middle items-center">
            <InlineLoading />
          </div>
        ) : (
          values.detail != null && (
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <h2 className="text-xl text-start font-bold mb-4 flex flex-row gap-2">
                  My Overtime Submission Detail
                </h2>
              </div>
              {/* Overtime Date */}
              <div className="text-start">Overtime Date</div>
              <div className="text-start">{values.detail?.date}</div>
              {/* Duration */}
              <div className="text-start">Duration</div>
              <div className="text-start">{values.detail?.duration}</div>
              {/* Reason */}
              <div className="text-start">Reason</div>
              <div className="text-start break-words whitespace-pre-line">
                {values.detail?.reason}
              </div>
              {/* Status */}
              <div className="text-start">Status</div>
              <div className="text-start">
                <OvertimeStatusAggregate
                  approvedByManager={values.detail?.approvedByManager}
                  actionByManagerAt={values.detail?.actionByManagerAt}
                  manager={values.detail?.manager}
                />
              </div>
              {/* Rejection Reason */}
              {values?.detail?.rejectionReason ? (
                <>
                  <div className="text-start">Rejection Reason</div>
                  <div className="text-start break-words whitespace-pre-line p-4 rounded-lg form-background">
                    {values?.detail?.rejectionReason}
                  </div>
                </>
              ) : null}
            </div>
          )
        )}
      </InfoModalBackdrop>
    </>
  );
}
