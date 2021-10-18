import Layout from '../components/layout/layout';
import Image from 'next/image';
import wrapper from '../modules/index';

export default function Test(props) {
  return <Layout>테스트입니다</Layout>;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    return {
      props: {},
    };
  },
);
