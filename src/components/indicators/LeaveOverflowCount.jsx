export default function LeaveOverflowCountIndicator({ count }) {
  return (
    <span className="rounded-full bg-grey-normal text-white w-8 h-content text-center">
      {count}+
    </span>
  );
}
