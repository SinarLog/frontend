import { getFirstAndLastName } from "../../app/utils/strings";

// Assets
import { BsDot } from "react-icons/bs";

// Components
import LeaveStatus from "./LeaveStatus";

export default function LeaveStatusAggregate({
  approvedByManager = undefined,
  approvedByHr = undefined,
  isManager = false,
  actionByManagerAt,
  actionByHrAt,
  closedAutomatically = false,
  hr = undefined,
  manager = undefined,
}) {
  if (isManager) {
    if (closedAutomatically !== undefined) {
      if (closedAutomatically) {
        return <LeaveStatus status="CLOSED" />;
      }
    }

    if (approvedByHr === undefined) {
      return <LeaveStatus status="PENDING" />;
    } else {
      return (
        <div className="inline-flex flex-row flex-wrap gap-1 align-middle items-center whitespace-pre-line break-words">
          <LeaveStatus status={`${approvedByHr ? "APPROVED" : "REJECTED"}`} />
          <BsDot />
          <p>{getFirstAndLastName(hr?.fullName)} - HR</p>
          <BsDot />
          {actionByHrAt}
        </div>
      );
    }
  } else {
    if (approvedByManager === undefined) {
      if (closedAutomatically) {
        return <LeaveStatus status="CLOSED" />;
      }
      return <LeaveStatus status="PENDING" />;
    } else {
      if (approvedByManager) {
        if (approvedByHr === undefined) {
          if (closedAutomatically) {
            return (
              <div className="flex flex-col gap-2">
                <div className="inline-flex flex-row gap-1 align-middle items-center whitespace-pre-line break-words border-b-2 pb-2 border-[#F3F3F3] flex-wrap">
                  <LeaveStatus status="APPROVED" />
                  <BsDot />
                  <p>{getFirstAndLastName(manager?.fullName)} - Manager</p>
                  <BsDot />
                  {actionByManagerAt}
                </div>
                <LeaveStatus status="CLOSED" />
              </div>
            );
          } else {
            return (
              <div className="flex flex-col gap-2">
                <div className="inline-flex flex-row gap-1 align-middle items-center whitespace-pre-line break-words border-b-2 pb-2 border-[#F3F3F3] flex-wrap">
                  <LeaveStatus status="APPROVED" />
                  <BsDot />
                  <p>{getFirstAndLastName(manager?.fullName)} - Manager</p>
                  <BsDot />
                  {actionByManagerAt}
                </div>
                <LeaveStatus status="PENDING" />
              </div>
            );
          }
        } else {
          if (approvedByHr) {
            return (
              <div className="flex flex-col gap-2">
                <div className="inline-flex flex-row gap-1 align-middle items-center whitespace-pre-line break-words border-b-2 pb-2 border-[#F3F3F3] flex-wrap">
                  <LeaveStatus status="APPROVED" />
                  <BsDot className="text-center" />
                  <p>{getFirstAndLastName(manager?.fullName)} - Manager</p>
                  <BsDot className="text-center" />
                  {actionByManagerAt}
                </div>
                <div className="inline-flex flex-row gap-1 align-middle items-center whitespace-pre-line break-words flex-wrap">
                  <LeaveStatus status="APPROVED" />
                  <BsDot className="text-center" />
                  <p>{getFirstAndLastName(hr?.fullName)} - HR</p>
                  <BsDot className="text-center" />
                  {actionByHrAt}
                </div>
              </div>
            );
          } else {
            return (
              <div className="flex flex-col gap-2">
                <div className="inline-flex flex-row gap-1 align-middle items-center whitespace-pre-line break-words border-b-2 pb-2 border-[#F3F3F3] flex-wrap">
                  <LeaveStatus status="APPROVED" />
                  <BsDot className="text-center" />
                  <p>{getFirstAndLastName(manager?.fullName)} - Manager</p>
                  <BsDot className="text-center" />
                  {actionByManagerAt}
                </div>
                <div className="inline-flex flex-row gap-1 align-middle items-center whitespace-pre-line break-words flex-wrap">
                  <LeaveStatus status="REJECTED" />
                  <BsDot className="text-center" />
                  <p>{getFirstAndLastName(hr?.fullName)} - HR</p>
                  <BsDot className="text-center" />
                  {actionByHrAt}
                </div>
              </div>
            );
          }
        }
      } else {
        return (
          <div className="inline-flex flex-row flex-wrap gap-1 align-middle items-center whitespace-pre-line break-words">
            <LeaveStatus status="REJECTED" />
            <BsDot className="text-center" />
            <p>{getFirstAndLastName(manager?.fullName)} - Manager</p>
            <BsDot className="text-center" />
            {actionByManagerAt}
          </div>
        );
      }
    }
  }
}
