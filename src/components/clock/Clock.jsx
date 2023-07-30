import { useEffect, useState } from "react";
import { MONTH_ABBR_TO_FULL_MAPPER } from "../../app/utils/constants";

const WeekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function Clock() {
  const [date, setDate] = useState(new Date());
  const [dd, setDD] = useState("");

  useEffect(() => {
    const timeout = setInterval(() => {
      const f = new Date();
      const x = f.toDateString().split(" ");
      setDate(f);
      setDD(x);
    }, 1000);

    return () => clearInterval(timeout);
  }, []);

  return (
    <div className="h-fit sm:w-96 w-full flex shadow border-2 sm:rounded-full rounded-2xl py-2 px-4 body-container-color">
      <div className="flex flex-row justify-between w-full gap-4">
        <div className="flex flex-row justify-between">
          <b className="w-full">{date.toLocaleTimeString().split(" ")[0]}</b>
          <b className="sm:mx-1">{date.toLocaleTimeString().split(" ")[1]}</b>
        </div>
        <p>
          {WeekDays[date.getDay()]}, {MONTH_ABBR_TO_FULL_MAPPER[dd[1]]}{" "}
          {[dd[2], dd[3]].join(" ")}
        </p>
      </div>
    </div>
  );
}
