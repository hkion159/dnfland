import Link from 'next/link';

const Pagination = ({ type, current, last }) => {
  const baseUrl = `/board${type === 'notice' ? '/notice' : ''}`;
  const list = [];
  if (current < 6) {
    for (let i = 0; i < Math.min(last, 9); i++) list[i] = i + 1;
  } else if (current > last - 5) {
    for (let i = 0; i < 9; i++) list[i] = last - 8 + i;
  } else {
    for (let i = 0; i < 9; i++) list[i] = current - 4 + i;
  }
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <li className={`page-item ${current < 6 ? 'disabled' : ''}`}>
          <Link href={baseUrl}>
            <a className="page-link">&laquo;</a>
          </Link>
        </li>
        <li className={`page-item ${current < 6 ? 'disabled' : ''}`}>
          <Link href={baseUrl + `?page=${current - 5}`}>
            <a className="page-link">&lt;</a>
          </Link>
        </li>
        {list.map((page, index) => (
          <li key={index} className={`page-item ${page === current ? 'active' : ''}`}>
            <Link href={baseUrl + `?page=${page}`}>
              <a className="page-link">{page}</a>
            </Link>
          </li>
        ))}
        <li className={`page-item ${current > last - 5 ? 'disabled' : ''}`}>
          <Link href={baseUrl + `?page=${current + 5}`}>
            <a className="page-link">&gt;</a>
          </Link>
        </li>
        <li className={`page-item ${current > last - 5 ? 'disabled' : ''}`}>
          <Link href={baseUrl + `?page=${last}`}>
            <a className="page-link">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
