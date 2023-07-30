import { IoChevronBack } from "react-icons/io5";
import { FiExternalLink } from "react-icons/fi";

// Components
import MyLeaveRequests from "../../../../../../components/tables/MyLeaveRequests";
import InfoModalBackdrop from "../../../../../../components/modals/InfoModalBackdrop";
import InlineLoading from "../../../../../../components/loaders/InlineLoading";
import LeaveStatus from "../../../../../../components/indicators/LeaveStatus";
import ClickCollapse from "../../../../../../components/collapses/ClickCollapse";
import LeaveStatusAggregate from "../../../../../../components/indicators/LeaveStatusAggregate";

export default function LeaveListView({ values, handlers }) {
  const currentYear = new Date().getFullYear();
  const years = Array(10)
    .fill()
    .map((_, index) => {
      return currentYear + index - 5;
    });

  return (
    <>
      <div className="body-container row-span-3 col-span-12 w-full">
        <div className="flex flex-row justify-between items-center gap-4">
          <h2 className="text-start text-xl font-bold mb-4">
            My Leave Request
          </h2>
          <div className="flex flex-row self-end gap-2">
            {/* Status */}
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
            {/* Month */}
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
            {/* Year */}
            <select
              className="select select-bordered font-extrabold w-fit body-container-color-button"
              onChange={handlers.year}
              value={values.query.year}
            >
              <option disabled value="">
                Year
              </option>
              <option value="NONE">None</option>
              {years.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
        <MyLeaveRequests
          leaves={values?.leaves}
          paging={values?.paging}
          loading={values?.loading}
          paginationCallback={handlers.pagination}
          detailCallback={handlers.detail}
        />
      </div>

      {/* Detail modal */}
      <InfoModalBackdrop
        id="leaveDetailModal"
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
                  {values.backId !== "NULL" && (
                    <button
                      type="button"
                      onClick={() => handlers.back(values.backId)}
                      className="btn btn-ghost-neuro btn-sm"
                    >
                      <IoChevronBack />
                    </button>
                  )}
                  My Leave Request Detail
                </h2>
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
              {/* Leave Type */}
              <div className="text-start">Leave Type</div>
              <div className="text-start capitalize">
                {values.detail?.type?.toLowerCase()}
              </div>
              {/* Attachment */}
              {values.detail?.attachmentUrl && (
                <>
                  <div className="text-start">Attachment</div>
                  <div className="text-start">
                    <a
                      rel="noreferrer"
                      className="no-underline text-secondary-normal dark:text-primary-normal italic flex gap-1 align-top"
                      href={values.detail?.attachmentUrl}
                      target="_blank"
                    >
                      Link to attachment{" "}
                      <span>
                        <FiExternalLink />
                      </span>
                    </a>
                  </div>
                </>
              )}
              {/* Status */}
              <div className="text-start">Status</div>
              <div className="text-start">
                <LeaveStatusAggregate
                  approvedByHr={values.detail?.approvedByHr}
                  approvedByManager={values.detail?.approvedByManager}
                  actionByHrAt={values.detail?.actionByHrAt}
                  actionByManagerAt={values.detail?.actionByManagerAt}
                  closedAutomatically={values.detail?.closedAutomatically}
                  manager={values.detail?.manager}
                  hr={values.detail?.hr}
                  isManager={values.isManager}
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

              {/* PARENT */}
              {values.detail?.parent && (
                <div className="col-span-2 -mx-4">
                  <ClickCollapse text="Associated leave" twBgPassive="bg-white">
                    <div className="ps-4 grid grid-cols-2 grid-flow-row gap-6">
                      <div className="text-start">Start Date</div>
                      <div className="text-start">
                        {values?.detail?.parent?.from}
                      </div>
                      <div className="text-start">End Date</div>
                      <div className="text-start">
                        {values?.detail?.parent?.to}
                      </div>
                      <div className="text-start">Duration</div>
                      <div className="text-start">
                        {values?.detail?.parent?.duration} day(s)
                      </div>
                      <div className="text-start">Reason</div>
                      <div className="text-start break-words whitespace-pre-line">
                        {values?.detail?.parent?.reason}
                      </div>
                      <div className="text-start">Status</div>
                      <div className="text-start">
                        <LeaveStatus status={values?.detail?.parent?.status} />
                      </div>
                      <div className="text-start">Leave Type</div>
                      <div className="text-start capitalize">
                        {values?.detail?.parent?.type?.toLowerCase()}
                      </div>
                    </div>
                  </ClickCollapse>
                </div>
              )}

              {/* CHILDS */}
              {values?.detail?.childs && (
                <div className="col-span-2 -mx-4">
                  <ClickCollapse text="Leave Overflows" twBgPassive="bg-white">
                    <div className="overflow-x-auto">
                      <table className="table">
                        <thead>
                          <tr>
                            <th></th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Leave Type</th>
                            <th>Status</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {values?.detail?.childs?.map((child, index) => (
                            <tr className="hover" key={index}>
                              <td>{index + 1}</td>
                              <td>{child?.from}</td>
                              <td>{child?.to}</td>
                              <td className="capitalize">
                                {child?.type?.toLowerCase()}
                              </td>
                              <td>
                                <LeaveStatus status={child?.status} />
                              </td>
                              <td>
                                <button
                                  type="button"
                                  value={`${values?.detail?.id};${child?.id}`}
                                  className="btn btn-secondary-normal btn-sm text-white normal-case"
                                  onClick={handlers.child}
                                >
                                  See
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </ClickCollapse>
                </div>
              )}
            </div>
          )
        )}
      </InfoModalBackdrop>
    </>
  );
}
