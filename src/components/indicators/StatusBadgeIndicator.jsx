export default function StatusBadgeIndicator({ status }) {
  const STATUS_INDICATOR_MAPPER = {
    AVAILABLE: {
      display: "Available",
      bg: "bg-green-100 dark:bg-green-900",
      span: "bg-green-500",
      text: "text-green-800 dark:text-green-300",
    },
    UNAVAILABLE: {
      display: "Unavailable",
      bg: "bg-slate-100 dark:bg-slate-900",
      span: "bg-slate-500",
      text: "text-slate-800 dark:text-slate-300",
    },
    ON_LEAVE: {
      display: "On leave",
      bg: "bg-yellow-100 dark:bg-yellow-900",
      span: "bg-yellow-500",
      text: "text-yellow-800 dark:text-yellow-300",
    },
    RESIGNED: {
      display: "Resigned",
      bg: "bg-red-100 dark:bg-red-900",
      span: "bg-red-500",
      text: "text-red-800 dark:text-red-300",
    },
  };

  const { display, bg, span, text } =
    STATUS_INDICATOR_MAPPER[
      status !== "" && status != null ? status : "UNAVAILABLE"
    ];

  return (
    <span
      className={`inline-flex items-center ${bg} ${text} text-xs font-medium px-2.5 py-0.5 rounded-full`}
    >
      <span className={`w-2 h-2 mr-1 ${span} rounded-full`}></span>
      {display}
    </span>
  );
}
