import { BsFillChatDotsFill } from "react-icons/bs";

export default function ChatContainer({ children, isChatting = false }) {
  return (
    <div className="sticky bottom-5 left-5 dropdown dropdown-right dropdown-top">
      <BsFillChatDotsFill
        tabIndex={0}
        className="btn btn-circle btn-lg btn-primary-normal text-white normal-case p-4"
      ></BsFillChatDotsFill>
      <div
        tabIndex={0}
        className="dropdown-content z-[1] menu p-4 shadow bg-base-100 rounded-box"
      >
        <div
          className={`transition-dimension ease-in-out duration-300 overflow-y-scroll no-scrollbar ${
            isChatting ? "lg:w-96 lg:h-96 w-72 h-96" : "w-52 h-fit max-h-72"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
