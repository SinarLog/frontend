import { Outlet } from "react-router-dom";
import withGeolocation from "../../../app/services/geolocation";

function StaffDomainView() {
  return <Outlet />;
}

export default withGeolocation(StaffDomainView);
