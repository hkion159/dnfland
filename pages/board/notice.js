import BoardBox from '../../components/box/boardbox';
import Layout from '../../components/layout/layout';
import prisma from '../../lib/prisma';
import wrapper from '../../modules/index';

const Board = ({ posts, lastPageStr, currentPageStr }) => {
  return (
    <Layout>
      <BoardBox posts={posts} type="notice" lastPageStr={lastPageStr} currentPageStr={currentPageStr} />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const page = ctx.query.page ? Number(ctx.query.page) : 1;
  const many = await prisma.post.count({
    where: {
      type: 'notice',
    },
  });
  const lastPage = parseInt(Math.max(0, many - 1) / 10) + 1;
  const posts = await prisma.post.findMany({
    where: {
      type: 'notice',
    },
    include: { author: true, comments: true },
    orderBy: {
      id: 'desc',
    },
    skip: (page - 1) * 10,
    take: 10,
  });
  const data = JSON.stringify(posts);
  const currentPageStr = JSON.stringify(page);
  const lastPageStr = JSON.stringify(lastPage);
  return {
    props: {
      posts: data,
      currentPageStr: currentPageStr,
      lastPageStr: lastPageStr,
    },
  };
});

export default Board;
