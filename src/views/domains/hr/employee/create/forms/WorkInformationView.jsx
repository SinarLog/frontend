// Constants
import { EMPLOYMENT_TYPES } from "../../../../../../app/utils/constants";

export default function WorkInformationView({
  values,
  handlers,
  validators,
  blurs,
}) {
  const jobs = values.jobs;
  const roles = values.roles;
  const managers = values.managers;

  return (
    <form
      validate
      onBlur={validators.workInformation}
      onChangeCapture={validators.workInformation}
    >
      <div className="flex flex-col space-y-8 w-full p-5">
        {/* Employment Type */}
        <div className="form-control gap-1">
          <label htmlFor="employment-select">
            Employment Type
            <span className="mx-1 text-red-500">*</span>
          </label>
          <select
            className="select select-bordered form-background select-md select-ghost w-full max-w-xs"
            id="employment-select"
            onChange={handlers.contractType}
            value={values.contractType}
            onBlur={blurs.dropdowns}
          >
            <option disabled selected value={""}>
              Select employement type
            </option>
            {EMPLOYMENT_TYPES.map((item, index) => (
              <option key={index} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* Job */}
        <div className="form-control gap-1">
          <label htmlFor="job-select">
            Job
            <span className="mx-1 text-red-500">*</span>
          </label>
          <select
            className="select select-bordered form-background select-md select-ghost w-full max-w-xs"
            id="job-select"
            onChange={handlers.jobId}
            value={values.jobId === "" || undefined ? "START" : values.jobId}
            onBlur={blurs.dropdowns}
          >
            <option disabled selected value={"START"}>
              Select a job
            </option>
            {jobs.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* Role */}
        <div className="form-control gap-1">
          <label htmlFor="role-select">
            Role
            <span className="mx-1 text-red-500">*</span>
          </label>
          <select
            className="select select-bordered form-background select-md select-ghost w-full max-w-xs"
            id="role-select"
            onChange={handlers.roleId}
            value={values.roleId === "" || undefined ? "START" : values.roleId}
            onBlur={blurs.dropdowns}
          >
            <option disabled selected value={"START"}>
              Select a role
            </option>
            {roles.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* Manager */}
        <div className="form-control gap-1">
          <label htmlFor="manager-select">Manager</label>
          <select
            className="select select-bordered form-background select-md select-ghost w-full max-w-xs"
            id="manager-select"
            disabled={values.managerButtonDisabled}
            onChange={handlers.managerId}
            value={
              values.managerId === "" || undefined ? "START" : values.managerId
            }
            onBlur={blurs.dropdowns}
          >
            <option disabled selected value={"START"}>
              Select a manager
            </option>
            {managers.map((item) => (
              <option key={item.id} value={item.id}>
                {item.fullName} - {item.email}
              </option>
            ))}
          </select>
        </div>
      </div>
    </form>
  );
}
