import { BsUpload } from "react-icons/bs";

// Constants
import { LEAVE_TYPES } from "../../../../../../app/utils/constants";

// Componenets
import Datepicker from "react-tailwindcss-datepicker";
import ActionModal from "../../../../../../components/modals/ActionModal";
import InfoModalAction from "../../../../../../components/modals/InfoModal";

// Assets
import SuccessCheckMark from "../../../../../../assets/icons/success-check.svg";
import Cross from "../../../../../../assets/icons/cross.svg";
import Check from "../../../../../../assets/icons/check.svg";
import Request from "../../../../../../assets/icons/leave-request.svg";

export default function LeaveRequestView({ values, handlers, refs, blurs }) {
  return (
    <>
      <div className="body-container flex flex-col justify-center items-center gap-2 max-w-sm col-span-1">
        <h5 className="text-lg text-center font-semibold">Leave Request</h5>
        <button
          type="button"
          className="btn btn-primary-normal text-white normal-case border-transparent"
          onClick={handlers.request}
        >
          <img src={Request} alt="Leave request" /> Request
        </button>
      </div>

      <ActionModal
        id="leaveRequestModal"
        closeCallback={handlers.reset}
        modalRef={refs.request}
        allowOverflow={true}
        toggleOverflowVisibility={values.toggleOverflow}
      >
        <div className="flex flex-col gap-4 space-y-2">
          <h2 className="text-center text-xl font-semibold">Leave Request</h2>
          {/* TYPE */}
          <div className="form-control gap-1">
            <label htmlFor="leave-type-request">
              Leave Type
              <span className="mx-1 text-red-500">*</span>
            </label>
            <select
              id="leave-type-request"
              className="select select-bordered form-background"
              value={values?.request?.type ?? ""}
              onChange={handlers.type}
              onBlur={blurs.type}
            >
              <option disabled value="">
                Select leave type
              </option>
              {LEAVE_TYPES.map((item, index) => {
                if (item.value === "MARRIAGE") {
                  return !values?.biodata?.maritalStatus ? (
                    <option value={item.value} key={index}>
                      {item.name}
                    </option>
                  ) : null;
                }
                return (
                  <option value={item.value} key={index}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Date */}
          <div className="form-control gap-1">
            <label htmlFor="rangeDate">
              Leave Dates
              <span className="mx-1 text-red-500">*</span>
            </label>
            <div
              id="rangeDate"
              ref={refs.date}
              onBlur={blurs.dates}
              onFocus={handlers.toggle}
            >
              <Datepicker
                filter
                primaryColor={"rose"}
                inputClassName="w-full font-normal input input-bordered form-background dark:text-white"
                value={values.request.dates}
                minDate={values.request?.minDate}
                startFrom={values.request?.startFrom}
                onChange={handlers.date}
              />
            </div>
          </div>

          {/* Reason */}
          <div className="form-control gap-1">
            <label htmlFor="reason">
              Leave Reason
              <span className="mx-1 text-red-500">*</span>
            </label>
            <textarea
              id="reason"
              type="text"
              placeholder="Reason..."
              className="textarea textarea-bordered h-24 resize-y form-background"
              onBlur={blurs.reason}
              value={values.request.reason}
              onChange={handlers.reason}
            />
          </div>

          {/* Upload Attachment */}
          <div className="form-control gap-1">
            <label htmlFor="attachment">Leave Attachment</label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="attachment"
                className="flex items-center justify-center w-full rounded-lg cursor-pointer gap-4 form-background min-h-12 border input input-bordered"
                onClick={(event) => event.stopPropagation()}
                onMouseDown={(event) => event.preventDefault()}
              >
                <BsUpload className="text-md text-slate-700 dark:text-slate-400" />
                <p className="text-md text-slate-700 dark:text-slate-400">
                  {values.request.attachment
                    ? values.request?.attachment[0]?.name
                    : "Choose file"}
                </p>
                <input
                  ref={refs.attachment}
                  id="attachment"
                  type="file"
                  name="file"
                  className="hidden"
                  accept="image/png, image/jpeg, image/jpg, application/pdf"
                  onChange={handlers.attachment}
                  onClick={(event) => event.stopPropagation()}
                  onMouseDown={(event) => event.preventDefault()}
                />
              </label>
            </div>
          </div>

          {values.report ? (
            values.report?.isLeaveLeakage ? (
              <>
                <div className="flex gap-2 align-middle items-center">
                  <div className="w-10/12">
                    <h5>
                      There is an excess in your leave request. The remaining
                      leave requested with the selected type is{" "}
                      <b>
                        {values.report?.remainingQuotaForRequestedType} days
                      </b>
                      . The excess in your leave request made is{" "}
                      <b className="text-primary-normal">
                        {values.report?.excessLeaveDuration} days
                      </b>
                      . Consider filling the available options below to overcome
                      your leave request's excess.
                    </h5>
                  </div>
                  <div className="rounded-full w-10 h-10 bg-red-200 text-primary-normal flex justify-center items-center align-middle">
                    <img src={Cross} alt="Cross" />
                  </div>
                </div>
                {values.report?.availables?.length && (
                  <div className="grid grid-cols-2 grid-flow-row gap-2">
                    {values.report?.availables.map((item, index) => (
                      <div className="form-control gap-3" key={index}>
                        <div className="flex flex-row gap-4">
                          <input
                            type="checkbox"
                            className="accent-secondary-normal text-secondary-normal w-6 h-6"
                            onChange={handlers.overflowChecked(index)}
                            checked={values.request.overflows[index].checked}
                          />
                          <p className="font-semibold capitalize">
                            {item?.type?.toLowerCase()}
                          </p>
                        </div>
                        <input
                          className="input bg-[#f5f3f3]"
                          type="text"
                          placeholder="No of days..."
                          onChange={handlers.overflowCount(index)}
                          disabled={!values.request.overflows[index].checked}
                          value={values.request.overflows[index].count}
                        />
                        <p className="text-sm">
                          You have {item?.quota} day(s) left
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="flex gap-2 align-middle items-center">
                <div className="w-10/12">
                  <h5>
                    Your leave request looks good. Click the submit button to
                    apply for the leave.
                  </h5>
                </div>
                <div className="rounded-full w-10 h-10 bg-green-100 text-primary-normal flex justify-center items-center align-middle">
                  <img src={Check} alt="Check" />
                </div>
              </div>
            )
          ) : null}

          <div className="flex flex-row justify-evenly gap-2">
            <button
              type="button"
              className="btn btn-warning-normal normal-case w-1/2 text-white self-start"
              onClick={handlers.check}
              disabled={values.state.checkDisabled}
            >
              Check
            </button>
            <button
              type="button"
              className="btn btn-primary-normal normal-case w-1/2 text-white self-end"
              onClick={handlers.submit}
              disabled={values.state.submitDisabled}
            >
              Submit
            </button>
          </div>
        </div>
      </ActionModal>

      <InfoModalAction id="successApplyLeaveModal" btnText="Close">
        <div className="flex flex-col gap-2 justify-center items-center">
          <h2 className="text-xl font-bold">Success</h2>
          <img src={SuccessCheckMark} alt="Success Check Mark" />
          <p>Your leave request has been successfully submitted.</p>
        </div>
      </InfoModalAction>
    </>
  );
}
