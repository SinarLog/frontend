export default function InfoModalAction({
  id,
  children,
  modalRef,
  btnText,
  additionalClass = "",
}) {
  return (
    <dialog id={id} className="modal" ref={modalRef}>
      <form
        method="dialog"
        className={`modal-box ${additionalClass} body-container-color dark:text-white`}
      >
        {children}
        <div className="modal-action">
          <button
            type="submit"
            className="btn btn-success-normal w-full text-white normal-case"
          >
            {btnText}
          </button>
        </div>
      </form>
    </dialog>
  );
}
