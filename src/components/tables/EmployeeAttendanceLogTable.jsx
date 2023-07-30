// Components
import { SkeletonText, Skeleton } from "@chakra-ui/skeleton";
import Indexing from "./Indexing";
import NoRecordFound from "./NoRecordFound";
import Pagination from "../pagination/Pagination";
import TableAvatar from "../avatars/TableAvatar";
import TablePlaceholderAvatar from "../avatars/TablePlaceholderAvatar";

export default function EmployeeAttendanceLogTable({
  attendances,
  paging,
  loading,
  paginationCallback,
  size = 10,
}) {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Employee Name</th>
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
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              attendances ? (
                attendances?.map((item, index) => (
                  <tr className="hover" key={index}>
                    <Indexing paging={paging} index={index} size={size} />
                    {/* Avatar and name */}
                    <td>
                      <div className="flex items-center space-x-3">
                        {item?.avatar ? (
                          <TableAvatar>
                            <img src={item?.avatar} alt="Employee Avatar" />
                          </TableAvatar>
                        ) : (
                          <TablePlaceholderAvatar
                            fullName={item?.fullName}
                            role="staff"
                          />
                        )}
                        <div>{item?.fullName}</div>
                      </div>
                    </td>
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
                    {/* Clock Out At */}
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
                  </tr>
                ))
              ) : (
                <tr align="center" aria-colspan={5}>
                  <td align="center" colSpan={5}>
                    <NoRecordFound>
                      <p className="text-2xl font-bold">
                        You have no attendances
                      </p>
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
                      <div className="flex items-center space-x-3">
                        <Skeleton className="mask mask-squircle w-10 h-10" />
                        <SkeletonText
                          noOfLines={1}
                          width="120px"
                          rounded="lg"
                        />
                      </div>
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
                      <SkeletonText
                        noOfLines={1}
                        width="60px"
                        rounded="lg"
                        height="20px"
                      />
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
