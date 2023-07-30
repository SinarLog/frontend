import { getInitialsFromFullName } from "../../app/utils/strings";

const ROLE_AVATAR_MAPPER = {
  hr: "bg-green-600",
  mngr: "bg-yellow-300",
  staff: "bg-neutral-focus",
};

export default function TablePlaceholderAvatar({
  fullName = "",
  role = "staff",
  circle = false,
}) {
  const initials = getInitialsFromFullName(fullName ?? "");
  return (
    <div className="avatar placeholder cursor-default">
      <div
        className={`${ROLE_AVATAR_MAPPER[role ?? "staff"]} text-white ${
          circle ? "rounded-full" : "mask mask-squircle"
        } w-10 h-10`}
      >
        <span className="text-lg">{initials}</span>
      </div>
    </div>
  );
}
