export default function TableAvatar({ children, circle = false }) {
  return (
    <div className="avatar">
      <div
        className={`${
          circle ? "rounded-full" : "mask mask-squircle"
        } w-10 h-10`}
      >
        {children}
      </div>
    </div>
  );
}
