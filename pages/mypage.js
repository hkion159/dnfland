import Layout from '../components/layout/layout';
import { useSession } from 'next-auth/client';
import { useState, useCallback, useRef, useEffect } from 'react';
import axios from 'axios';

const MyPage = () => {
  const [session, loading] = useSession();
  const enrollRef = useRef(null);
  const [enroll, setEnroll] = useState(false);
  const nameRef = useRef(null);
  const [changeName, setChangeName] = useState(false);
  const [advName, setAdvName] = useState('');
  const [name, setName] = useState('');
  const onEnroll = useCallback(
    async (e) => {
      e.preventDefault();
      setAdvName(enrollRef.current.value);
      setEnroll(true);
      setTimeout(() => {
        setEnroll(false);
      }, 3000);
      await axios.put('/api/adventure', { id: session.id, name: enrollRef.current.value });
    },
    [session?.id],
  );
  const onChangeName = useCallback(async (e) => {
    e.preventDefault();
    setName(nameRef.current.value);
    setChangeName(true);
    setTimeout(() => {
      setChangeName(false);
    }, 3000);
    await axios.put('/api/user', { name: nameRef.current.value });
  }, []);
  useEffect(() => {
    const api = async () => {
      const res = await axios.get('/api/user');
      const user = await res.data;
      enrollRef.current.value = user?.adventure?.name;
      nameRef.current.value = user?.name;
    };
    api();
  }, []);
  return (
    <Layout>
      <div className="p-4">
        <div>
          <h5 className="m-2">모험단 수정</h5>
          <form className="input-group" onSubmit={onEnroll}>
            <input
              type="text"
              className="form-control ms-2"
              placeholder="모험단명"
              aria-label="모험단명"
              aria-describedby="button-addon"
              required
              maxLength="40"
              style={{ flex: '0 0 auto', width: '20%', minWidth: '200px' }}
              ref={enrollRef}
            />
            <button className="btn btn-outline-success" type="submit" id="button-addon">
              수정
            </button>
          </form>
          {enroll && <p className="text-success my-3">모험단이 {advName}(으)로 수정되었습니다!!</p>}
        </div>
        <hr />
        <h5 className="m-2">닉네임 수정</h5>
        <form className="input-group" onSubmit={onChangeName}>
          <input
            type="text"
            className="form-control ms-2"
            placeholder="닉네임"
            aria-label="닉네임"
            aria-describedby="button-addon"
            maxLength="24"
            required
            style={{ flex: '0 0 auto', width: '20%', minWidth: '200px' }}
            ref={nameRef}
          />
          <button className="btn btn-outline-success" type="submit" id="button-addon">
            수정
          </button>
        </form>
        {changeName && <p className="text-success my-3">닉네임이 {name}(으)로 수정되었습니다!!</p>}
      </div>
    </Layout>
  );
};

export default MyPage;
