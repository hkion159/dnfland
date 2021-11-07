import Homebox from '../components/box/homebox';
import Layout from '../components/layout/layout';
import prisma from '../lib/prisma';
import wrapper from '../modules/index';

function Home({ maxId, notices, posts }) {
  const noticesObject = JSON.parse(notices);
  const postsObject = JSON.parse(posts);
  return (
    <>
      <Layout home>
        <Homebox maxId={maxId} notices={noticesObject} posts={postsObject}></Homebox>
      </Layout>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const max = await prisma.user.aggregate({
    _max: {
      id: true,
    },
  });
  const maxId = await max._max.id;
  const notices = await prisma.post.findMany({
    where: {
      type: 'notice',
    },
    include: {
      comments: true,
    },
    take: 4,
    orderBy: {
      id: 'desc',
    },
  });
  const posts = await prisma.post.findMany({
    where: {
      type: 'normal',
    },
    include: {
      comments: true,
    },
    take: 4,
    orderBy: {
      id: 'desc',
    },
  });
  const noticesStr = JSON.stringify(notices);
  const postsStr = JSON.stringify(posts);
  return {
    props: {
      maxId: maxId,
      notices: noticesStr,
      posts: postsStr,
    },
  };
});

export default Home;
