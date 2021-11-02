import HomeStyle from '../../styles/homebox.module.css';
import { useSession } from 'next-auth/client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { getDate, getDateDiff } from '../../lib/date';
import axios from 'axios';
import Image from 'next/image';
import logo from '../../public/images/DLlogo.png';

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
      await axios.post('/api/sug', inputRef.current.value);
    };
    api();
    inputRef.current.value = '';
  }, []);
  // 모험단 등록 //
  const enrollRef = useRef(null);
  const [enroll, setEnroll] = useState(false);
  const [advName, setAdvName] = useState('');
  const onEnroll = useCallback(
    (e) => {
      setAdvName(enrollRef.current.value);
      setEnroll(true);
      setTimeout(() => {
        setEnroll(false);
      }, 1500);
      e.preventDefault();
      const api = async () => {
        const body = { id: session.id, name: enrollRef.current.value };
        await axios.put('/api/adventure', body);
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
      const response = await axios.get('/api/user');
      const user = await response.data;
      const adventure = await user.adventure;
      setAdventure(adventure);
    };
    if (session) {
      api();
    }
  }, [session, enroll]);
  return (
    <div className={HomeStyle.container}>
      <div className={`${HomeStyle.introduce} text-center d-flex flex-column flex-grow-2 flex-shrink-1`}>
        <div className="py-3 px-4 text-end">{`회원 수: ${maxId}명`}</div>
        <div style={{ flex: 'none' }}>
          <Image alt="logo" src={logo} width="100" height="100" />
        </div>
        <h5>현재 사이트 개발 중에 있으며 데미지 계산 로직은 아직 미구현 상태입니다.</h5>
        {!session && <h5>로그인하고 모험단을 등록하면 홈에서 바로 접근할 수 있습니다.</h5>}
        {session &&
          (adventure ? (
            <>
              <h5 className="mt-auto mb-3">
                <span
                  style={{
                    color: '#B9EFBD',
                    textShadow: '-1px 0 #749776, 0 1px #749776, 1px 0 #749776, 0 -1px #749776',
                  }}
                >
                  {adventure.name}
                </span>{' '}
                모험단{' '}
              </h5>
              <div
                className="border border-secondary rounded-3 ms-auto me-auto p-3 mb-4 d-flex align-items-center"
                style={{
                  minWidth: '100px',
                  maxWidth: '90%',
                  minHeight: '100px',
                }}
              >
                {adventure?.characters?.length === 0 ? (
                  <p className="text-center ">캐릭터를 검색하세요!</p>
                ) : (
                  <p>캐릭터를 검색하고 모험단에 등록하세요!</p>
                )}
              </div>
            </>
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
                <button className="btn btn-outline-success me-auto" type="submit" id="button-addon">
                  등록
                </button>
              </form>
              {enroll && <p className="text-success my-3">{advName}(으)로 등록되었습니다!!</p>}
            </div>
          ))}
      </div>
      <div className="d-flex">
        <div style={{ flex: '1', border: '1px solid #bbbbbb', borderRadius: '15px', margin: '15px' }}>
          <div
            className="py-3 px-4 bg-light"
            style={{ borderBottom: '1px solid #e0e0e0', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}
          >
            <Link href="/">
              <a>
                <h5 className="text-black m-0">
                  공지사항
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chevron-right align-baseline"
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
                {notices.map(({ id, title, postDate }, index) => (
                  <tr key={id} style={index === notices.length - 1 ? { borderBottom: '0px solid transparent' } : {}}>
                    <td
                      className="ps-4"
                      style={
                        index === notices.length - 1
                          ? {
                              borderBottomLeftRadius: '15px',
                              textOverflow: 'ellipsis',
                              overflow: 'hidden',
                              whiteSpace: 'nowrap',
                              maxWidth: '0',
                            }
                          : { textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '0' }
                      }
                    >
                      <Link href={`/board/post/${id}`}>
                        <a>{title}</a>
                      </Link>
                    </td>
                    <td
                      className="text-end pe-4 text-secondary"
                      style={
                        index === notices.length - 1
                          ? { borderBottomRightRadius: '15px', width: '15%', minWidth: '100px' }
                          : {}
                      }
                    >
                      {getDateDiff(postDate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div
          style={{ flex: '1', border: '1px solid #bbbbbb', borderRadius: '15px', margin: '15px' }}
          className="bg-light bg-gradient"
        >
          <h5 className="my-3 mx-4">한 줄 건의하기</h5>
          <form className="input-group pb-3 px-4 mb-3" onSubmit={onSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder={session ? '건의 내용' : '로그인하시면 건의 가능합니다!'}
              aria-label="건의 내용"
              aria-describedby="button-addon"
              maxLength="200"
              ref={inputRef}
              disabled={!session}
            />
            <button className="btn btn-outline-success" type="submit" id="button-addon" disabled={!session}>
              전송
            </button>
          </form>
          {submit && (
            <p className="mx-4 my-1 text-success" style={{ fontSize: '8' }}>
              전송되었습니다!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Homebox;
