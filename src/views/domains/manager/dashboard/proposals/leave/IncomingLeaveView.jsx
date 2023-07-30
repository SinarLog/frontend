/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { FiExternalLink } from "react-icons/fi";

import { toCapitalize } from "../../../../../../app/utils/strings";

// Components
import IncomingLeaveProposalsTable from "../../../../../../components/tables/IncomingLeaveProposalsTable";
import ActionModal from "../../../../../../components/modals/ActionModal";
import LeaveStatus from "../../../../../../components/indicators/LeaveStatus";
import InlineLoading from "../../../../../../components/loaders/InlineLoading";
import ClickCollapse from "../../../../../../components/collapses/ClickCollapse";
import TableAvatar from "../../../../../../components/avatars/TableAvatar";
import TablePlaceholderAvatar from "../../../../../../components/avatars/TablePlaceholderAvatar";
import ProfileAvatarModal from "../../../../../../components/modals/ProfileAvatarModal";

export default function IncomingLeaveView({ values, handlers, fetchers }) {
  const currentYear = new Date().getFullYear();
  const years = Array(10)
    .fill()
    .map((_, index) => {
      return currentYear + index - 5;
    });

  useEffect(() => {
    fetchers.proposals();
  }, [values.currentPage]);

  return (
    <>
      <div className="body-container w-full">
        <div className="flex flex-row justify-between align-middle mb-4">
          <h1 className="text-xl font-bold self-start">
            Incoming Leave Proposals
          </h1>
          <div className="flex flex-row self-end gap-2">
            <select
              className="select select-bordered body-container-color-button font-extrabold w-fit"
              onChange={handlers.month}
              value={values.query.month}
              defaultValue="START"
            >
              <option disabled value={"START"}>
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
              className="select select-bordered body-container-color-button font-extrabold w-fit"
              onChange={handlers.year}
              value={values.query.year}
              defaultValue="START"
            >
              <option disabled value={"START"}>
                Year
              </option>
              <option value="NONE">None</option>
              {years.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

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
        <IncomingLeaveProposalsTable
          leaves={values.proposals}
          paging={values.paging}
          loading={values.loading}
          paginationCallback={handlers.pagination}
          detailCallback={handlers.detail}
        />
      </div>

      {/* ACTION MODAL */}
      <ActionModal
        id="incomingLeaveProposalDetail"
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
                  Incoming Leave Proposal Detail
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
              {/* Request Date */}
              <div className="text-start">Request Date</div>
              <div className="text-start">{values.detail?.requestDate}</div>
              {/* Start Date */}
              <div className="text-start">Start Date</div>
              <div className="text-start">{values.detail?.from}</div>
              {/* End Date */}
              <div className="text-start">End Date</div>
              <div className="text-start">{values.detail?.to}</div>
              {/* Duration */}
              <div className="text-start">Duration</div>
              <div className="text-start">{values.detail?.duration} day(s)</div>
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
              {/* Leave Type */}
              <div className="text-start">Leave Type</div>
              <div className="text-start capitalize">
                {values.detail?.type?.toLowerCase()}
              </div>
              {/* Attachment */}
              <div className="text-start">Attachment</div>
              {values.detail?.attachment ? (
                <div className="text-start">
                  <a
                    rel="noreferrer"
                    className="no-underline text-secondary-normal dark:text-primary-normal italic flex gap-1 align-top"
                    href={values.detail?.attachment}
                    target="_blank"
                  >
                    Link to attachment{" "}
                    <span>
                      <FiExternalLink />
                    </span>
                  </a>
                </div>
              ) : (
                <div className="text-start">None</div>
              )}
              {/* Rejection Reason */}
              {values.payload.approved === false && (
                <>
                  <div className="text-start">Rejection Reason</div>
                  <textarea
                    id="parent-leave-rejection-reason"
                    placeholder="Your rejection reason"
                    className="textarea textarea-bordered h-24 resize-y form-background"
                    value={values.payload.reason}
                    onChange={handlers.parentReason}
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
                  name={`radio-parent-reject`}
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
                  name={`radio-parent-approve`}
                  onClick={handlers.action}
                >
                  Approve
                </button>
              </div>

              {/* Childs */}
              {values.detail?.childs
                ? values.detail?.childs.map((item, index) => (
                    <div className="col-span-2 -mx-4" key={item?.id}>
                      <ClickCollapse
                        text={`Leave Overflow - ${toCapitalize(
                          item.type.toLowerCase()
                        )}`}
                        twBgPassive="bg-white"
                      >
                        <div className="ps-4 grid grid-cols-2 gap-6">
                          <div className="text-start">Start Date</div>
                          <div className="text-start">{item?.from}</div>
                          <div className="text-start">End Date</div>
                          <div className="text-start">{item?.to}</div>
                          <div className="text-start">Reason</div>
                          <div className="text-start break-words whitespace-pre-line">
                            {item?.reason}
                          </div>
                          <div className="text-start">Status</div>
                          <div className="text-start">
                            <LeaveStatus status={item?.status} />
                          </div>
                          <div className="text-start">Leave Type</div>
                          <div className="text-start capitalize">
                            {item.type?.toLowerCase()}
                          </div>
                          {/* Rejection Reason */}
                          {values.payload.approved === false
                            ? null
                            : values.payload.childs[index].approved ===
                                false && (
                                <>
                                  <div className="text-start">
                                    Rejection Reason
                                  </div>
                                  <textarea
                                    id="parent-leave-rejection-reason"
                                    placeholder="Your rejection reason"
                                    className="textarea textarea-bordered h-24 resize-y form-background"
                                    value={values.payload.childs[index].reason}
                                    onChange={handlers.childReason(index)}
                                  />
                                </>
                              )}
                          {/* Actions */}
                          <div className="col-span-2 flex justify-end gap-4 space-x-3">
                            {/* Reject */}
                            <button
                              type="button"
                              className={`btn btn-sm normal-case ${
                                values.payload.childs[index].approved === false
                                  ? "btn-primary-normal text-white"
                                  : "btn-primary-outline"
                              }`}
                              name={`radio-child-${index}-reject`}
                              onClick={handlers.action}
                            >
                              Reject
                            </button>
                            {/* Approve */}
                            <button
                              type="button"
                              className={`btn btn-sm normal-case ${
                                values.payload.childs[index].approved === true
                                  ? "btn-success-normal text-white"
                                  : "btn-success-outline"
                              }`}
                              name={`radio-child-${index}-approve`}
                              onClick={handlers.action}
                            >
                              Approve
                            </button>
                          </div>
                        </div>
                      </ClickCollapse>
                    </div>
                  ))
                : null}
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
