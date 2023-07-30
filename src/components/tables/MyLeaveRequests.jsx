import { Skeleton, SkeletonText } from "@chakra-ui/skeleton";
import Indexing from "./Indexing";
import Pagination from "../pagination/Pagination";
import NoRecordFound from "../empty/NoRecordFound";
import LeaveStatus from "../indicators/LeaveStatus";

export default function MyLeaveRequests({
  leaves,
  paging,
  paginationCallback,
  detailCallback,
  loading,
  withDetail = true,
  emptyStateText = "You have no leave requests",
  size = 5,
}) {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Request Date</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Leave Type</th>
              <th>Duration</th>
              <th>Status</th>
              {withDetail && <th></th>}
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              leaves ? (
                leaves?.map((item, index) => (
                  <tr className="hover" key={index}>
                    <Indexing paging={paging} index={index} size={size} />
                    <td>{item?.requestDate}</td>
                    <td>{item?.from}</td>
                    <td>{item?.to}</td>
                    <td className="capitalize">
                      {item?.leaveType?.toLowerCase()}
                    </td>
                    <td>{item?.duration} day(s)</td>
                    <td>
                      <LeaveStatus status={item?.status} />
                    </td>
                    {withDetail && (
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
                    )}
                  </tr>
                ))
              ) : (
                <tr align="center" aria-colspan={8}>
                  <td align="center" colSpan={8}>
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
                    {withDetail && (
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
                    )}
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
