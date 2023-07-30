import { getInitialsFromFullName } from "../../app/utils/strings";

const ROLE_AVATAR_MAPPER = {
  hr: "bg-green-600",
  mngr: "bg-yellow-300",
  staff: "bg-neutral-focus",
};

export default function PlaceholderAvatar({ role, fullName, children }) {
  const initials = getInitialsFromFullName(fullName ?? "");

  return (
    <div className="avatar group placeholder">
      <div
        className={`${
          ROLE_AVATAR_MAPPER[role ?? "staff"]
        } text-white rounded-full w-36`}
      >
        {children}
        <span className="text-3xl">{initials}</span>
      </div>
    </div>
  );
}
