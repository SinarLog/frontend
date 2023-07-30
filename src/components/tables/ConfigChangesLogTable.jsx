import { FaLongArrowAltRight } from "react-icons/fa";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { whatChangedConfigMapper } from "../../app/utils/strings";

// Components
import { Flex } from "@chakra-ui/react";
import { Skeleton, SkeletonText } from "@chakra-ui/skeleton";
import Pagination from "../pagination/Pagination";
import TableAvatar from "../avatars/TableAvatar";
import TablePlaceholderAvatar from "../avatars/TablePlaceholderAvatar";

export default function ConfigChangesLogTable({
  logs,
  paging,
  loading,
  paginationCallback,
  detailCallback,
  size = 10,
}) {
  return (
    <>
      <div className="overflow-x-auto">
        {logs ? (
          <table className="table">
            <thead>
              <tr>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {!loading
                ? logs?.map((item, index) => (
                    <tr className="hover" key={index}>
                      <td>
                        <div className="grid grid-cols-2 gap-4 w-3/5">
                          {/* Timestamp */}
                          <div>Timestamp</div>
                          <div>{item?.updatedAt}</div>

                          {/* Change By */}
                          <div>Changed by</div>
                          <div>
                            {item?.avatar ? (
                              <TableAvatar>
                                <img src={item?.avatar} alt="Employee Avatar" />
                              </TableAvatar>
                            ) : (
                              <TablePlaceholderAvatar
                                fullName={item?.updatedBy?.fullName}
                              />
                            )}
                            <span className="ml-4">
                              {item?.updatedBy?.fullName}
                            </span>
                          </div>

                          {/* Changes */}
                          <div className={`${!item.show && "hidden"}`}>
                            What changed
                          </div>
                          <div
                            className={`flex flex-col gap-2 ${
                              !item.show && "hidden"
                            }`}
                          >
                            {item?.changes != null &&
                              Object.keys(item?.changes).map((x) => (
                                <div
                                  className="grid grid-cols-3 grid-flow-row gap-y-2 w-full border-b-stone-500 border-b-[0.675px] py-2 last:border-b-0"
                                  key={`${item?.id}-${x}`}
                                >
                                  <div className="capitalize col-span-3 font-semibold">
                                    Update {x.split("_").join(" ")}
                                  </div>
                                  <div className="text-start break-words whitespace-pre-line">
                                    {whatChangedConfigMapper(
                                      x,
                                      item?.changes[x]?.prev
                                    )}
                                  </div>
                                  <div>
                                    <FaLongArrowAltRight className="w-full" />
                                  </div>
                                  <div>
                                    {whatChangedConfigMapper(
                                      x,
                                      item?.changes[x]?.new
                                    )}
                                  </div>
                                </div>
                              ))}
                          </div>

                          {/* When Applied */}
                          <div>When Applied</div>
                          <div>
                            {item?.whenApplied
                              ?.split(" ")
                              ?.slice(0, 4)
                              ?.join(" ")}
                          </div>

                          {/* Show Hide Button */}
                          <div className="col-span-2 text-start">
                            <p
                              className="text-info cursor-pointer inline-flex gap-2 items-center"
                              onClick={detailCallback(item.id)}
                            >
                              {item.show ? "Hide" : "Show"} changes{" "}
                              <span>
                                {item.show ? (
                                  <IoIosArrowUp />
                                ) : (
                                  <IoIosArrowDown />
                                )}
                              </span>
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                : Array(size)
                    .fill()
                    .map((_, index) => (
                      <tr className="hover" key={index}>
                        <td>
                          <div
                            display="grid"
                            className="grid grid-cols-2 gap-4 w-3/5"
                          >
                            {/* Timestamp */}
                            <SkeletonText
                              noOfLines={1}
                              width="120px"
                              rounded="lg"
                              height="20px"
                            />
                            <SkeletonText
                              noOfLines={1}
                              width="120px"
                              rounded="lg"
                              height="20px"
                            />

                            {/* Change By */}
                            <SkeletonText
                              noOfLines={1}
                              width="120px"
                              rounded="lg"
                              height="20px"
                            />
                            <Flex alignItems="center" gap="2">
                              <Skeleton className="mask mask-squircle w-10 h-10" />
                              <SkeletonText
                                noOfLines={1}
                                width="120px"
                                rounded="lg"
                              />
                            </Flex>

                            {/* Changes */}
                            <SkeletonText
                              noOfLines={1}
                              width="120px"
                              rounded="lg"
                              height="20px"
                            />
                            <SkeletonText
                              noOfLines={1}
                              width="120px"
                              rounded="lg"
                              height="20px"
                            />

                            {/* When Applied */}
                            <SkeletonText
                              noOfLines={1}
                              width="120px"
                              rounded="lg"
                              height="20px"
                            />
                            <SkeletonText
                              noOfLines={1}
                              width="120px"
                              rounded="lg"
                              height="20px"
                            />

                            {/* Show Hide Button */}
                            <SkeletonText
                              noOfLines={1}
                              width="120px"
                              rounded="lg"
                              height="20px"
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center w-full">No changes log</div>
        )}
      </div>

      {logs && (
        <div className="flex w-full justify-end">
          <Pagination paging={paging} callback={paginationCallback} />
        </div>
      )}
    </>
  );
}
