import { z } from "zod";
import { useContext, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../app/store/slices";
import { postLoginCredentials } from "../../app/services/api/credentials";
import { AuthContext } from "../../app/context/auth";
import { NotifContext } from "../../app/context/notif";

const initPayload = {
  email: "",
  password: "",
};

export default function LoginModel() {
  const { login, verify } = useContext(AuthContext);
  const { showAlert } = useContext(NotifContext);
  const [payload, setPayload] = useState(initPayload);
  const [isVisible, setIsVisible] = useState(false);
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const emailRef = useRef();

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  /**
   * @param {React.FormEvent<HTMLInputElement>} event
   */
  const handleEmailOnChange = (event) => {
    setPayload({ ...payload, email: event.target.value });
  };

  /**
   * @param {React.FormEvent<HTMLInputElement>} event
   */
  const handlePasswordOnChange = (event) => {
    setPayload({ ...payload, password: event.target.value });
  };

  // BUG: This could be dangerous
  const isLoggedInPreviously = () => {
    verify(true);
  };

  /**
   * Handles validation checks when not in focus
   */
  const handleOnBlurEmail = () => {
    if (!payload.email.match(emailRegex)) {
      emailRef.current.classList.add("border-red-500");
    } else {
      emailRef.current.classList.remove("border-red-500");
    }
  };

  /**
   * Handles the eye button for password visibilty
   * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event
   */
  const handlePasswordVisibility = (event) => {
    event.preventDefault();
    setIsVisible(!isVisible);
  };

  const canSubmit = () => {
    return (
      !z.string().min(1).safeParse(payload.password).success ||
      !payload.email.match(emailRegex)
    );
  };

  /**
   *
   * @param {React.FormEvent<HTMLButtonElement>} event
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await postLoginCredentials(payload);
      dispatch(setCurrentUser(response));
      login(response.accessToken);
    } catch (err) {
      showAlert("ERROR", err);
    }
  };

  return {
    payload,
    isVisible,
    canSubmit,
    emailRef,
    handleEmailOnChange,
    handlePasswordOnChange,
    handleOnBlurEmail,
    handleSubmit,
    handlePasswordVisibility,
    isLoggedInPreviously,
    isDarkTheme: theme === "dark",
  };
}
