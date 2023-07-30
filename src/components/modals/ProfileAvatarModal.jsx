export default function ProfileAvatarModal({ url, id, modalRef }) {
  return (
    <dialog id={id} className="modal" ref={modalRef}>
      <form
        method="dialog"
        className="modal-box mask mask-squircle lg:w-80 lg:h-80 md:w-60 md:h-60 w-40 h-40 bg-no-repeat bg-center bg-origin-border bg-cover"
        style={{ backgroundImage: `url('${url}')` }}
      ></form>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
