import TablePlaceholderAvatar from "../avatars/TablePlaceholderAvatar";
import TableAvatar from "../avatars/TableAvatar";

export default function ChatFriendsList({ friends = [], openChatCallback }) {
  return (
    <>
      <div className="sticky top-0 navbar z-10 bg-base-100 py-2">
        <h1 className="text-md font-bold">Chat with your co-worker</h1>
      </div>
      <div className="flex flex-col gap-4">
        <ul>
          {friends.map((item) => (
            <li onClick={openChatCallback(item.id)} key={item?.id}>
              <div className="flex flex-row gap-2 px-0">
                {item.avatar ? (
                  <TableAvatar>
                    <img src={item.avatar} alt="Avatar" />
                  </TableAvatar>
                ) : (
                  <TablePlaceholderAvatar fullName={item?.fullName} />
                )}
                <p className="text-md">{item?.fullName}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
