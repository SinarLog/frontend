/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../app/context/auth";
import withSocket from "../../app/services/sockets";

// Components
import NavBar from "../../components/navbar/NavBar";

// Views
import UnauthorizedView from "../4xx/401View";
import OoopsView from "../4xx/OopsView";
import ChatView from "./chat/ChatView";

function BaseDomainView() {
  const { verify } = useContext(AuthContext);
  const unauthorized = useSelector((state) => state.auth.unauthorized);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    verify();
  }, []);

  return (
    <>
      {!unauthorized && token ? (
        <>
          {/* MAIN */}
          <div className="hidden lg:block">
            <NavBar />
            <div className="p-10">
              <Outlet />
            </div>
            <ChatView />
          </div>

          {/* MIN-WIDTH ERROR */}
          <div className="block lg:hidden">
            <OoopsView />
          </div>
        </>
      ) : (
        <UnauthorizedView />
      )}
    </>
  );
}

export default withSocket(BaseDomainView);
