/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from "react";
import { ConfigContext } from "../../app/context/config";

export default function Schedule() {
  const { config } = useContext(ConfigContext);

  return (
    <div className="h-fit sm:w-72 w-full flex shadow border-2 sm:rounded-full rounded-2xl py-2 px-4 body-container-color">
      <div className="flex flex-row w-full justify-between align-middle items-center justify-items-center gap-4">
        <b>Schedule</b>
        <div className="flex flex-row gap-1 justify-center align-middle items-center tracking-wider">
          <p>{config?.startTime}</p>
          <p>-</p>
          <p>{config?.endTime}</p>
        </div>
      </div>
    </div>
  );
}
