import { useSession } from 'next-auth/client';
import { useCallback } from 'react';
import { useRouter } from '../../node_modules/next/dist/client/router';
import Link from 'next/link';
import { getDateDiff } from '../../lib/date';

const BoardBox = ({ posts: strPosts, type }) => {
  const posts = JSON.parse(strPosts);
  const [session, loading] = useSession();
  const router = useRouter();
  const onWrite = useCallback(() => {
    router.push('/board/write');
  }, [router]);
  const diff = getDateDiff('2021-11-01T12:48:51.761Z');
  return (
    <div>
      <div className="p-4">
        <h3 className="text-center">{type === 'normal' ? '종합 게시판' : '공지사항'}</h3>
      </div>
      <div className="p-4">
        <table className="table table-hover w-100">
          <thead className="table-light">
            <tr>
              <th scope="col" style={{ width: '5%', minWidth: '50px' }}>
                번호
              </th>
              <th scope="col">제목</th>
              <th scope="col" style={{ width: '15%', minWidth: '130px' }}>
                작성자
              </th>
              <th scope="col" style={{ width: '10%', minWidth: '83px' }}>
                작성일
              </th>
            </tr>
          </thead>
          <tbody>
            {posts.map(({ id, title, author, postDate }) => (
              <tr key={id}>
                <td scope="row">{id}</td>
                <td style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '0' }}>
                  <Link href={`/board/post/${id}`}>
                    <a>{title}</a>
                  </Link>
                </td>
                <td>{author?.name ?? '몰?루'}</td>
                <td>{getDateDiff(postDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-between">
        <div></div>
        <nav aria-label="Page navigation">
          <ul className="pagination">
            <li className={`page-item disabled`}>
              <a className="page-link">&laquo;</a>
            </li>
            <li className="page-item disabled">
              <a className="page-link">&lt;</a>
            </li>
            <li className="page-item active">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item disabled">
              <a className="page-link">&gt;</a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
        {!loading && session && !(type === 'notice' && session?.id !== 1) && (
          <button className="btn btn-outline-primary me-4 align-self-start" onClick={onWrite}>
            글쓰기
          </button>
        )}
      </div>
    </div>
  );
};

export default BoardBox;
