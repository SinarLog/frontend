import ForgotPasswordModel from "./ForgotPasswordModel";

// Components
import InlineLoading from "../../components/loaders/InlineLoading";

// Assets
import logo from "../../assets/icons/sinarlog-logo.svg";
import logoDark from "../../assets/icons/sinarlog-logo-dark.svg";
import icon from "../../assets/icons/sinarlog-icon.svg";
import forgot from "../../assets/images/forgot-password.png";

export default function ForgotPasswordView() {
  const { values, handlers, refs } = ForgotPasswordModel();

  return (
    <div className="w-screen h-screen flex justify-center align-middle">
      <div className="w-full md:w-1/2 h-full flex flex-col justify-center gap-8 px-24">
        <div className="w-4/5 self-end flex flex-col gap-4">
          <div className="flex flex-row align-middle gap-2 lg:mb-0 mb-6">
            <img
              className="lg:w-10 md:w-8 sm:w-6"
              src={icon}
              alt="SinarLog Icon"
            />
            <img
              className="lg:w-60 md:w-48 sm:w-28 w-24"
              src={values.isDarkTheme ? logoDark : logo}
              alt="SinarLog Name"
            />
          </div>
          <h1 className="text-md md:text-xl lg:text-2xl font-bold">
            Forgot Password
          </h1>
          <p className="mb-5">
            Enter your email associated with your account and we’ll send email
            with instruction to reset your password
          </p>
          <form noValidate className="group">
            <div className="form-control w-full max-w-xs gap-1">
              <label className="label" htmlFor="login-email-input">
                <span className="label-text">Email</span>
              </label>
              <input
                required
                type="email"
                name="email"
                ref={refs.email}
                value={values.payload.email}
                id="login-email-input"
                className="peer input input-bordered form-background w-full max-w-xs mb-3"
                autoComplete="on"
                onChange={handlers.email}
                onBlur={handlers.blur}
              />
              <button
                type="submit"
                onClick={handlers.submit}
                onSubmit={handlers.submit}
                disabled={values.disbaled}
                className="btn btn-primary-normal text-white normal-case mt-3 w-full"
              >
                {values.loading ? <InlineLoading /> : "Send Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="w-0 md:w-1/2 overflow-hidden hidden md:flex h-full px-10 justify-center items-center">
        <div>
          <img src={forgot} alt="Welcome Login" />
        </div>
      </div>
    </div>
  );
}
