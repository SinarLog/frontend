export default function InfoModalBackdrop({
  children,
  id,
  modalRef,
  allowOverflow = false,
  withCloseButton = false,
  additionalClass = "",
}) {
  return (
    <dialog
      id={id}
      className={`modal ${allowOverflow ? "overflow-visible" : ""}`}
      ref={modalRef}
    >
      <form
        method="dialog"
        className={`modal-box ${
          allowOverflow ? "overflow-y-visible" : ""
        } ${additionalClass} body-container-color dark:text-white`}
      >
        {withCloseButton && (
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        )}
        {children}
      </form>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
