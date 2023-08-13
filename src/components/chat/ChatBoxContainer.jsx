import { MdArrowBack } from "react-icons/md";
import TablePlaceholderAvatar from "../avatars/TablePlaceholderAvatar";
import TableAvatar from "../avatars/TableAvatar";
import InlineLoading from "../loaders/InlineLoading";

export default function ChatBoxContainer({
  receiver,
  chats,
  message,
  currentUserId,
  sendLoading,
  allowSend,
  messageOnChange,
  sendCallback,
  closeCallback,
}) {
  return (
    <div className="flex flex-col justify-between h-full no-scrollbar">
      {/* Header */}
      <div className="w-full flex flex-row gap-4 justify-start py-4 border-b-slate-300 border-b items-center">
        {/* Back Button */}
        <div
          className="cursor-pointer btn btn-ghost btn-xs py-0"
          onClick={closeCallback}
        >
          <MdArrowBack />
        </div>
        <div className="animate__animated animate__fadeIn flex flex-row items-center gap-4">
          {receiver.avatar ? (
            <TableAvatar>
              <img src={receiver.avatar} alt="Receiver" />
            </TableAvatar>
          ) : (
            <TablePlaceholderAvatar fullName={receiver?.fullName} />
          )}
          <h4 className="text-md font-bold">{receiver?.fullName}</h4>
        </div>
      </div>
      {/* Chat Body */}
      <div className="w-full overflow-y-scroll">
        {chats &&
          chats?.map((item) => (
            <div
              className={`chat ${
                item.sender === currentUserId ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-bubble">{item.message}</div>
            </div>
          ))}
      </div>

      {/* Chat Send */}
      <div className="w-full flex flex-row justify-around items-center place-self-end">
        <input
          value={message}
          onChange={messageOnChange}
          className="input input-bordered w-full form-background focus:outline-none"
        />
        <button
          className="btn btn-success-normal btn-md normal-case text-white"
          onClick={sendCallback}
          disabled={!allowSend}
        >
          {sendLoading ? <InlineLoading /> : "Send"}
        </button>
      </div>
    </div>
  );
}
