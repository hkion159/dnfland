import Homebox from '../components/box/homebox';
import Layout from '../components/layout/layout';
import prisma from '../lib/prisma';
import wrapper from '../modules/index';

function Home({ maxId, notices }) {
  const noticesObject = JSON.parse(notices);
  return (
    <>
      <Layout home>
        <Homebox maxId={maxId} notices={noticesObject}></Homebox>
      </Layout>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const max = await prisma.user.aggregate({
      _max: {
        id: true,
      },
    });
    const maxId = await max._max.id;
    const noticesJSON = await prisma.post.findMany({
      where: {
        type: 'notice',
      },
      take: -1,
    });
    const notices = JSON.stringify(noticesJSON);
    return {
      props: {
        maxId: maxId,
        notices: notices,
      },
    };
  },
);

export default Home;
