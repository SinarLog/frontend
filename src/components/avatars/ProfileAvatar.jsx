/**
 * Put an image element as a children without any tailwind class.
 * @param {React.Component} children
 * @returns
 */
export default function ProfileAvatar({ children }) {
  return (
    <div className="avatar group">
      <div className="w-36 rounded-full">{children}</div>
    </div>
  );
}
