/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { BiSearchAlt } from "react-icons/bi";

// Components
import IncomingOvertimeSubmissionTable from "../../../../../../components/tables/IncomingOvertimeSubmissionsTable";
import ActionModal from "../../../../../../components/modals/ActionModal";
import ProfileAvatarModal from "../../../../../../components/modals/ProfileAvatarModal";
import InlineLoading from "../../../../../../components/loaders/InlineLoading";
import TableAvatar from "../../../../../../components/avatars/TableAvatar";
import TablePlaceholderAvatar from "../../../../../../components/avatars/TablePlaceholderAvatar";
import LeaveStatus from "../../../../../../components/indicators/LeaveStatus";

export default function IncomingOvertimeView({ values, handlers, fetchers }) {
  useEffect(() => {
    fetchers.overtimes();
  }, [values.currentPage]);

  return (
    <>
      <div className="body-container w-full">
        <div className="flex flex-row justify-between align-middle mb-4">
          <h1 className="text-xl font-bold self-start">
            Incoming Overtime Submissions
          </h1>
          <div className="flex flex-row self-end gap-2">
            {/* Search Bar */}
            <form onSubmit={handlers.searchSubmit}>
              <div className="join">
                <input
                  className="input input-bordered body-container-color-button join-item w-40"
                  placeholder="Search by name"
                  onChange={handlers.search}
                  value={values.query.name}
                  onKeyDown={handlers.typing}
                />
                <button
                  type="submit"
                  className="btn btn-secondary-normal join-item border-slate-700 border-opacity-20"
                >
                  <BiSearchAlt className="text-lg text-white" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* TABLE */}
        <IncomingOvertimeSubmissionTable
          overtimes={values.overtimes}
          paging={values.paging}
          loading={values.loading}
          paginationCallback={handlers.pagination}
          detailCallback={handlers.detail}
        />
      </div>

      {/* ACTION MODAL */}
      <ActionModal
        id="incomingOvertimeSubmissionDetail"
        additionalClass="w-8/12 max-w-4xl"
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
                  Incoming Overtime Submission Detail
                </h2>
              </div>
              {/* Employee Information */}
              <div className="text-start">Employee Information</div>
              <div className="text-start inline-flex gap-4 justify-start">
                {values.detail?.avatar ? (
                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      window.leaveRequestProfileAvatarModal.showModal()
                    }
                  >
                    <TableAvatar>
                      <img src={values.detail?.avatar} alt="Avatar" />
                    </TableAvatar>
                  </div>
                ) : (
                  <TablePlaceholderAvatar fullName={values.detail?.fullName} />
                )}
                <div className="flex flex-col gap-1">
                  <p>{values.detail?.fullName}</p>
                  <p className="text-sm font-light text-slate-400">
                    {values.detail?.email}
                  </p>
                </div>
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
                <LeaveStatus status={values.detail?.status} />
              </div>
              {/* Rejection Reason */}
              {values.payload.approved === false && (
                <>
                  <div className="text-start">Rejection Reason</div>
                  <textarea
                    id="parent-leave-rejection-reason"
                    placeholder="Your rejection reason"
                    className="textarea textarea-bordered h-24 resize-y form-background"
                    value={values.payload.reason}
                    onChange={handlers.reason}
                  />
                </>
              )}
              {/* Action Buttons */}
              <div className="col-span-2 flex justify-end gap-4 space-x-3">
                {/* Reject */}
                <button
                  type="button"
                  className={`btn btn-sm normal-case ${
                    values.payload.approved === false
                      ? "btn-primary-normal text-white"
                      : "btn-primary-outline"
                  }`}
                  name="reject"
                  onClick={handlers.action}
                >
                  Reject
                </button>
                {/* Approve */}
                <button
                  type="button"
                  className={`btn btn-sm normal-case ${
                    values.payload.approved === true
                      ? "btn-success-normal text-white"
                      : "btn-success-outline"
                  }`}
                  name="approve"
                  onClick={handlers.action}
                >
                  Approve
                </button>
              </div>

              {/* Submit */}
              <div className="col-span-2 flex justify-end gap-4 space-x-3">
                <button
                  type="submit"
                  className="btn btn-sm btn-ghost-neuro normal-case text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-primary-normal normal-case text-white"
                  onClick={handlers.actionSubmit}
                  disabled={values.submitDisabled}
                >
                  Submit
                </button>
              </div>
            </div>
          )
        )}
      </ActionModal>

      {values.detail?.avatar && (
        <ProfileAvatarModal
          url={values.detail?.avatar}
          id="leaveRequestProfileAvatarModal"
        />
      )}
    </>
  );
}
