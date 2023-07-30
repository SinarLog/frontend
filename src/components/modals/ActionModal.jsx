/**
 * ActionModal component are used for modals where action events
 * are requried to be done onto the modal
 */
export default function ActionModal({
  id,
  children,
  modalRef,
  closeCallback,
  allowOverflow = false,
  toggleOverflowVisibility = false,
  additionalClass = "",
}) {
  return (
    <dialog
      id={id}
      ref={modalRef}
      className={`modal ${allowOverflow ? "overflow-visible" : ""}`}
    >
      <form
        method="dialog"
        className={`modal-box ${
          allowOverflow
            ? toggleOverflowVisibility
              ? "overflow-y-visible"
              : "overflow-y-auto"
            : ""
        } ${additionalClass} body-container-color dark:text-white`}
      >
        <button
          type="submit"
          htmlFor={id}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={closeCallback}
        >
          ✕
        </button>
        {children}
      </form>
    </dialog>
  );
}

// Old component
// {/* <dialog id={id} className="modal"> */}
// {/*   <form method="dialog" className={`modal-box ${options.width ?? ""}`}> */}
// {/*     {children} */}
// {/*     <div className="modal-action"> */}
// {/*       <button className="btn">Close</button> */}
// {/*     </div> */}
// {/*   </form> */}
// {/* </dialog> */}
