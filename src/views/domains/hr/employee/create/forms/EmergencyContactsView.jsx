// Components
import InfoInput from "../../../../../../components/input/InfoInput";

// Assets
import indonesiaFlag from "../../../../../../assets/images/indonesia.png";

// Constants
import { RElATIONS } from "../../../../../../app/utils/constants";

export default function EmergencyContactView({
  validators,
  values,
  handlers,
  blurs,
}) {
  return (
    <form
      validate
      onBlur={validators.emergencyInformation}
      onChangeCapture={validators.emergencyInformation}
    >
      <div className="flex flex-col w-full space-y-8 p-5">
        {/* Full Name */}
        <div className="form-control gap-1">
          <label htmlFor="full-name">
            Full Name
            <span className="mx-1 text-red-500">*</span>
          </label>
          <input
            id="full-name"
            type="text"
            placeholder="Full Name"
            required
            className="input input-bordered form-background w-full max-w-md"
            value={values.emergencyFullName}
            onChange={handlers.emergency.fullName}
            onBlur={blurs.fullName}
          />
        </div>

        {/* Phone Number */}
        <div className="form-control gap-1">
          <label htmlFor="phone-number">
            Phone Number
            <span className="mx-1 text-red-500">*</span>
          </label>
          <div className="join">
            <InfoInput>
              <p>+62</p>
              <img src={indonesiaFlag} alt="Indonesia Flag" className="w-3" />
            </InfoInput>
            <input
              id="phone-number"
              type="text"
              placeholder="Phone Number"
              requried
              className="input input-bordered form-background w-full max-w-md join-item"
              value={values.emergencyPhoneNumber}
              onChange={handlers.emergency.phoneNumber}
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
            className="select select-bordered form-background select-md select-ghost w-full max-w-xs"
            id="relation"
            onChange={handlers.emergency.relation}
            value={
              values.emergencyRelation === "" || undefined
                ? "START"
                : values.emergencyRelation
            }
            onBlur={blurs.dropdowns}
          >
            <option disabled selected value={"START"}>
              Select a relation
            </option>
            {RElATIONS.map((item, index) => (
              <option value={item.value} key={index}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </form>
  );
}
