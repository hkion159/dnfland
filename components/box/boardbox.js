import { useSession } from 'next-auth/client';
import { useCallback } from 'react';
import { useRouter } from '../../node_modules/next/dist/client/router';
import Link from 'next/link';

const BoardBox = ({ posts: strPosts, type }) => {
  const posts = JSON.parse(strPosts);
  const [session, loading] = useSession();
  const router = useRouter();
  const onWrite = useCallback(() => {
    router.push('/board/write');
  }, [router]);
  return (
    <div>
      <div className="p-4">
        <h3 className="text-center">
          {type === 'normal' ? '종합 게시판' : '공지사항'}
        </h3>
      </div>
      <div className="p-4">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">번호</th>
              <th scope="col">제목</th>
              <th scope="col">작성자</th>
              <th scope="col">작성일</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(({ id, title, author, postDate }) => (
              <tr key={id}>
                <th scope="row">{id}</th>
                <td>
                  <Link href={`/board/post/${id}`}>
                    <a>{title}</a>
                  </Link>
                </td>
                <td>{author?.name ?? '몰?루'}</td>
                <td>{postDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex">
        {!loading && session && (
          <button
            className="btn btn-outline-primary ms-auto me-4"
            onClick={onWrite}
          >
            글쓰기
          </button>
        )}
      </div>
    </div>
  );
};

export default BoardBox;
