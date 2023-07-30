import { Link } from "react-router-dom";

// Components
import { Skeleton, SkeletonText } from "@chakra-ui/skeleton";
import Indexing from "./Indexing";
import NoRecordFound from "./NoRecordFound";
import Pagination from "../pagination/Pagination";
import TableAvatar from "../avatars/TableAvatar";
import TablePlaceholderAvatar from "../avatars/TablePlaceholderAvatar";
import StatusBadgeIndicator from "../indicators/StatusBadgeIndicator";

export default function EmployeeListTable({
  employees,
  paging,
  paginationCallback,
  withJoinDate,
  size = 10,
  loading,
}) {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Status</th>
              <th>Email</th>
              <th>Job</th>
              {withJoinDate && <th>Join Date</th>}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              employees ? (
                employees?.map((item, index) => (
                  <tr className="hover" key={index}>
                    <Indexing paging={paging} index={index} size={size} />
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
                    <td>
                      <StatusBadgeIndicator status={item?.status} />
                    </td>
                    <td>{item?.email}</td>
                    <td>{item?.job}</td>
                    {withJoinDate && <td>{item?.joinDate}</td>}
                    <td align="right">
                      <Link
                        to={`${item.id}`}
                        className="btn btn-secondary-normal text-white normal-case"
                      >
                        See detail
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr align="center" aria-colspan={7}>
                  <td align="center" colSpan={7}>
                    <NoRecordFound>
                      <p className="text-2xl font-bold">
                        There are no employees
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
                        width="full"
                        rounded="lg"
                        height="20px"
                      />
                    </td>
                    <td>
                      <SkeletonText
                        noOfLines={1}
                        width="full"
                        rounded="lg"
                        height="20px"
                      />
                    </td>
                    {withJoinDate && (
                      <td>
                        <SkeletonText
                          noOfLines={1}
                          width="full"
                          rounded="lg"
                          height="20px"
                        />
                      </td>
                    )}
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
