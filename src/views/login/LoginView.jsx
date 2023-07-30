/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import LoginModel from "./LoginModel";

// Assets
import logo from "../../assets/icons/sinarlog-logo.svg";
import logoDark from "../../assets/icons/sinarlog-logo-dark.svg";
import icon from "../../assets/icons/sinarlog-icon.svg";
import welcome from "../../assets/images/login-welcome.png";
import { BsEyeSlash, BsEye } from "react-icons/bs";

export default function LoginView() {
  const {
    isVisible,
    payload,
    canSubmit,
    emailRef,
    handleEmailOnChange,
    handlePasswordOnChange,
    handleOnBlurEmail,
    handleSubmit,
    handlePasswordVisibility,
    isLoggedInPreviously,
    isDarkTheme,
  } = LoginModel();

  useEffect(() => {
    isLoggedInPreviously();
  }, []);

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
              src={isDarkTheme ? logoDark : logo}
              alt="SinarLog Name"
            />
          </div>
          <h1 className="text-md md:text-xl lg:text-2xl font-bold">Welcome</h1>
          <p className="mb-5">Let's get you logged in.</p>
          <form noValidate className="group">
            <div className="form-control w-full max-w-xs gap-1">
              <label className="label" htmlFor="login-email-input">
                <span className="label-text">Email</span>
              </label>
              <input
                required
                type="email"
                name="email"
                ref={emailRef}
                value={payload.email}
                id="login-email-input"
                className="peer input input-bordered form-background w-full max-w-xs mb-3"
                autoComplete="on"
                onChange={handleEmailOnChange}
                onBlur={handleOnBlurEmail}
              />
              <label className="label label-red" htmlFor="login-password-input">
                <span className="label-text">Password</span>
                <a
                  className="leading-4 text-xs text-primary-normal cursor-pointer select-none"
                  href="/forgot-password"
                >
                  Forgot password?
                </a>
              </label>
              <div className="flex flex-row relative">
                <input
                  required
                  type={isVisible ? "text" : "password"}
                  name="password"
                  value={payload.password}
                  onChange={handlePasswordOnChange}
                  id="login-password-input"
                  className="peer input input-bordered form-background block w-full max-w-xs"
                  autoComplete="on"
                />
                <button
                  type="button"
                  className="btn btn-ghost absolute right-4 top-0"
                  onClick={handlePasswordVisibility}
                >
                  {isVisible ? <BsEyeSlash /> : <BsEye />}
                </button>
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                onSubmit={handleSubmit}
                disabled={canSubmit()}
                className="btn btn-primary-normal text-white normal-case mt-3 w-full"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="w-0 md:w-1/2 overflow-hidden hidden md:flex h-full px-10 justify-center items-center">
        <div>
          <img src={welcome} alt="Welcome Login" />
        </div>
      </div>
    </div>
  );
}
