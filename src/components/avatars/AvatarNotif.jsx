/**
 * Put an image element as a children without any tailwind class.
 * @param {React.Component} children
 * @returns
 */
export default function AvatarNotif({ children }) {
  return (
    <div className="avatar group">
      <div className="w-24 rounded-full">{children}</div>
    </div>
  );
}
