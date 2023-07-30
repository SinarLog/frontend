import ActionModal from "../modals/ActionModal";
import OTPsvg from "../../assets/icons/input-otp.svg";

export default function InputOTP({
  value,
  handlers,
  modalRef,
  size = 6,
  validationPattern = /[0-9]{1}/,
}) {
  const arr = new Array(size).fill("-");

  const handleInputChange = (e, index) => {
    const elem = e.target;
    const val = e.target.value;
    if (!validationPattern.test(val) && val !== "") return;
    const valueArr = value.split("");
    valueArr[index] = val;
    const newVal = valueArr.join("").slice(0, 6);
    handlers.otp(newVal);
    if (val) {
      const next = elem.nextElementSibling;
      next?.focus();
    }
  };

  const handleKeyUp = (e) => {
    const current = e.currentTarget;
    if (e.key === "ArrowLeft" || e.key === "Backspace") {
      const prev = current.previousElementSibling;
      prev?.focus();
      prev?.setSelectionRange(0, 1);
      return;
    }

    if (e.key === "ArrowRight") {
      const prev = current.nextSibling;
      prev?.focus();
      prev?.setSelectionRange(0, 1);
      return;
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const val = e.clipboardData.getData("text").substring(0, size);
    handlers.otp(val);
  };

  const validateValue = () => {
    if (value?.length !== size) return true;
    for (let char of value) {
      if (!validationPattern.test(char)) {
        return true;
      }
    }
    return false;
  };

  return (
    <ActionModal
      id="otpModal"
      modalRef={modalRef}
      closeCallback={handlers.modal}
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-center font-bold text-xl">OTP Verification</h1>
        <img src={OTPsvg} alt="otp-mail-logo" className="w-fit self-center" />
        <p className="text-center">
          We will send an OTP code to your email. Enter the code here to verify
          your clock in.
        </p>
        <div className="flex gap-2 self-center">
          {arr.map((_, index) => {
            return (
              <input
                key={index}
                className="input input-bordered form-background px-0 text-center w-12"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern={validationPattern.source}
                maxLength={6}
                value={value?.at(index) ?? ""}
                onChange={(e) => handleInputChange(e, index)}
                onKeyUp={handleKeyUp}
                onPaste={handlePaste}
              />
            );
          })}
        </div>
        <button
          type="button"
          className="btn btn-primary-normal w-11/12 self-center text-white normal-case"
          onClick={handlers.submit}
          disabled={validateValue()}
        >
          Submit
        </button>
      </div>
    </ActionModal>
  );
}
