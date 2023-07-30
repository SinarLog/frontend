import { useContext, useRef, useState } from "react";
import { forgotPassword } from "../../app/services/api/public";
import { NotifContext } from "../../app/context/notif";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ForgotPasswordModel() {
  const { showAlert } = useContext(NotifContext);
  const navigate = useNavigate();
  const [payload, setPayload] = useState({ email: "" });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const theme = useSelector((state) => state.theme);
  const emailRef = useRef(null);

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleEmailOnChange = (event) => {
    setPayload({ ...payload, email: event.target.value });
  };

  /**
   * Handles validation checks when not in focus
   */
  const handleOnBlurEmail = () => {
    if (!payload.email.match(emailRegex)) {
      emailRef.current.classList.add("border-red-500");
      setSubmitDisabled(true);
    } else {
      emailRef.current.classList.remove("border-red-500");
      setSubmitDisabled(false);
    }
  };

  const handleSubmit = (event) => {
    setSubmitLoading(true);
    setSubmitDisabled(true);
    event.preventDefault();
    forgotPassword(payload)
      .then(() => {
        showAlert("SUCCESS", "We have sent an email for your new password");
        setTimeout(() => {
          navigate("/");
        }, 500);
      })
      .catch((err) => {
        showAlert("ERROR", err);
      })
      .finally(() => {
        setSubmitLoading(false);
        setSubmitDisabled(false);
      });
  };

  return {
    values: {
      payload,
      loading: submitLoading,
      disbaled: submitDisabled,
      isDarkTheme: theme === "dark",
    },
    handlers: {
      email: handleEmailOnChange,
      blur: handleOnBlurEmail,
      submit: handleSubmit,
    },
    refs: {
      email: emailRef,
    },
  };
}
