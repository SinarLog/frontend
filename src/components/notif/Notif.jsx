import { toast } from "react-hot-toast";
import AvatarNotif from "../avatars/AvatarNotif";
import PlaceholderNotif from "../avatars/PlaceholderNotif";

const NOTIFICATION_TYPES = {
  overtime: "an overtime",
  leave: "a leave",
};

export default function Notif({ toaster, payload }) {
  return (
    <div
      className={`${
        toaster.visible
          ? "animate__animated animate__bounceIn"
          : "animate-leave"
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            {payload?.avatar !== "" ? (
              <AvatarNotif>
                <img src={payload?.avatar} alt="avatar" />
              </AvatarNotif>
            ) : (
              <PlaceholderNotif fullName={payload?.requesteeName} />
            )}
          </div>
          <div className="ml-3 flex-1">
            <p className="text-md font-semibold text-gray-900">
              You have a new {payload?.type} request
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {payload?.requesteeName} has submitted{" "}
              {NOTIFICATION_TYPES[payload?.type]} request. Check out dashboard
              to see full detail.
            </p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => toast.dismiss(toaster.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Close
        </button>
      </div>
    </div>
  );
}
