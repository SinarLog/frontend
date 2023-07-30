/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { getFirstAndLastName } from "../../../../../app/utils/strings";
import { GENDERS } from "../../../../../app/utils/constants";

import EmployeeDetailModel from "./EmployeeDetailModel";

// Components
import ProfileAvatar from "../../../../../components/avatars/ProfileAvatar";
import PlaceholderAvatar from "../../../../../components/avatars/PlaceholderAvatar";
import StatusBadgeIndicator from "../../../../../components/indicators/StatusBadgeIndicator";

export default function EmployeeDetailView() {
  const { values, handlers, fetchers } = EmployeeDetailModel();

  useEffect(() => {
    fetchers.employee(values.employeeId);
  }, [values.employeeId]);

  return (
    <div className="px-10 body-container">
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
