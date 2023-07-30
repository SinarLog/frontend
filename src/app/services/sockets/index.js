import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { NotifContext } from "../../context/notif";
import { getFirstAndLastName } from "../../utils/strings";

/**
 * withSocket is a HOC that wraps a component that subscribes
 * to a WebSocket server.
 * @param {React.Component} WrappedComponent
 * @returns {React.Component}
 */
export default function withSocket(WrappedComponent) {
  function WithSocketComponent() {
    const { showNotif } = useContext(NotifContext);
    const currentUser = useSelector((state) => state.currentUser);

    useEffect(() => {
      try {
        const protocol = process.env.NODE_ENV === "development" ? "ws" : "wss";
        const ws = new WebSocket(
          `${protocol}://${process.env.REACT_APP_BACKEND_URL.replace(
            /https?:\/\//g,
            ""
          )}/api/v2/ws/${currentUser.id}`
        );

        /**
         * @param { { data: string } }
         */
        ws.onmessage = ({ data }) => {
          const arr = data.split(";");
          const payload = {
            type: arr[0],
            requesteeName: getFirstAndLastName(arr[1]),
            avatar: arr[2],
          };
          showNotif(payload);
        };

        return () => {
          ws.close();
        };
      } catch (err) {
        console.error(err);
      }
    });

    return <WrappedComponent />;
  }

  return WithSocketComponent;
}
