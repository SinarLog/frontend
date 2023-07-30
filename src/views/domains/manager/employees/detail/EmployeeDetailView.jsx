/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { getFirstAndLastName } from "../../../../../app/utils/strings";
import { GENDERS, EMPLOYMENT_TYPES } from "../../../../../app/utils/constants";

import EmployeeDetailModel from "./EmployeeDetailModel";

// Components
import ProfileAvatar from "../../../../../components/avatars/ProfileAvatar";
import PlaceholderAvatar from "../../../../../components/avatars/PlaceholderAvatar";
import StatusBadgeIndicator from "../../../../../components/indicators/StatusBadgeIndicator";
import MyLeaveRequests from "../../../../../components/tables/MyLeaveRequests";
import MyOvertimeSubmissions from "../../../../../components/tables/MyOvertimeSubmissions";
import MyAttendanceLogTable from "../../../../../components/tables/MyAttendanceLogTable";

export default function EmployeeDetailView() {
  const { values, handlers, fetchers } = EmployeeDetailModel();
  const currentYear = new Date().getFullYear();
  const name = getFirstAndLastName(values.detail?.fullName);

  useEffect(() => {
    fetchers.employee(values.employeeId);
  }, [values.employeeId]);

  useEffect(() => {
    fetchers.leaves();
    fetchers.overtimes();
    fetchers.attendances();
  }, [
    values.leaves.query,
    values.overtimes.query,
    values.attendances.query,
    values.isUnderHim,
  ]);

  if (values.isUnderHim) {
    return (
      <div className="flex flex-col gap-6">
        <div className="body-container">
          <div className="flex flex-row justify-center w-full mb-8 relative">
            <button
              type="button"
              className="btn btn-ghost-neuro normal-case text-slate-400 self-start absolute left-0"
              onClick={handlers.back}
            >
              Back
            </button>
            <h1 className="text-xl text-center font-bold self-center">
              {name}'s Profile
            </h1>
          </div>
          <div className="border-t-2 border-slate-300 dark:border-slate-700 mb-8">
            <div
              className="relative top-[-15px] left-1/2 bg-white dark:bg-slate-700  w-fit px-8 text-slate-400"
              style={{ transform: "translateX(-50%)" }}
            >
              Personal Information
            </div>
            <div className="inline-flex w-full justify-center justify-items-center gap-4">
              <div className="container w-1/4 px-2">
                <div className="flex flex-row justify-center">
                  <div className="flex flex-col items-center gap-3">
                    <h3 className="text-lg font-semibold">Employee Photo</h3>
                    {values.detail?.avatar ? (
                      <ProfileAvatar>
                        <img src={values.detail?.avatar ?? ""} alt="profile" />
                      </ProfileAvatar>
                    ) : (
                      <PlaceholderAvatar
                        role={values.detail?.role?.code}
                        fullName={values.detail?.fullName}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="container flex flex-col gap-6 w-3/4 px-2">
                {/* Full Name */}
                <div className="flex flex-row justify-between w-full">
                  <p>Full Name</p>
                  <p>{values.detail?.fullName ?? ""}</p>
                </div>

                {/* Date of Birth */}
                <div className="flex flex-row justify-between w-full">
                  <p>Date of Birth</p>
                  <p>{values.detail?.biodata?.birthDate}</p>
                </div>

                {/* Email */}
                <div className="flex flex-row justify-between w-full">
                  <p>Email</p>
                  <p>{values.detail?.email}</p>
                </div>

                {/* Phone Number */}
                <div className="flex flex-row justify-between w-full">
                  <p>Phone Number</p>
                  <p>{values.detail?.biodata?.phoneNumber}</p>
                </div>

                {/* Address */}
                <div className="flex flex-row justify-between w-full">
                  <p>Address</p>
                  <div className="w-1/2 self-end text-right">
                    <p className="flex-wrap">
                      {values.detail?.biodata?.address}
                    </p>
                  </div>
                </div>

                {/* Gender */}
                <div className="flex flex-row justify-between w-full">
                  <p>Gender</p>
                  <p>
                    {
                      GENDERS.find(
                        (item) => item.value === values.detail?.biodata?.gender
                      )?.name
                    }
                  </p>
                </div>

                {/* Religion */}
                <div className="flex flex-row justify-between w-full">
                  <p>Religion</p>
                  <p className="capitalize">
                    {values.detail?.biodata?.religion.toLowerCase()}
                  </p>
                </div>

                {/* Marital Status */}
                <div className="flex flex-row justify-between w-full">
                  <p>Marital Status</p>
                  <p>
                    {values.detail?.biodata?.maritalStatus
                      ? "Married"
                      : "Single"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t-2 border-slate-300 dark:border-slate-700 mb-8">
            <div
              className="relative top-[-15px] left-1/2 bg-white dark:bg-slate-700 w-fit px-8 text-slate-400"
              style={{ transform: "translateX(-50%)" }}
            >
              Work Information
            </div>
            <div className="grid grid-cols-2 grid-flow-row gap-6">
              {/* Employment Type */}
              <div className="flex justify-between">
                <p>Employment type</p>
                <p className="capitalize">
                  {
                    EMPLOYMENT_TYPES.find(
                      (item) => item.value === values.detail?.contractType
                    )?.name
                  }
                </p>
              </div>

              {/* Manager Name */}
              <div className="flex justify-between">
                <p>Manager name</p>
                <p className="capitalize">
                  {values.detail?.manager
                    ? values.detail.manager?.fullName
                    : "-"}
                </p>
              </div>

              {/* Job */}
              <div className="flex justify-between">
                <p>Job</p>
                <p>{values.detail?.job?.name}</p>
              </div>

              {/* Join Date */}
              <div className="flex justify-between">
                <p>Join date</p>
                <p>{values.detail?.joinDate}</p>
              </div>

              {/* Role */}
              <div className="flex justify-between">
                <p>Role</p>
                <p>{values.detail?.role?.name}</p>
              </div>

              {/* Leave Quota */}
              <div className="flex justify-between">
                <p>Leave quota</p>
                <p>{values.detail?.leaveQuota?.yearlyCount}</p>
              </div>

              {/* Empty */}
              <div className="flex justify-between w-full"></div>

              {/* Status */}
              <div className="flex justify-between">
                <p>Status</p>
                <StatusBadgeIndicator status={values.detail?.status} />
              </div>
            </div>
          </div>
          <div className="border-t-2 border-slate-300 dark:border-slate-700 mb-8">
            <div
              className="relative top-[-15px] left-1/2 bg-white dark:bg-slate-700 w-fit px-8 text-slate-400"
              style={{ transform: "translateX(-50%)" }}
            >
              Emergency Contacts
            </div>
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Relation</th>
                  </tr>
                </thead>
                <tbody>
                  {values.detail?.emergencyContacts?.map((item, index) => (
                    <tr className="hover" key={index}>
                      <th>{index + 1}</th>
                      <td>{item?.fullName}</td>
                      <td>{item?.phoneNumber}</td>
                      <td className="capitalize">
                        {item?.relation.toLowerCase()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {values.isUnderHim && (
          <div className="body-container">
            <div className="flex flex-row justify-between">
              <h1 className="text-xl font-bold">
                {`${name}'s ${
                  values.tabs === 0
                    ? "Leave Requests"
                    : values.tabs === 1
                    ? "Overtime Submissions"
                    : "Attendances Log"
                }`}
              </h1>
              <select
                className="select select-bordered body-container-color-button font-extrabold"
                onChange={handlers.tabs}
                value={values.tabs}
              >
                <option value={0}>Leave Requests</option>
                <option value={1}>Overtime Submissions</option>
                <option value={2}>Attendances Log</option>
              </select>
            </div>

            {values.tabs === 0 ? (
              <>
                <div className="flex flex-row gap-2 mb-4">
                  {/* Month */}
                  <select
                    className="select select-bordered body-container-color-button font-extrabold w-fit"
                    onChange={handlers.leaves.month}
                    value={values.leaves.query.month}
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
                    onChange={handlers.leaves.year}
                    value={values.leaves.query.year}
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

                  {/* Status */}
                  <select
                    name="status"
                    id="overtime-status"
                    value={values.leaves.query.status}
                    className="select select-bordered body-container-color-button font-extrabold w-fit"
                    onChange={handlers.leaves.status}
                  >
                    <option disabled>Status</option>
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <MyLeaveRequests
                  leaves={values.leaves.leaves}
                  paging={values.leaves.paging}
                  paginationCallback={handlers.leaves.pagination}
                  withDetail={false}
                  loading={values.leaves.loading}
                  emptyStateText={`${name} has no leave requests`}
                />
              </>
            ) : values.tabs === 1 ? (
              <>
                {/* OVERTIMES SUBMISSIONS */}
                <div className="flex flex-row gap-2 mb-4">
                  {/* Month */}
                  <select
                    className="select select-bordered body-container-color-button font-extrabold w-fit"
                    onChange={handlers.overtimes.month}
                    value={values.overtimes.query.month}
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
                    onChange={handlers.overtimes.year}
                    value={values.overtimes.query.year}
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

                  {/* Status */}
                  <select
                    name="status"
                    id="overtime-status"
                    value={values.overtimes.query.status}
                    className="select select-bordered body-container-color-button font-extrabold w-fit"
                    onChange={handlers.overtimes.status}
                  >
                    <option disabled>Status</option>
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <MyOvertimeSubmissions
                  overtimes={values.overtimes.overtimes}
                  paging={values.overtimes.paging}
                  paginationCallback={handlers.overtimes.pagination}
                  withDetail={false}
                  loading={values.overtimes.loading}
                  emptyStateText={`${name} has no overtime submissions`}
                />
              </>
            ) : (
              <>
                {/* ATTENDANCES LOGS */}
                <div className="flex flex-row gap-2 mb-4">
                  {/* Month */}
                  <select
                    className="select select-bordered body-container-color-button font-extrabold w-fit"
                    onChange={handlers.attendances.month}
                    value={values.attendances.query.month}
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
                    onChange={handlers.attendances.year}
                    value={values.attendances.query.year}
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

                  {/* STATUS */}
                  <div className="dropdown dropdown-start">
                    <label
                      tabIndex={0}
                      className="btn hover:bg-transparent bg-transparent button-border-custom normal-case m-1 inline-flex flex-row"
                    >
                      <p className="text-secondary-normal font-bold dark:text-white">
                        Status
                      </p>
                      <AiFillCaretDown className="text-secondary-normal font-bold dark:text-white" />
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 max-w-content"
                    >
                      <li>
                        <div className="flex flex-row gap-4 items-center">
                          <input
                            className="accent-secondary-normal text-secondary-normal w-6 h-6"
                            type="checkbox"
                            checked={values.attendances.query.late}
                            onChange={handlers.attendances.checks(1)}
                          />
                          <p className="font-semibold capitalize">
                            Late Clock In
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="flex flex-row gap-4">
                          <input
                            type="checkbox"
                            checked={values.attendances.query.early}
                            onChange={handlers.attendances.checks(2)}
                            className="accent-secondary-normal text-secondary-normal w-6 h-6"
                          />
                          <p className="font-semibold capitalize">
                            Early Clock Out
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="flex flex-row gap-4">
                          <input
                            type="checkbox"
                            checked={values.attendances.query.closed}
                            onChange={handlers.attendances.checks(3)}
                            className="accent-secondary-normal text-secondary-normal w-6 h-6"
                          />
                          <p className="font-semibold capitalize">Closed</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <MyAttendanceLogTable
                  attendances={values.attendances.attendances}
                  paging={values.attendances.paging}
                  loading={values.attendances.loading}
                  paginationCallback={handlers.attendances.pagination}
                  size={10}
                  emptyStateText={`${name} has no attendances`}
                />
              </>
            )}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="body-container">
        <div className="flex flex-row justify-center w-full mb-8 relative">
          <button
            type="button"
            className="btn btn-ghost-neuro normal-case text-slate-400 self-start absolute left-0"
            onClick={handlers.back}
          >
            Back
          </button>
          <h1 className="text-xl text-center font-bold self-center">
            {getFirstAndLastName(values.detail?.fullName)}'s Profile
          </h1>
        </div>
        <div className="border-t-2 border-slate-300 dark:border-slate-700 mb-8">
          <div
            className="relative top-[-15px] left-1/2 bg-white dark:bg-slate-700  w-fit px-8 text-slate-400"
            style={{ transform: "translateX(-50%)" }}
          >
            Personal Information
          </div>
          <div className="inline-flex w-full justify-center justify-items-center gap-4">
            <div className="container w-1/4 px-2">
              <div className="flex flex-row justify-center">
                <div className="flex flex-col items-center gap-3">
                  <h3 className="text-lg font-semibold">Employee Photo</h3>
                  {values.detail?.avatar ? (
                    <ProfileAvatar>
                      <img src={values.detail?.avatar ?? ""} alt="profile" />
                    </ProfileAvatar>
                  ) : (
                    <PlaceholderAvatar
                      role={values.detail?.role?.code}
                      fullName={values.detail?.fullName}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="container flex flex-col gap-6 w-3/4 px-2">
              {/* Full name */}
              <div className="flex flex-row justify-between w-full">
                <p>Full name</p>
                <p>{values.detail?.fullName ?? ""}</p>
              </div>

              {/* Date of Birth */}
              <div className="flex flex-row justify-between w-full">
                <p>Date of Birth</p>
                <p>{values.detail?.biodata?.birthDate}</p>
              </div>

              {/* Email */}
              <div className="flex flex-row justify-between w-full">
                <p>Email</p>
                <p>{values.detail?.email}</p>
              </div>

              {/* Phone Number */}
              <div className="flex flex-row justify-between w-full">
                <p>Phone Number</p>
                <p>{values.detail?.biodata?.phoneNumber}</p>
              </div>

              {/* Gender */}
              <div className="flex flex-row justify-between w-full">
                <p>Gender</p>
                <p>
                  {
                    GENDERS.find(
                      (item) => item.value === values.detail?.biodata?.gender
                    )?.name
                  }
                </p>
              </div>

              {/* Marital Status */}
              <div className="flex flex-row justify-between w-full">
                <p>Marital Status</p>
                <p>
                  {values.detail?.biodata?.maritalStatus ? "Married" : "Single"}
                </p>
              </div>
              <div className="border-t-2 border-slate-300 dark:border-slate-700 mb-8">
                <div
                  className="relative top-[-15px] left-1/2 bg-white dark:bg-slate-700 w-fit px-8 text-slate-400"
                  style={{ transform: "translateX(-50%)" }}
                >
                  Work Information
                </div>
                <div className="flex flex-col gap-6">
                  {/* Job */}
                  <div className="flex justify-between">
                    <p>Job</p>
                    <p>{values.detail?.job?.name}</p>
                  </div>

                  {/* Status */}
                  <div className="flex justify-between">
                    <p>Status</p>
                    <StatusBadgeIndicator status={values.detail?.status} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
