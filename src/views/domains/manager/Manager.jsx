import { Outlet } from "react-router-dom";
import withGeolocation from "../../../app/services/geolocation";

function ManagerDomainView() {
  return <Outlet />;
}

export default withGeolocation(ManagerDomainView);
