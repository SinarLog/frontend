// Views
import WhosTakingLeaveView from "./leaves/WhosTakingLeaveView";
import EmployeeListView from "./list/EmployeeListView";

export default function EmployeeView() {
  return (
    <div className="flex flex-col gap-6">
      <EmployeeListView />
      <WhosTakingLeaveView />
    </div>
  );
}
