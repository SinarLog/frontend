/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { formatTimeString } from "../../../../app/utils/strings";
import {
  HOURS,
  HOURS_FROM_ZERO,
  MINUTES,
} from "../../../../app/utils/constants";

import ConfigModel from "./ConfigModel";

// Components
import ConfigChangesLogTable from "../../../../components/tables/ConfigChangesLogTable";
import ActionModal from "../../../../components/modals/ActionModal";
import InlineLoading from "../../../../components/loaders/InlineLoading";

export default function ConfigView() {
  const { values, handlers, refs, fetchers } = ConfigModel();

  useEffect(() => {
    fetchers.config();
  }, []);

  useEffect(() => {
    fetchers.logs();
  }, [values.currentPage]);

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="body-container">
          <div className="flex flex-row justify-between align-middle items-center w-full mb-8">
            <button
              type="button"
              className="btn btn-ghost-neuro normal-case w-20"
              onClick={handlers.goBack}
            >
              Back
            </button>
            <h1 className="text-xl text-center font-bold self-center">
              Company Configuration
            </h1>
            <button
              type="button"
              className="btn btn-success-normal normal-case text-white w-20"
              onClick={handlers.open}
            >
              Edit
            </button>
          </div>

          <div className="flex justify-center items-center">
            <div className="grid grid-cols-2 gap-6 w-2/4 align-middle p-4">
              {/* Office Start Time */}
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Clock In Time</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs cursor-default body-container-color"
                  value={values.config?.startTime ?? "-"}
                  readOnly={true}
                />
              </div>

              {/* Office End Time */}
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Clock Out Time</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered body-container-color w-full max-w-xs cursor-default"
                  value={values.config?.endTime ?? "-"}
                  readOnly={true}
                />
              </div>

              {/* Acceptance Leave Interval */}
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Acceptance Leave Interval</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered body-container-color w-full max-w-xs cursor-default"
                  value={`${values.config?.acceptedLeaveInterval} days`}
                  readOnly={true}
                />
              </div>

              {/* Acceptance Attendance Interval */}
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">
                    Acceptance Attendance Interval
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered body-container-color w-full max-w-xs cursor-default"
                  value={formatTimeString(
                    values.config?.acceptedAttendanceInterval
                  )}
                  readOnly={true}
                />
              </div>

              {/* Yearly Leave Quota */}
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Yearly Leave Quota</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered body-container-color w-full max-w-xs cursor-default"
                  value={`${values.config?.defaultYearlyQuota} days`}
                  readOnly={true}
                />
              </div>

              {/* Marriage Leave Quota */}
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Marriage Leave Quota</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered body-container-color w-full max-w-xs cursor-default"
                  value={`${values.config?.defaultMarriageQuota} days`}
                  readOnly={true}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="body-container">
          <h1 className="text-xl font-bold">Changes Log</h1>
          <ConfigChangesLogTable
            logs={values.logs}
            paging={values.paging}
            loading={values.logsLoading}
            paginationCallback={handlers.pagination}
            detailCallback={handlers.detail}
          />
        </div>
      </div>

      {/* Action Modal */}
      <ActionModal
        id="updateCompanyConfigModal"
        allowOverflow={false}
        additionalClass="w-8/12 max-w-2xl"
      >
        <h1 className="text-xl font-bold text-start mb-4">
          Company Configuration
        </h1>
        <div className="grid grid-cols-2 gap-10 w-full">
          {/* Clock In */}
          <div className="flex flex-col gap-2">
            <h5>Clock In</h5>
            <div
              ref={refs.clockInBtns}
              className="flex flex-row gap-2 items-center justify-between rounded-lg"
            >
              <select
                className="select select-bordered form-background"
                value={values.payload?.startTimeHour}
                onChange={handlers.hour("clockin")}
              >
                {HOURS.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
              <span>:</span>
              <select
                className="select select-bordered form-background"
                value={values.payload?.startTimeMinute}
                onChange={handlers.minute("clockin")}
              >
                {MINUTES.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
              <select
                className="select select-bordered form-background"
                value={values.payload?.startTimeFoo}
                onChange={handlers.foo("clockin")}
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>

          {/* Clock Out */}
          <div className="flex flex-col gap-2">
            <h5>Clock Out</h5>
            <div
              ref={refs.clockOutBtns}
              className="flex flex-row gap-2 items-center justify-between rounded-lg"
            >
              <select
                className="select select-bordered form-background"
                value={values.payload?.endTimeHour}
                onChange={handlers.hour("clockout")}
              >
                {HOURS.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
              <span>:</span>
              <select
                className="select select-bordered form-background"
                value={values.payload?.endTimeMinute}
                onChange={handlers.minute("clockout")}
              >
                {MINUTES.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
              <select
                className="select select-bordered form-background"
                value={values.payload?.endTimeFoo}
                onChange={handlers.foo("clockout")}
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>

          {/* Acceptance Leave Interval */}
          <div className="flex flex-col gap-2">
            <h5>Acceptance Leave Interval</h5>
            <div className="join">
              <input
                className="input input-bordered join-item w-full form-background"
                type="number"
                value={values.payload?.acceptanceLeaveInterval}
                onChange={handlers.leave}
              />
              <button
                className="btn join-item text-white normal-case disabled:bg-white disabled:border disabled:border-neutral-300 dark:disabled:border-[#393a44]  dark:disabled:bg-[#1C1C24]"
                disabled={true}
              >
                days
              </button>
            </div>
          </div>

          {/* Acceptance Attendance Interval */}
          <div className="flex flex-col gap-2">
            <h5>Acceptance Attendance Interval</h5>
            <div className="flex flex-row gap-2 items-center justify-between">
              <select
                className="select select-bordered form-background"
                value={values.payload?.attendanceIntervalHour}
                onChange={handlers.attHour}
              >
                {HOURS_FROM_ZERO.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
              <span>Hours</span>
              <select
                className="select select-bordered form-background"
                value={values.payload?.attendanceIntervalMinute}
                onChange={handlers.attMinute}
              >
                {MINUTES.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
              <span>Minutes</span>
            </div>
          </div>

          {/* Default Yearly Quota */}
          <div className="flex flex-col gap-2">
            <h5>Yearly Leave Quota</h5>
            <div className="join">
              <input
                className="input input-bordered join-item w-full form-background"
                type="number"
                value={values.payload?.defaultYearlyQuota}
                onChange={handlers.yearly}
              />
              <button
                className="btn join-item text-white normal-case disabled:bg-white disabled:border disabled:border-neutral-300 dark:disabled:border-[#393a44]  dark:disabled:bg-[#1C1C24]"
                disabled={true}
              >
                days
              </button>
            </div>
          </div>

          {/* Default Marriage Quota */}
          <div className="flex flex-col gap-2">
            <h5>Marriage Leave Quota</h5>
            <div className="join">
              <input
                className="input input-bordered join-item w-full form-background"
                type="number"
                value={values.payload?.defaultMarriageQuota}
                onChange={handlers.marriage}
              />
              <button
                className="btn join-item text-white normal-case disabled:bg-white disabled:border disabled:border-neutral-300 dark:disabled:border-[#393a44]  dark:disabled:bg-[#1C1C24]"
                disabled={true}
              >
                days
              </button>
            </div>
          </div>

          <div className="col-span-2 flex flex-row-reverse">
            <button
              className="btn btn-primary-normal text-white normal-case w-1/4"
              disabled={values.disabled}
              onClick={handlers.submit}
              ref={refs.submitBtn}
            >
              {values.submitLoading ? <InlineLoading /> : "Submit"}
            </button>
          </div>
        </div>
      </ActionModal>
    </>
  );
}
