import { CharImg } from './api/neople';
import Layout from '../components/layout/layout';
import wrapper from '../modules/index';
import axios from '../node_modules/axios/index';

const Character = () => {
  return (
    <Layout>
      <div
        className=""
        style={{ minHeight: '200px', backgroundColor: '#eeeeee' }}
      >
        {/*CharImg()*/}
      </div>
      <div></div>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const id = ctx.query.characterid;
    //const character = await axios.get()
    return {
      props: {},
    };
  },
);

export default Character;
