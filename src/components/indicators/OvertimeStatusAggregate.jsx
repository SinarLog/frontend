import { getFirstAndLastName } from "../../app/utils/strings";

// Assets
import { BsDot } from "react-icons/bs";

// Componenets
import LeaveStatus from "./LeaveStatus";

export default function OvertimeStatusAggregate({
  approvedByManager = undefined,
  actionByManagerAt,
  closedAutomatically = false,
  manager = undefined,
}) {
  if (closedAutomatically) {
    return <LeaveStatus status="CLOSED" />;
  }

  if (approvedByManager !== undefined) {
    if (approvedByManager) {
      return (
        <div className="inline-flex flex-row gap-1 align-middle items-center whitespace-pre-line break-words flex-wrap">
          <LeaveStatus status="APPROVED" />
          <BsDot className="text-center" />
          <p>{getFirstAndLastName(manager?.fullName)} - Manager</p>
          <BsDot className="text-center" />
          {actionByManagerAt}
        </div>
      );
    } else {
      return (
        <div className="inline-flex flex-row gap-1 align-middle items-center whitespace-pre-line break-words flex-wrap">
          <LeaveStatus status="REJECTED" />
          <BsDot className="text-center" />
          <p>{getFirstAndLastName(manager?.fullName)} - Manager</p>
          <BsDot className="text-center" />
          {actionByManagerAt}
        </div>
      );
    }
  } else {
    return <LeaveStatus status="PENDING" />;
  }
}
