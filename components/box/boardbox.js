import { useSession } from 'next-auth/client';
import { useCallback } from 'react';
import { useRouter } from '../../node_modules/next/dist/client/router';
import Link from 'next/link';
import { getDateDiff } from '../../lib/date';
import Pagination from '../common/pagination';

const BoardBox = ({ posts: strPosts, type, lastPageStr, currentPageStr }) => {
  const posts = JSON.parse(strPosts);
  const lastPage = JSON.parse(lastPageStr);
  const currentPage = JSON.parse(currentPageStr);
  const [session, loading] = useSession();
  const router = useRouter();
  const onWrite = useCallback(() => {
    router.push('/board/write');
  }, [router]);
  return (
    <div>
      <div className="p-4">
        <h3 className="text-center">{type === 'normal' ? '종합 게시판' : '공지사항'}</h3>
      </div>
      <div className="p-4 pt-0">
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
              <th scope="col" style={{ width: '10%', minWidth: '100px' }}>
                작성일
              </th>
            </tr>
          </thead>
          <tbody>
            {posts.map(({ id, title, author, postDate, comments }) => (
              <tr key={id}>
                <td scope="row">{id}</td>
                <td style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '0' }}>
                  <Link href={`/board/post/${id}`}>
                    <a>
                      {title}
                      <span className="text-secondary">{comments?.length ? ` (${comments.length})` : null}</span>
                    </a>
                  </Link>
                </td>
                <td>{author?.name}</td>
                <td>{getDateDiff(postDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex">
        <div style={{ flex: '1' }}></div>
        <div style={{ flex: '1' }} className="d-flex justify-content-center">
          <Pagination type={type} current={currentPage} last={lastPage} />
        </div>
        <div style={{ flex: '1' }} className="d-flex justify-content-end">
          {!loading && session && !(type === 'notice' && session?.id !== 1) && (
            <button className="btn btn-outline-primary me-4 align-self-start" onClick={onWrite}>
              글쓰기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardBox;
