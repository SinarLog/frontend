/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

// Components
import IncomingOvertimeSubmissionTable from "../../../../../components/tables/IncomingOvertimeSubmissionsTable";
import InfoModalBackdrop from "../../../../../components/modals/InfoModalBackdrop";
import InlineLoading from "../../../../../components/loaders/InlineLoading";
import TableAvatar from "../../../../../components/avatars/TableAvatar";
import TablePlaceholderAvatar from "../../../../../components/avatars/TablePlaceholderAvatar";
import OvertimeStatusAggregate from "../../../../../components/indicators/OvertimeStatusAggregate";
import ProfileAvatarModal from "../../../../../components/modals/ProfileAvatarModal";
import { BiSearchAlt } from "react-icons/bi";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

export default function OvertimeHistoryView({ values, handlers, fetchers }) {
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    fetchers.overtimes();
  }, [
    values.currentPage,
    values.query.month,
    values.query.year,
    values.query.status,
    values.query.sort,
  ]);

  return (
    <>
      <div className="body-container w-full">
        <div className="flex flex-row justify-between align-middle mb-4">
          <h1 className="text-xl font-bold self-start">
            Overtime Submissions History
          </h1>
          <div className="flex flex-row self-end gap-2">
            {/* Request Date Sort */}
            <button
              className="btn btn-secondary-transparent dark:btn-secondary-outline-dark font-extrabold w-fit normal-case"
              onClick={handlers.sort}
            >
              Request date{" "}
              {values.query.sort === 0 ? (
                <AiOutlineArrowDown className="text-lg" />
              ) : (
                <AiOutlineArrowUp className="text-lg" />
              )}
            </button>

            {/* Status */}
            <select
              name="status"
              id="overtime-status"
              value={values.query.status}
              className="select select-bordered body-container-color-button font-extrabold w-fit"
              onChange={handlers.status}
            >
              <option disabled>Status</option>
              <option value="all">All</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="closed">Closed</option>
            </select>

            {/* Month */}
            <select
              className="select select-bordered body-container-color-button font-extrabold w-fit"
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

            {/* Year */}
            <select
              className="select select-bordered body-container-color-button font-extrabold w-fit"
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

            {/* Search Bar */}
            <form onSubmit={handlers.submit}>
              <div className="join">
                <input
                  className="input input-bordered body-container-color-button join-item w-40"
                  placeholder="Search by name"
                  onChange={handlers.name}
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
          size={10}
        />
      </div>

      {/* ACTION MODAL */}
      <InfoModalBackdrop
        id="overtimeSubmissionHistoryDetail"
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
                  Overtime Submission History Detail
                </h2>
              </div>
              {/* Employee Information */}
              <div className="text-start">Employee Information</div>
              <div className="text-start inline-flex gap-4 justify-start">
                {values.detail?.avatar ? (
                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      window.overtimeSubmissionProfileAvatarModal.showModal()
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
                <OvertimeStatusAggregate
                  approvedByManager={values.detail?.approvedByManager}
                  actionByManagerAt={values.detail?.actionByManagerAt}
                  closedAutomatically={values.detail?.closedAutomatically}
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

      {values.detail?.avatar && (
        <ProfileAvatarModal
          url={values.detail?.avatar}
          id="overtimeSubmissionProfileAvatarModal"
        />
      )}
    </>
  );
}
