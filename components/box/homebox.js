import HomeStyle from '../../styles/homebox.module.css';
import { useSession } from 'next-auth/client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { getDate } from '../../lib/date';

function Homebox({ maxId, notices }) {
  const [session, loading] = useSession();
  // 건의하기 //
  const inputRef = useRef(null);
  const [submit, setSubmit] = useState(false);
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    setSubmit(true);
    setTimeout(() => {
      setSubmit(false);
    }, 1500);
    const api = async () => {
      await fetch('/api/sug', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputRef.current.value),
      });
    };
    api();
    inputRef.current.value = '';
  }, []);
  // 모험단 등록 //
  const enrollRef = useRef(null);
  const [enroll, setEnroll] = useState(false);
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
  // 모험단 조회 //
  const [adventure, setAdventure] = useState(null);
  useEffect(() => {
    const api = async () => {
      const response = await fetch('/api/user', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const user = await response.json();
      const adventure = await user.adventure;
      setAdventure(adventure);
      console.log(`모험단 조회됨(userId: ${user.id})`);
    };
    if (session) {
      api();
    }
  }, [session, enroll]);
  return (
    <div className={HomeStyle.container}>
      <div className={`${HomeStyle.introduce} d-flex flex-column`}>
        <div className="py-3 px-4 text-end">{`회원 수: ${maxId}명`}</div>
        <h3>던파랜드에 오신 것을 환영합니다.</h3>
        <h5>
          현재 사이트 개발 중에 있으며 데미지 계산 로직은 아직 미구현
          상태입니다.
        </h5>
        {!session && (
          <h5>로그인하고 모험단을 등록하면 홈에서 바로 접근할 수 있습니다.</h5>
        )}
        {session &&
          (adventure ? (
            <div
              className="border border-secondary rounded-3 ms-auto me-auto p-3 my-4 mt-auto"
              style={{ minWidth: '100px', maxWidth: '90%', minHeight: '100px' }}
            >
              {adventure?.characters?.length === 0 ? (
                <p className="text-center">캐릭터를 검색하세요!</p>
              ) : (
                <p>뎃</p>
              )}
            </div>
          ) : (
            <div className="p-4">
              <p className="m-2">자신의 모험단을 등록하세요!!</p>
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
          ))}
      </div>
      <div className={HomeStyle.infos}>
        <div className={HomeStyle.f1}>
          <div
            className="py-3 px-4 bg-light"
            style={{ borderBottom: '1px solid #e0e0e0' }}
          >
            <Link href="/">
              <a>
                <h5 className="text-black m-0">
                  던파랜드소식
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chevron-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </h5>
              </a>
            </Link>
          </div>
          <div>
            <table className="table table-hover m-0">
              <tbody>
                {notices.map(({ id, title, postDate }) => (
                  <tr key={id}>
                    <td className="px-4">
                      <Link href={`/board/post/${id}`}>
                        <a>{title}</a>
                      </Link>
                    </td>
                    <td className="text-end">{getDate(postDate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className={HomeStyle.f1}>
          <h5 className="my-3 mx-4">한 줄 건의하기</h5>
          <form className="input-group py-3 px-4" onSubmit={onSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="건의 내용"
              aria-label="건의 내용"
              aria-describedby="button-addon"
              ref={inputRef}
            />
            <button
              className="btn btn-outline-success"
              type="submit"
              id="button-addon"
            >
              전송
            </button>
          </form>
          {submit && (
            <p className="mx-3 my-1 text-success" style={{ fontSize: '8' }}>
              전송되었습니다!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Homebox;
