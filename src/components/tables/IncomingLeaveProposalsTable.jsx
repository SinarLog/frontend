// Components
import { Skeleton, SkeletonText } from "@chakra-ui/skeleton";
import Indexing from "./Indexing";
import NoRecordFound from "./NoRecordFound";
import Pagination from "../pagination/Pagination";
import LeaveStatus from "../indicators/LeaveStatus";
import TableAvatar from "../avatars/TableAvatar";
import TablePlaceholderAvatar from "../avatars/TablePlaceholderAvatar";
import LeaveOverflowCountIndicator from "../indicators/LeaveOverflowCount";

export default function IncomingLeaveProposalsTable({
  leaves,
  loading,
  paging,
  paginationCallback,
  detailCallback,
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
              <th>Request Date</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Duration</th>
              <th>Type</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              leaves ? (
                leaves?.map((item, index) => (
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
                    {/* Request Date */}
                    <td>{item?.requestDate}</td>
                    {/* Start Date */}
                    <td>{item?.from}</td>
                    {/* End Date */}
                    <td>{item?.to}</td>
                    {/* Duration */}
                    <td>{item?.duration} day(s)</td>
                    {/* Type */}
                    <td align="left" className="capitalize">
                      <div className="flex flex-row justify-start items-center gap-2">
                        <p>{item?.type?.toLowerCase()}</p>
                        {item?.overflows && (
                          <LeaveOverflowCountIndicator
                            count={item?.overflows}
                          />
                        )}
                      </div>
                    </td>
                    <td>
                      <LeaveStatus status={item?.status} />
                    </td>
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
                <tr align="center" aria-colspan={9}>
                  <td align="center" colSpan={9}>
                    <NoRecordFound>
                      <p className="text-2xl font-bold">
                        You have no incoming leave proposals
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
