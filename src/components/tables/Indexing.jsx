export default function Indexing({ paging, index, size = 10 }) {
  return <th>{(paging.page - 1) * size + index + 1}</th>;
}
