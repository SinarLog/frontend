import { getGoogleMapsUrlFromLocation } from "../../app/utils/strings";

// Components
import { Skeleton, SkeletonText } from "@chakra-ui/skeleton";
import Indexing from "./Indexing";
import NoRecordFound from "./NoRecordFound";
import Pagination from "../pagination/Pagination";

// Assets
import GoogleMapLogo from "../../assets/images/google-maps.png";

export default function MyAttendanceLogTable({
  attendances,
  paging,
  loading,
  paginationCallback,
  size = 10,
  emptyStateText = "You have no attendances",
}) {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Attendances Date</th>
              <th>
                <div className="group relative">
                  <div className="absolute z-50 flex flex-col gap-4 p-2 top-5 left-0 w-fit h-0 rounded-lg body-container-color bg-opacity-100 opacity-0 border border-[#d3d4d7] group-hover:h-max group-hover:opacity-100 duration-500">
                    <div className="text-start text-md font-semibold flex flex-row gap-2 justify-between items-center">
                      Normal Clock In
                      <div className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-success-normal"></span>
                      </div>
                    </div>
                    <div className="text-start text-md font-semibold flex flex-row gap-2 justify-between items-center">
                      Late Clock In
                      <div className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-normal"></span>
                      </div>
                    </div>
                  </div>
                  Clock In Time
                </div>
              </th>
              <th>Clock In Loc</th>
              <th>
                <div className="group relative">
                  <div className="absolute flex flex-col gap-4 p-2 top-5 left-0 w-fit h-0 rounded-lg body-container-color bg-opacity-100 opacity-0 group-hover:border group-hover:border-[#d3d4d7] group-hover:h-max group-hover:opacity-100 duration-500">
                    <div className="text-start text-md font-semibold flex flex-row gap-2 justify-between items-center">
                      Normal Clock Out
                      <div className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-success-normal"></span>
                      </div>
                    </div>
                    <div className="text-start text-md font-semibold flex flex-row gap-2 justify-between items-center">
                      Early Clock Out
                      <div className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-normal"></span>
                      </div>
                    </div>
                    <div className="text-start text-md font-semibold flex flex-row gap-2 justify-between items-center">
                      Closed
                      <div className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-warning-normal"></span>
                      </div>
                    </div>
                  </div>
                  Clock Out Time
                </div>
              </th>
              <th>Clock Out Loc</th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              attendances ? (
                attendances?.map((item, index) => (
                  <tr className="hover" key={index}>
                    <Indexing paging={paging} index={index} size={size} />
                    {/* Attendance Date */}
                    <td>{item?.date}</td>
                    {/* Clock In At */}
                    <td
                      className={`${
                        item?.lateClockIn
                          ? "text-primary-normal"
                          : "text-success-normal"
                      }`}
                    >
                      {item?.clockInAt}
                    </td>
                    {/* Clock In Loc */}
                    <td>
                      <a
                        rel="noreferrer"
                        href={getGoogleMapsUrlFromLocation(
                          item?.clockInLoc?.lat,
                          item?.clockInLoc?.long
                        )}
                        target="_blank"
                      >
                        <button
                          className="btn px-6"
                          style={{
                            backgroundImage: `url(${GoogleMapLogo})`,
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                          }}
                        ></button>
                      </a>
                    </td>
                    {/* Clock Out At */}
                    {item?.doneForTheDay ? (
                      <td
                        className={`${
                          item?.earlyClockOut
                            ? "text-primary-normal"
                            : item?.closedAutomatically === true
                            ? "text-warning-normal"
                            : "text-success-normal"
                        }`}
                      >
                        {item?.clockOutAt}
                      </td>
                    ) : (
                      <td>--.--</td>
                    )}

                    {/* Clock Out Loc */}
                    <td>
                      {item?.clockOutLoc?.lat ? (
                        <a
                          rel="noreferrer"
                          href={getGoogleMapsUrlFromLocation(
                            item?.clockInLoc?.lat,
                            item?.clockInLoc?.long
                          )}
                          target="_blank"
                        >
                          <button
                            className="btn px-6"
                            style={{
                              backgroundImage: `url(${GoogleMapLogo})`,
                              backgroundPosition: "center",
                              backgroundSize: "cover",
                              backgroundRepeat: "no-repeat",
                            }}
                          ></button>
                        </a>
                      ) : (
                        <p>-</p>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr align="center" aria-colspan={6}>
                  <td align="center" colSpan={6}>
                    <NoRecordFound>
                      <p className="text-2xl font-bold">{emptyStateText}</p>
                    </NoRecordFound>
                  </td>
                </tr>
              )
            ) : (
              Array(size)
                .fill()
                .map((_, index) => (
                  <tr className="hover" key={index}>
                    <td>
                      <SkeletonText noOfLines={1} width="15px" rounded="lg" />
                    </td>
                    <td>
                      <SkeletonText
                        noOfLines={1}
                        width="60px"
                        rounded="lg"
                        height="20px"
                      />
                    </td>
                    <td>
                      <SkeletonText
                        noOfLines={1}
                        width="60px"
                        rounded="lg"
                        height="20px"
                      />
                    </td>
                    <td>
                      <Skeleton className="btn" rounded="0.5rem">
                        <SkeletonText
                          noOfLines={1}
                          width="20px"
                          rounded="lg"
                          height="20px"
                        />
                      </Skeleton>
                    </td>
                    <td>
                      <SkeletonText
                        noOfLines={1}
                        width="60px"
                        rounded="lg"
                        height="20px"
                      />
                    </td>
                    <td>
                      <Skeleton className="btn" rounded="0.5rem">
                        <SkeletonText
                          noOfLines={1}
                          width="20px"
                          rounded="lg"
                          height="20px"
                        />
                      </Skeleton>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex w-full justify-end">
        <Pagination paging={paging} callback={paginationCallback} />
      </div>
    </>
  );
}
