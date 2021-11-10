import HomeStyle from '../../styles/homebox.module.css';
import { useSession } from 'next-auth/client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { getDate, getDateDiff } from '../../lib/date';
import axios from 'axios';
import Image from 'next/image';
import logo from '../../public/images/DLlogo.png';

function Homebox({ maxId, notices, posts }) {
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
        {/* <div className="py-3 px-4 text-end">{`회원 수: ${maxId}명`}</div> */}
        <div style={{ flex: 'none' }}>
          <Image alt="logo" src={logo} width="100" height="100" />
        </div>
        <h5>현재 사이트 개발 중에 있으며 데미지 계산 로직은 아직 미구현 상태입니다.</h5>
        {/* {!session && <h5>로그인하고 모험단을 등록하면 왼쪽 배너에서 바로 접근할 수 있습니다.</h5>} */}
        {session &&
          (adventure ? null : (
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
        <p>
          현재 서버가 미국 워싱턴에 있어서 상당히 느립니다.
          <br />곧 서버 위치를 서울로 바꿀 예정입니다.
        </p>
      </div>
      <div className="d-flex">
        <div style={{ flex: '1', border: '1px solid #bbbbbb', borderRadius: '15px', margin: '15px' }}>
          <div
            className="py-3 px-4 bg-light bg-gradient"
            style={{ borderBottom: '1px solid #e0e0e0', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}
          >
            <Link href="/board/notice">
              <a className="link-dark">
                <h5 className="text-black m-0 d-inline-block">
                  공지사항
                  <i className="align-baseline bi bi-chevron-right"></i>
                </h5>
              </a>
            </Link>
          </div>
          <div>
            <table className="table table-hover m-0">
              <tbody>
                {notices.map(({ id, title, postDate, comments }, index) => (
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
                        <a>
                          {title}
                          <span className="text-secondary">{comments?.length ? ` (${comments.length})` : null}</span>
                        </a>
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
          <div
            className="py-3 px-4"
            style={{ borderBottom: '1px solid #e0e0e0', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}
          >
            <Link href="/board">
              <a className="link-dark">
                <h5 className="text-black m-0 d-inline-block">
                  종합 게시판
                  <i className="align-baseline bi bi-chevron-right"></i>
                </h5>
              </a>
            </Link>
          </div>
          <div>
            <table className="table table-hover m-0">
              <tbody>
                {posts.map(({ id, title, postDate, comments }, index) => (
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
                        <a>
                          {title}
                          <span className="text-secondary">{comments?.length ? ` (${comments.length})` : null}</span>
                        </a>
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
      </div>
    </div>
  );
}

export default Homebox;
