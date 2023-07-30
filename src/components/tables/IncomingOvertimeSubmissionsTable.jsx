// Components
import { Skeleton, SkeletonText } from "@chakra-ui/skeleton";
import Indexing from "./Indexing";
import NoRecordFound from "./NoRecordFound";
import TableAvatar from "../avatars/TableAvatar";
import TablePlaceholderAvatar from "../avatars/TablePlaceholderAvatar";
import OvertimeStatus from "../indicators/LeaveStatus";
import Pagination from "../pagination/Pagination";

export default function IncomingOvertimeSubmissionTable({
  overtimes = [],
  paging,
  loading,
  detailCallback,
  paginationCallback,
  size = 5,
}) {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Employee Name</th>
              <th>Overtime Date</th>
              <th>Overtime Duration</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              overtimes ? (
                overtimes?.map((item, index) => (
                  <tr className="hover" key={index}>
                    {/* Indexing */}
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
                    {/* Overtime Date */}
                    <td>{item?.date}</td>
                    {/* Duration */}
                    <td>{item?.duration}</td>
                    {/* Status */}
                    <td>
                      <OvertimeStatus status={item?.status} />
                    </td>
                    {/* See Detail */}
                    <td align="right">
                      <button
                        type="button"
                        className="btn btn-secondary-normal text-white normal-case"
                        value={item?.id}
                        onClick={detailCallback}
                      >
                        See detail
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr align="center" aria-colspan={6}>
                  <td align="center" colSpan={6}>
                    <NoRecordFound>
                      <p className="text-2xl font-bold">
                        You have no incoming overtime submissions
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
                    <td align="right">
                      <Skeleton className="btn" rounded="0.5rem">
                        <SkeletonText
                          noOfLines={1}
                          width="40px"
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
