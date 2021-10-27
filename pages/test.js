import Layout from '../components/layout/layout';
import Image from 'next/image';
import wrapper from '../modules/index';

function Test(props) {
  const { scope, wordType, filter } = props;
  return (
    <Layout>
      <div>
        <p>{scope}</p>
        <p>{wordType}</p>
        <p>{filter}</p>
      </div>
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    const { scope, wordType, filter } = store.getState().search;
    return {
      props: { scope: scope, wordType: wordType, filter: filter },
    };
  },
);

export default Test;
