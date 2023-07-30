// Components
import { Skeleton } from "@chakra-ui/skeleton";
import TableAvatar from "../avatars/TableAvatar";
import TablePlaceholderAvatar from "../avatars/TablePlaceholderAvatar";
import { Stack } from "@chakra-ui/layout";

export default function WhosOnLeaveCalendarTable({
  calendars,
  days,
  detailCallback,
  loading = true,
}) {
  return (
    <div className="grid grid-cols-7 grid-flow-row w-full animate__animated animate__fadeInLeft animate__fast">
      <Stack
        display="grid"
        className="grid grid-cols-7 col-span-7 w-full"
        spacing={loading ? 1 : 0}
      >
        <div className="grid grid-cols-7 col-span-7 w-full">
          {/* DAYS */}
          {days.map((item) => (
            <div
              key={item}
              className={`
                h-14 bg-primary-normal flex items-center p-2 border-l-white border-[0.675px]
                border-y-[#5b5a5a] first:border-r-white first:rounded-tl-xl first:border-l-[#5b5a5a]
                last:rounded-tr-xl last:border-r-[#5b5a5a]
                `}
            >
              <Skeleton isLoaded={!loading}>
                <h2 className="text-start uppercase text-white">{item}</h2>
              </Skeleton>
            </div>
          ))}
        </div>

        {/* CALENDARS */}
        {calendars.map((item) => (
          <Skeleton
            isLoaded={!loading}
            width="full"
            className={`
            h-48 p-4 flex flex-col justify-between relative cursor-pointer overflow-hidden
            border-[0.675px] border-l-[#5b5a5a] border-b-[#5b5a5a]
            [&:nth-child(29)]:rounded-br-xl [&:nth-child(30)]:rounded-bl-xl last:rounded-br-xl [&:nth-child(8)]:border-r-[#5b5a5a]
            [&:nth-child(15)]:border-r-[#5b5a5a] [&:nth-child(22)]:border-r-[#5b5a5a] [&:nth-child(29)]:border-r-[#5b5a5a] last:border-r-[#5b5a5a]
            `}
            key={item.date}
            onClick={detailCallback(item.date)}
          >
            <div className="absolute top-5 left-5 text-start">
              <h2>{item.date}</h2>
            </div>
            <div className="flex flex-row align-middle items-center justify-start absolute bottom-5">
              {item.employees.length !== 0 && (
                <div className="avatar-group -space-x-3">
                  {item.employees.map((value, index) =>
                    index <= 1 ? (
                      value?.avatar ? (
                        <TableAvatar key={value.id} circle={true}>
                          <img src={value.avatar} alt="Avatar" />
                        </TableAvatar>
                      ) : (
                        <TablePlaceholderAvatar
                          circle={true}
                          key={value.id}
                          fullName={value?.fullName}
                          role={value?.role}
                        />
                      )
                    ) : index === 2 ? (
                      <TablePlaceholderAvatar
                        circle={true}
                        key={value.id}
                        fullName={"+ ".concat(
                          String(item.employees.length - index)
                        )}
                        role={value?.role}
                      />
                    ) : null
                  )}
                </div>
              )}
            </div>
          </Skeleton>
        ))}
      </Stack>
    </div>
  );
}
