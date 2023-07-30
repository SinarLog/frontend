import Datepicker from "react-tailwindcss-datepicker";

// Components
import InfoInput from "../../../../../../components/input/InfoInput";

// Assets
import indonesiaFlag from "../../../../../../assets/images/indonesia.png";

// Constants
import {
  GENDERS,
  MARITAL_STATUS,
  RELIGIONS,
} from "../../../../../../app/utils/constants";

export default function PersonalInformationView({
  values,
  handlers,
  blurs,
  validators,
}) {
  return (
    <form
      validate
      onChange={validators.personalInformation}
      onBlur={validators.personalInformation}
      onKeyUp={validators.personalInformation}
    >
      <div className="grid grid-cols-2 gap-6">
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
            className="input w-full max-w-md form-background input-bordered"
            value={values.fullName}
            onChange={handlers.fullName}
            onBlur={blurs.fullName}
            minLength={1}
          />
        </div>

        {/* Birth Date */}
        <div className="form-control gap-1">
          <label htmlFor="birth-date">
            Birth Date
            <span className="mx-1 text-red-500">*</span>
          </label>

          <Datepicker
            useRange={false}
            asSingle={true}
            inputClassName="w-full font-normal input input-bordered form-background dark:text-white"
            primaryColor={"rose"}
            value={values.birthDate}
            onChange={handlers.birthDate}
            onBlur={blurs.date}
            startFrom="2000-01-01"
          />
        </div>

        {/* Email */}
        <div className="form-control gap-1">
          <label htmlFor="email">
            Email
            <span className="mx-1 text-red-500">*</span>
          </label>
          <input
            id="email"
            required
            type="email"
            placeholder="Email"
            className="input input-bordered form-background w-full max-w-md"
            value={values.email}
            onChange={handlers.email}
            onBlur={blurs.email}
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
              value={values.phoneNumber}
              onChange={handlers.phoneNumber}
              onBlur={blurs.phoneNumber}
            />
          </div>
        </div>

        {/* Address */}
        <div className="form-control gap-1 col-span-2">
          <label htmlFor="address">
            Address
            <span className="mx-1 text-red-500">*</span>
          </label>
          <textarea
            id="address"
            type="text"
            placeholder="Address"
            required
            className="textarea textarea-bordered h-40 resize-x form-background"
            value={values.address}
            onChange={handlers.address}
            onBlur={blurs.address}
          />
        </div>

        {/* Gender */}
        <div className="form-control gap-1">
          <label htmlFor="gender">
            Gender
            <span className="mx-1 text-red-500">*</span>
          </label>
          <select
            className="select select-bordered form-background select-md select-ghost w-full max-w-xs"
            onChange={handlers.gender}
            value={values.gender}
            onBlur={blurs.dropdowns}
          >
            <option disabled selected value={""}>
              Select a gender
            </option>
            {GENDERS.map((item, index) => (
              <option key={index} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* Marital Status */}
        <div className="form-control gap-1">
          <label htmlFor="marital-status">
            Marital Status
            <span className="mx-1 text-red-500">*</span>
          </label>
          <select
            className="select select-bordered form-background select-md select-ghost w-full max-w-xs"
            id="gender"
            onChange={handlers.maritalStatus}
            value={values.maritalStatus}
            onBlur={blurs.dropdowns}
          >
            <option disabled selected value={""}>
              Select marital status
            </option>
            {MARITAL_STATUS.map((item, index) => (
              <option key={index} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* NPWP */}
        <div className="form-control gap-1">
          <label htmlFor="npwp">
            NPWP
            <span className="mx-1 text-red-500">*</span>
          </label>
          <input
            id="nik"
            type="text"
            placeholder="NPWP"
            required
            className="input input-bordered form-background w-full max-w-md"
            value={values.npwp}
            onChange={handlers.npwp}
            onBlur={blurs.npwp}
          />
        </div>

        {/* Religion */}
        <div className="form-control gap-1">
          <label htmlFor="gender">
            Religion
            <span className="mx-1 text-red-500">*</span>
          </label>
          <select
            className="select select-bordered form-background select-md select-ghost w-full max-w-xs"
            id="gender"
            onChange={handlers.religion}
            value={values.religion}
            onBlur={blurs.dropdowns}
          >
            <option disabled selected value={""}>
              Select religion
            </option>
            {RELIGIONS.map((item, index) => (
              <option key={index} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* NIK */}
        <div className="form-control gap-1">
          <label htmlFor="nik">
            NIK
            <span className="mx-1 text-red-500">*</span>
          </label>
          <input
            id="nik"
            type="number"
            placeholder="NIK"
            required
            className="input input-bordered form-background w-full max-w-md"
            value={values.nik}
            onChange={handlers.nik}
            onBlur={blurs.nik}
          />
        </div>

        {/* Photo */}
        <div className="form-control gap-1">
          <label htmlFor="npwp">
            Profile Picture
            <span className="mx-1 text-slate-500">(Max 2 MB)</span>
          </label>
          <input
            type="file"
            className="file-input file-input-bordered form-background w-full max-w-xs"
            accept="image/png, image/jpg, image/jpeg"
            onChange={handlers.avatar}
            placeholder="Upload (Max 2 MB)"
          />
        </div>
      </div>
    </form>
  );
}
