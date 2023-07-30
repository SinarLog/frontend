export default function Pagination({ paging, callback }) {
  return (
    <div className="join mt-4">
      <button
        className="join-item btn btn-ghost w-8 p-0 text-primary-normal"
        disabled={paging.page === 1}
        value={-1}
        onClick={callback}
      >
        «
      </button>
      <button className="join-item btn btn-ghost cursor-default active:bg-white font-normal">
        {paging.page}
      </button>
      <button
        className="join-item btn btn-ghost w-8 p-0 text-primary-normal"
        disabled={paging.totalPages <= paging.page}
        value={1}
        onClick={callback}
      >
        »
      </button>
    </div>
  );
}
