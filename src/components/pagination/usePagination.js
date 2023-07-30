import { useState } from "react";

/**
 * usePagination is a hook design for pagination in queries.
 * @returns {[number, function]} the current page and the pagination handler.
 * @example
 * // BlablaModel.js
 * const [currentPage, handlePagination] = usePagination();
 *
 * // then pass the handlePagination to the Pagination component.
 * <Pagination paging={paging} callback={handlePagination} />
 * Note: the paging variable is fetched from the backend response
 *
 * // do not forget to also pass the currentPage to the fetch function
 * fetch(`/endpoint?page=${currentPage}`)
 */
export default function usePagination() {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePagination = (event) => {
    setCurrentPage(currentPage + Number(event.target.value));
  };

  return [currentPage, handlePagination];
}
