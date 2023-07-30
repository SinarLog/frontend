import WhosTakingLeaveView from "./leaves/WhosTakingLeaveView";
import EmployeeListView from "./management/list/EmployeeListView";

export default function EmployeeView() {
  return (
    <div className="body-container">
      <EmployeeListView />
      <WhosTakingLeaveView />
    </div>
  );
}
