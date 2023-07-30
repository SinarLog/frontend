import InlineLoading from "../../../../../../components/loaders/InlineLoading";
import InputOTP from "../../../../../../components/otp/InputOTP";
import SuccessOTP from "../../../../../../components/otp/SuccessOTP";

// Assets
import ClockInLight from "../../../../../../assets/icons/clockin-light.svg";
import ClockInDark from "../../../../../../assets/icons/clockin-dark.svg";

export default function ClockInView({ values, handlers, refs }) {
  const isDisabled = values.geolocationDisbabled || values?.time;
  return (
    <>
      <div className="body-container flex flex-col justify-center gap-2 max-w-sm col-span-none">
        <div
          className="tooltip w-full"
          data-tip={
            values?.geolocationDisbabled
              ? "Please turn on location service to be able to clock in"
              : null
          }
        >
          <button
            type="button"
            className="btn btn-success-normal text-white normal-case border-transparent w-full"
            onClick={handlers.request}
            disabled={isDisabled}
          >
            {values?.loading ? (
              <InlineLoading />
            ) : (
              <span className="flex flex-row gap-2 justify-center align-middle items-center">
                {isDisabled ? (
                  <img src={ClockInDark} alt="Clock in" />
                ) : (
                  <img src={ClockInLight} alt="Clock in" />
                )}{" "}
                Clock In
              </span>
            )}
          </button>
        </div>
        <h5>{values?.time ?? "Timestamp -"}</h5>
      </div>

      <InputOTP value={values?.otp} handlers={handlers} modalRef={refs.input} />

      <SuccessOTP id="successOTPModal" modalRef={refs.success}>
        <p className="text-center">You have successfully clocked in</p>
      </SuccessOTP>
    </>
  );
}
