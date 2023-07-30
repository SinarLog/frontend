export default function InfoInput({ children }) {
  return (
    <span className="flex justify-evenly align-middle gap-3 items-center whitespace-nowrap rounded-l border px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6] join-item button-border-custom border-opacity-20 form-background">
      {children}
    </span>
  );
}
