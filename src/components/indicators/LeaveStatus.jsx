export default function LeaveStatus({ status = "PENDING" }) {
  const LeaveStatusMapper = {
    PENDING: "text-grey-normal",
    APPROVED: "text-success-normal",
    REJECTED: "text-primary-normal",
    CLOSED: "text-warning-normal",
  };
  return (
    <p className={`capitalize font-bold ${LeaveStatusMapper[status]}`}>
      {status?.toLowerCase()}
    </p>
  );
}
