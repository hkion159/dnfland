import Layout from '../../../components/layout/layout';
import prisma from '../../../lib/prisma';
import wrapper from '../../../modules/index';
import dynamic from 'next/dynamic';
import { getDateTime } from '../../../lib/date';

const PostViewer = dynamic(
  () => import('../../../components/common/postviewer'),
  {
    ssr: false,
  },
);

const Board = ({ post: strPost }) => {
  const post = JSON.parse(strPost);
  return (
    <Layout>
      <div className="px-4">
        <p className="my-4">
          {post.type === 'notice' ? '공지사항' : '일반게시글'}
        </p>
        <h3 className="d-inline-block">{post.title}</h3>
        <p className="me-3">{`작성자id: ${post.authorId}`}</p>
        <p>{`작성 시간: ${getDateTime(post.postDate)}`}</p>
        {post.reviseDate && (
          <p>{`마지막 수정 시간: ${getDateTime(post.reviseDate)}`}</p>
        )}
        <hr />
        <PostViewer initialValue={post.markdown} />
      </div>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(ctx.query.id),
      },
    });
    const data = JSON.stringify(post);
    return {
      props: {
        post: data,
      },
    };
  },
);

export default Board;
