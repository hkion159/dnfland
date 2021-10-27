import Layout from '../components/layout/layout';
import { useSession } from 'next-auth/client';
import { useState, useCallback, useRef } from 'react';

const MyPage = () => {
  const [session, loading] = useSession();
  const [enroll, setEnroll] = useState(false);
  const enrollRef = useRef(null);
  const onEnroll = useCallback(
    (e) => {
      setEnroll(true);
      setTimeout(() => {
        setEnroll(false);
      }, 1500);
      e.preventDefault();
      const api = async () => {
        const body = { id: session.id, name: enrollRef.current.value };
        await fetch('/api/adventure', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
      };
      api();
      enrollRef.current.value = '';
    },
    [session?.id],
  );
  return (
    <Layout>
      <div className="p-4">
        <h3 className="m-2 text-center">모험단 재등록</h3>
        <form className="input-group" onSubmit={onEnroll}>
          <input
            type="text"
            className="form-control ms-auto"
            placeholder="등록할 모험단명"
            aria-label="등록할 모험단명"
            aria-describedby="button-addon"
            required
            style={{ flex: '0 0 auto', width: '20%', minWidth: '200px' }}
            ref={enrollRef}
          />
          <button
            className="btn btn-outline-success me-auto"
            type="submit"
            id="button-addon"
          >
            등록
          </button>
        </form>
        {enroll && <p className="text-success my-3">등록되었습니다!!</p>}
      </div>
    </Layout>
  );
};

export default MyPage;
