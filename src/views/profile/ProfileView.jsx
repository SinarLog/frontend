/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import { RElATIONS } from "../../app/utils/constants";
import ProfileModel from "./ProfileModel";

// Components
import EmployeeChangesLogTable from "../../components/tables/EmployeeChangesLogTables";
import ProfileAvatar from "../../components/avatars/ProfileAvatar";
import PlaceholderAvatar from "../../components/avatars/PlaceholderAvatar";
import ActionModal from "../../components/modals/ActionModal";
import InlineLoading from "../../components/loaders/InlineLoading";
import InfoInput from "../../components/input/InfoInput";

// Assets
import indonesiaFlag from "../../assets/images/indonesia.png";

export default function ProfileView() {
  const { values, handlers, refs, blurs, fetchers } = ProfileModel();

  useEffect(() => {
    fetchers.profile();
  }, []);

  useEffect(() => {
    fetchers.logs();
  }, [values.currentPage]);

  useEffect(() => {
    if (!values.avatar) {
      handlers.preview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(values.avatar);
    handlers.preview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [values.avatar]);

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="body-container">
          {/* Title */}
          <div className="flex flex-row justify-between mb-8">
            <button
              className="btn btn-ghost-neuro normal-case w-24"
              onClick={handlers.back}
            >
              Back
            </button>
            <h1 className="text-xl font-bold text-center">Profile</h1>
            <button
              className="btn btn-success-normal text-white normal-case w-24"
              onClick={handlers.biodata.open}
            >
              Edit
            </button>
          </div>

          {/* Content */}
          <div className="flex flex-row w-full">
            {/* Left */}
            <div className="flex flex-col gap-6 w-1/3 items-center align-middle">
              <h3 className="text-lg font-bold">Employee Profile</h3>
              {values.profile?.avatar || values.preview ? (
                <ProfileAvatar>
                  <img
                    src={
                      values.avatar != null
                        ? values.preview
                        : values.profile?.avatar
                        ? values.profile?.avatar + `?random=${Date.now()}`
                        : ""
                    }
                    alt="profile"
                  />
                  <div className="absolute top-0 left-0 w-full h-0 flex rounded-full flex-col justify-center items-center bg-slate-100 bg-opacity-50 dark:bg-slate-600 dark:bg-opacity-50 opacity-0 group-hover:h-full group-hover:opacity-100 duration-200">
                    <label className="flex flex-col justify-center align-middle items-center btn hover:btn-outline">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlers.avatar.change}
                      />
                      <MdModeEdit className="text-4xl font-bold text-center" />
                    </label>
                  </div>
                </ProfileAvatar>
              ) : (
                <PlaceholderAvatar
                  role={values.profile?.role?.code}
                  fullName={values.profile?.fullName}
                >
                  <div className="absolute top-0 left-0 w-full h-0 flex rounded-full flex-col justify-center items-center bg-slate-100 bg-opacity-50 dark:bg-slate-600 dark:bg-opacity-50 opacity-0 group-hover:h-full group-hover:opacity-100 duration-200">
                    <label className="flex flex-col justify-center align-middle items-center btn hover:btn-outline">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlers.avatar.change}
                      />
                      <MdModeEdit className="text-4xl font-bold text-center" />
                    </label>
                  </div>
                </PlaceholderAvatar>
              )}
              {values.avatar != null && (
                <button
                  className="btn btn-success-normal text-white normal-case"
                  onClick={handlers.avatar.submit}
                  disabled={values.avatarLoading}
                >
                  {values.avatarLoading ? <InlineLoading /> : "Save"}
                </button>
              )}
              <button
                className="btn btn-secondary-normal text-white normal-case"
                onClick={handlers.password.open}
              >
                Change Password
              </button>
            </div>
            {/* Right */}
            <div className="w-2/3">
              {/* Personal Information */}
              <div className="border-t-2 border-slate-300 dark:border-slate-700 mb-8 flex flex-col gap-y-4">
                <div
                  className="relative top-[-15px] left-1/2 bg-white dark:bg-slate-700 w-fit px-8 text-slate-400"
                  style={{ transform: "translateX(-50%)" }}
                >
                  Personal Information
                </div>
                {/* Full Name */}
                <div className="flex flex-row justify-between border-b-slate-200 dark:border-b-stone-400 border-b p-2">
                  <h3>Full Name</h3>
                  <h3>{values.profile?.fullName}</h3>
                </div>
                {/* Date of Birth */}
                <div className="flex flex-row justify-between border-b-slate-200 dark:border-b-stone-400 border-b p-2">
                  <h3>Date of Birth</h3>
                  <h3>{values.profile?.biodata?.birthDate}</h3>
                </div>
                {/* Email */}
                <div className="flex flex-row justify-between border-b-slate-200 dark:border-b-stone-400 border-b p-2">
                  <h3>Email</h3>
                  <h3>{values.profile?.email}</h3>
                </div>
                {/* Phone Number */}
                <div className="flex flex-row justify-between border-b-slate-200 dark:border-b-stone-400 border-b p-2">
                  <h3>Phone Number</h3>
                  <h3>{values.profile?.biodata?.phoneNumber}</h3>
                </div>
                {/* Address */}
                <div className="flex flex-row justify-between border-b-slate-200 dark:border-b-stone-400 border-b p-2">
                  <h3>Address</h3>
                  <h3>{values.profile?.biodata?.address}</h3>
                </div>
                {/* Gender */}
                <div className="flex flex-row justify-between border-b-slate-200 dark:border-b-stone-400 border-b p-2">
                  <h3>Gender</h3>
                  <h3>
                    {values.profile?.biodata?.gender === "F"
                      ? "Female"
                      : values.profile?.biodata?.gender === "M"
                      ? "Male"
                      : "-"}
                  </h3>
                </div>
                {/* Religion */}
                <div className="flex flex-row justify-between border-b-slate-200 dark:border-b-stone-400 border-b p-2">
                  <h3>Religion</h3>
                  <h3 className="capitalize">
                    {values.profile?.biodata?.religion?.toLowerCase()}
                  </h3>
                </div>
                {/* Marital Status */}
                <div className="flex flex-row justify-between border-b-slate-200 dark:border-b-stone-400 border-b p-2">
                  <h3>Marital Status</h3>
                  <h3 className="capitalize">
                    {values.profile?.biodata?.maritalStatus
                      ? "Married"
                      : "Single"}
                  </h3>
                </div>
                {/* NIK */}
                <div className="flex flex-row justify-between border-b-slate-200 dark:border-b-stone-400 border-b p-2">
                  <h3>NIK</h3>
                  <h3 className="capitalize">{values.profile?.biodata?.nik}</h3>
                </div>
                {/* NPWP */}
                <div className="flex flex-row justify-between p-2">
                  <h3>NPWP</h3>
                  <h3 className="capitalize">
                    {values.profile?.biodata?.npwp}
                  </h3>
                </div>
              </div>
              {/* Work Information */}
              <div className="border-t-2 border-slate-300 dark:border-slate-700 mb-8 flex flex-col gap-y-4">
                <div
                  className="relative top-[-15px] left-1/2 bg-white dark:bg-slate-700 w-fit px-8 text-slate-400"
                  style={{ transform: "translateX(-50%)" }}
                >
                  Work Information
                </div>
                {/* Job */}
                <div className="flex flex-row justify-between border-b-slate-200 dark:border-b-stone-400 border-b p-2">
                  <h3>Job</h3>
                  <h3 className="capitalize">{values.profile?.job?.name}</h3>
                </div>
                {/* Employement Type */}
                <div className="flex flex-row justify-between p-2">
                  <h3>Employment Type</h3>
                  <h3 className="capitalize">
                    {values.profile?.contractType
                      ?.toLowerCase()
                      ?.split("_")
                      ?.join(" ")}
                  </h3>
                </div>
              </div>

              {/* Emergency Contact Information */}
              <div className="border-t-2 border-slate-300 dark:border-slate-700 mb-8">
                <div
                  className="relative top-[-15px] left-1/2 bg-white dark:bg-slate-700 w-fit px-8 text-slate-400"
                  style={{ transform: "translateX(-50%)" }}
                >
                  Emergency Contact Information
                </div>
                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="table">
                    {/* Head */}
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Relation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {values.profile?.emergencyContacts?.map((item, index) => (
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
          </div>
        </div>

        <div className="body-container">
          <h1 className="text-xl font-bold">Changes Log</h1>
          <EmployeeChangesLogTable
            logs={values.logs.logs}
            paging={values.logs.paging}
            loading={values.logs.loading}
            paginationCallback={handlers.logs.pagination}
            detailCallback={handlers.logs.detail}
          />
        </div>
      </div>

      {/* Update Password Modal */}
      <ActionModal id="updatePasswordModal">
        <div className="border-t-2 border-slate-300 dark:border-slate-700 mb-8 flex flex-col gap-y-4 mt-6">
          <div
            className="relative top-[-15px] left-1/2 bg-white dark:bg-slate-700 w-fit px-8 text-slate-400"
            style={{ transform: "translateX(-50%)" }}
          >
            Update Password
          </div>
          <div className="form-control w-full gap-1">
            <label className="label" htmlFor="new-password">
              <span className="label-text">New password</span>
            </label>
            <div className="flex flex-row w-full relative">
              <input
                id="new-password"
                className="peer input input-bordered form-background block w-full"
                name="password"
                autoComplete="on"
                type={values.password.newVisible ? "text" : "password"}
                value={values.password.new}
                onChange={handlers.password.new}
                ref={refs.password.new}
                onBlur={() => handlers.password.validate}
              />
              <button
                name="new"
                type="button"
                className="btn btn-ghost absolute right-4 top-0"
                onClick={handlers.password.vis}
              >
                {values.password.newVisible ? <BsEyeSlash /> : <BsEye />}
              </button>
            </div>
            <label className="label" htmlFor="confirm-password">
              <span className="label-text">Confirm password</span>
            </label>
            <div className="flex flex-row w-full relative">
              <input
                id="confirm-password"
                className="peer input input-bordered form-background block w-full"
                name="password"
                autoComplete="on"
                type={values.password.confirmVisible ? "text" : "password"}
                value={values.password.confirm}
                onChange={handlers.password.confirm}
                ref={refs.password.confirm}
                onBlur={() => handlers.password.validate}
              />
              <button
                name="confirm"
                type="button"
                className="btn btn-ghost absolute right-4 top-0"
                onClick={handlers.password.vis}
              >
                {values.password.confirmVisible ? <BsEyeSlash /> : <BsEye />}
              </button>
            </div>
          </div>

          <div className="whitespace-pre-line break-words text-start text-xs bg-warning-normal p-2 rounded-lg">
            Please at least have 1 uppercase, 1 lowercase, 1 number and 1
            special character {`(!@#$%^&*(),.?":{}|<>)`} with minimum length of
            7 characters
          </div>

          <button
            type="submit"
            className="btn btn-success-normal text-white normal-case w-full"
            disabled={values.password.disabled}
            onClick={handlers.password.submit}
            onSubmit={handlers.password.submit}
          >
            {values.password.loading ? <InlineLoading /> : "Save"}
          </button>
          <button className="btn btn-ghost-neuro text-white normal-case w-full">
            Close
          </button>
        </div>
      </ActionModal>

      {/* Update Biodata Modal */}
      <ActionModal id="updateBiodataModal">
        <div className="flex flex-col gap-4 mt-6">
          <div className="border-t-2 border-slate-300 dark:border-slate-700 mb-8 flex flex-col gap-y-4">
            <div
              className="relative top-[-15px] left-1/2 bg-white dark:bg-slate-700 w-fit px-8 text-slate-400"
              style={{ transform: "translateX(-50%)" }}
            >
              Personal Information
            </div>
            <div className="form-control w-full gap-2">
              <label htmlFor="phone-number">
                Phone Number
                <span className="mx-1 text-red-500">*</span>
              </label>
              <div className="join">
                <InfoInput>
                  <p>+62</p>
                  <img
                    src={indonesiaFlag}
                    alt="Indonesia Flag"
                    className="w-3"
                  />
                </InfoInput>
                <input
                  id="phone-number"
                  name="phone-number"
                  type="text"
                  placeholder="Phone Number"
                  className="input input-bordered form-background w-full max-w-md join-item"
                  value={values.biodata.phoneNumber}
                  onChange={handlers.biodata.phoneNumber}
                  onBlur={blurs.phoneNumber}
                />
              </div>
              <label htmlFor="update-address">
                Address
                <span className="mx-1 text-red-500">*</span>
              </label>
              <textarea
                id="update-address"
                className="peer textarea textarea-bordered w-full h-24 form-background"
                name="address"
                value={values.biodata.address}
                onChange={handlers.biodata.address}
                onBlur={blurs.address}
              />
            </div>
          </div>
          <div className="border-t-2 border-slate-300 dark:border-slate-700 mb-8">
            <div
              className="relative top-[-15px] left-1/2 bg-white dark:bg-slate-700 w-fit px-8 text-slate-400"
              style={{ transform: "translateX(-50%)" }}
            >
              Emergency Contacts Information
            </div>
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="table">
                {/* Head */}
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Relation</th>
                  </tr>
                </thead>
                <tbody>
                  {values.biodata?.contacts?.map((item, index) => (
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

            {/* Add New Contact */}
            <div className="grid grid-cols-2 w-full gap-2 mt-2">
              {/* Name */}
              <div className="form-control w-full gap-2">
                <label htmlFor="add-name-contact">
                  Name
                  <span className="mx-1 text-red-500">*</span>
                </label>
                <input
                  id="add-name-contact"
                  className="peer input input-bordered form-background block w-full"
                  name="name"
                  type="text"
                  value={values.contact.name}
                  onChange={handlers.contact.name}
                  onBlur={blurs.name}
                />
              </div>
              {/* Phone Number */}
              <div className="form-control w-full gap-2">
                <label htmlFor="phone-number-contact">
                  Phone Number
                  <span className="mx-1 text-red-500">*</span>
                </label>
                <div className="join">
                  <InfoInput>
                    <p>+62</p>
                    <img
                      src={indonesiaFlag}
                      alt="Indonesia Flag"
                      className="w-3"
                    />
                  </InfoInput>
                  <input
                    id="phone-number-contact"
                    type="text"
                    className="input input-bordered form-background w-full max-w-md join-item"
                    value={values.contact.phoneNumber}
                    onChange={handlers.contact.phoneNumber}
                    onBlur={blurs.phoneNumber}
                  />
                </div>
              </div>
              {/* Relation */}
              <div className="form-control gap-1">
                <label htmlFor="relation">
                  Relation
                  <span className="mx-1 text-red-500">*</span>
                </label>
                <select
                  id="relation"
                  className="select select-bordered form-background select-md select-ghost w-full max-w-xs"
                  value={values.contact.relation}
                  onChange={handlers.contact.relation}
                  onBlur={blurs.dropdown}
                >
                  <option disabled value="">
                    Select a relation
                  </option>
                  {RElATIONS.map((item, index) => (
                    <option value={item.value} key={index}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Add */}
              <div className="form-control gap-1">
                <label
                  htmlFor="relation"
                  className="text-white dark:text-[#1d1c24]"
                >
                  -
                </label>
                <button
                  className="btn btn-success-normal normal-case text-white"
                  disabled={values.contact.disabled}
                  onClick={handlers.contact.submit}
                >
                  Add contact
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-success-normal text-white normal-case w-full"
            disabled={values.biodata.disabled}
            onClick={handlers.biodata.submit}
          >
            {values.biodata.loading ? <InlineLoading /> : "Save"}
          </button>
          <button className="btn btn-ghost-neuro text-white normal-case w-full">
            Close
          </button>
        </div>
      </ActionModal>
    </>
  );
}
