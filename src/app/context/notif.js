/* eslint-disable default-case */
import { createContext } from "react";
import { useDispatch } from "react-redux";
import { setUnauthorized } from "../store/slices";

// Components
import toast, { Toaster } from "react-hot-toast";
import Notif from "../../components/notif/Notif";

const NOTIF_TYPES = {
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

export const NotifContext = createContext();

export function NotifProvider({ children }) {
  const dispatch = useDispatch();
  /**
   * showNotif will append a notification onto the
   * notifList state inside the NotifProvider
   * @param {string} type
   * @param {{message: string, status: number} | string} payload
   */
  const showAlert = (type, payload) => {
    switch (type) {
      case NOTIF_TYPES.SUCCESS:
        toast.success(payload, {
          duration: 5000,
        });
        break;
      case NOTIF_TYPES.ERROR:
        if (typeof payload === "string") {
          toast.error(payload, {
            duration: 5000,
            id: payload.status,
          });
        } else {
          toast.error(payload.message, {
            duration: 5000,
            id: payload.status,
          });

          if (payload.status === 401) {
            setTimeout(() => {
              dispatch(setUnauthorized());
            }, 500);
          }
          break;
        }
    }
  };

  const showNotif = (payload) =>
    toast.custom((t) => <Notif toaster={t} payload={payload} />);

  return (
    <NotifContext.Provider value={{ showAlert, showNotif }}>
      {children}
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "#4BB543",
              color: "white",
              width: "max-content",
              minHeight: "5rem",
              padding: "1rem 0.5rem",
              whiteSpace: "pre-line",
              boxShadow:
                "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
            },
          },
          error: {
            style: {
              background: "rgba(234,67,66,255)",
              color: "white",
              width: "max-content",
              minWidth: "5rem",
              minHeight: "5rem",
              padding: "1rem 0.5rem",
              whiteSpace: "pre-line",
              boxShadow:
                "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
            },
          },
        }}
        position="bottom-right"
        reverseOrder={false}
      />
    </NotifContext.Provider>
  );
}
