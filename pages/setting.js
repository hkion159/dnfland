import Layout from '../components/layout/layout';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

function Setting(props) {
  // const router = useRouter();
  // const [session, loading] = useSession();
  // if (!session) router.push('/');

  return (
    <Layout>
      <div>세팅페이지입니다.</div>
    </Layout>
  );
}

export default Setting;
