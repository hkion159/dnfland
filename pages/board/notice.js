import BoardBox from '../../components/box/boardbox';
import Layout from '../../components/layout/layout';
import prisma from '../../lib/prisma';
import wrapper from '../../modules/index';

const Board = ({ posts }) => {
  return (
    <Layout>
      <BoardBox posts={posts} type="notice" />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const posts = await prisma.post.findMany({
      where: {
        type: 'notice',
      },
      take: 10,
    });
    const data = JSON.stringify(posts);
    return {
      props: {
        posts: data,
      },
    };
  },
);

export default Board;
