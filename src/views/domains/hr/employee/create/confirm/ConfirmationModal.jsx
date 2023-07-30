import {
  EMPLOYMENT_TYPES,
  GENDERS,
  MARITAL_STATUS,
  RELIGIONS,
  RElATIONS,
} from "../../../../../../app/utils/constants";
import { getFirstAndLastName } from "../../../../../../app/utils/strings";

// Components
import InlineLoading from "../../../../../../components/loaders/InlineLoading";

export default function ConfirmationModal({ values, submitCallback }) {
  return (
    <dialog id="createEmployeeModal" className="modal">
      <form method="dialog" className="modal-box w-11/12 max-w-5xl p-4">
        <h3 className="text-3xl font-bold mb-4">Employee Information</h3>

        {/* Personal Information */}
        <div className="border-t-2 border-slate-300 dark:border-slate-700 mb-8">
          <div
            className="relative top-[-15px] left-1/2 bg-white dark:bg-slate-700 w-fit px-8 text-slate-400"
            style={{ transform: "translateX(-50%)" }}
          >
            Personal Information
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="flex justify-between">
              <p>Full name: </p>
              <div className="w-1/2 self-end text-right">
                <p className="flex-wrap">{values?.fullName}</p>
              </div>
            </div>
            <div className="flex justify-between">
              <p>Gender: </p>
              <p>
                {GENDERS.find((item) => item.value === values.gender)?.name}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Date of Birth: </p>
              <p>{values.birthDate?.startDate}</p>
            </div>
            <div className="flex justify-between">
              <p>Religion: </p>
              <p>
                {RELIGIONS.find((item) => item.value === values.religion)?.name}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Email: </p>
              <p>{values.email}</p>
            </div>
            <div className="flex justify-between">
              <p>Marital Status: </p>
              <p>
                {
                  MARITAL_STATUS.find(
                    (item) => item.value === values.maritalStatus
                  )?.name
                }
              </p>
            </div>
            <div className="flex justify-between">
              <p>Phone Number: </p>
              <p>{"+62 " + values.phoneNumber}</p>
            </div>
            <div className="flex justify-between">
              <p>NIK: </p>
              <p>{values.nik}</p>
            </div>
            <div className="flex flex-row justify-between w-full">
              <p>Address: </p>
              <div className="w-1/2 self-end text-right">
                <p className="flex-wrap">{values?.address}</p>
              </div>
            </div>
            <div className="flex justify-between">
              <p>NPWP: </p>
              <p>{values.npwp}</p>
            </div>
            <div className="flex justify-between w-full"></div>
            <div className="flex justify-between">
              <p>Photo: </p>
              <p>{values.avatar}</p>
            </div>
          </div>
        </div>

        {/* Work Information */}
        <div className="border-t-2 border-slate-300 dark:border-slate-700 mb-8">
          <div
            className="relative top-[-15px] left-1/2 bg-white dark:bg-slate-700 w-fit px-8 text-slate-400"
            style={{ transform: "translateX(-50%)" }}
          >
            Work Information
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="flex justify-between">
              <p>Employment Type: </p>
              <p>
                {
                  EMPLOYMENT_TYPES.find(
                    (item) => item.value === values.contractType
                  )?.name
                }
              </p>
            </div>
            <div className="flex justify-between">
              <p>Role: </p>
              <p>{values.roleName}</p>
            </div>
            <div className="flex justify-between">
              <p>Job: </p>
              <p>{values.jobName}</p>
            </div>
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
          <div className="grid grid-cols-2 gap-8">
            <div className="flex justify-between">
              <p>Full Name: </p>
              <p>{values.emergencyFullName}</p>
            </div>
            <div className="flex justify-between">
              <p>Phone Number: </p>
              <p>{"+62 " + values.emergencyPhoneNumber}</p>
            </div>
            <div className="flex justify-between">
              <p>Relation: </p>
              <p>
                {
                  RElATIONS.find(
                    (item) => item.value === values.emergencyRelation
                  )?.name
                }
              </p>
            </div>
          </div>
        </div>
        <div className="text-center flex flex-row justify-center items-center w-full">
          <p className="text-[#B07400] bg-[#F4B741] bg-opacity-20 self-center p-2 rounded-lg">
            Once you are sure, we will send an email consisting of their login
            credentials to {values.email}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <button
            type="button"
            className="btn btn-secondary-normal normal-case text-white w-full"
            onClick={submitCallback}
            disabled={values.loading}
          >
            {values.loading === true ? (
              <InlineLoading />
            ) : (
              <p>
                Send to "<span>{getFirstAndLastName(values.fullName)}</span>"
              </p>
            )}
          </button>
          <button className="btn btn-warning-normal normal-case text-white w-full">
            Back to editing
          </button>
        </div>
      </form>
    </dialog>
  );
}
