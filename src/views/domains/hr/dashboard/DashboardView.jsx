import { Link } from "react-router-dom";

// Views
import ProposalsView from "./proposals/ProposalView";
import AttendanceView from "./attendances/AttendanceView";

// Components
import Clock from "../../../../components/clock/Clock";
import Schedule from "../../../../components/clock/Schedule";
import AnalyticsView from "./analytics/AnalyticsView";

export default function DashboardView() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex sm:flex-row flex-col gap-4 relative">
          <Clock />
          <Schedule />
          <Link
            to={"/hr/config"}
            className="btn btn-secondary-normal self-end text-white normal-case absolute right-0"
          >
            Configurations
          </Link>
        </div>
        <AnalyticsView />
        <ProposalsView />
        <AttendanceView />
      </div>
    </>
  );
}
