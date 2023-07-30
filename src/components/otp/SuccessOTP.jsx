// Components
import InfoModalBackdrop from "../modals/InfoModalBackdrop";

// Assets
import SuccesOTPsvg from "../../assets/icons/success-otp.svg";

export default function SuccessOTP({ id, modalRef, children }) {
  return (
    <InfoModalBackdrop id={id} modalRef={modalRef}>
      <div className="flex flex-col gap-2">
        <h1 className="text-center font-bold text-xl">Success</h1>
        <img
          src={SuccesOTPsvg}
          alt="Success OTP"
          className="w-fit self-center"
        />
        {children}
      </div>
      <button
        type="submit"
        className="btn btn-success-normal text-white normal-case w-full"
      >
        Go to dashboard
      </button>
    </InfoModalBackdrop>
  );
}
