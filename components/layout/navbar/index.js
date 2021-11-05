import Link from 'next/link';
import Image from 'next/image';
import st from '../../../styles/navbar.module.css';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/client';
import { usePopper } from 'react-popper';
import { useDispatch, useSelector } from 'react-redux';
import { setSettings } from '../../../modules/search';
import loginBtn from '../../../public/images/kakao_login_medium_narrow.png';
import logo from '../../../public/images/DLlogo.png';

function Navbar() {
  const router = useRouter();

  // 캐릭터 검색 input 포커스 //
  useEffect(() => {
    inputRef?.current?.focus();
  }, []);
  // 로그인 세션 //
  const [session, loading] = useSession();
  // popover 세팅 //
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom',
    modifiers: [
      { name: 'arrow', options: { element: arrowElement } },
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  });
  const [popover, setPopover] = useState(false);
  const popRef = useRef(null);
  const btnRef = useRef(null);
  // 검색 설정 //
  const settings = useSelector((state) => state.search);
  const { scope, wordType, filter } = settings;
  const dispatch = useDispatch();
  const onChange = useCallback(
    ({ target }) => {
      dispatch(setSettings({ type: target.name, option: target.value }));
    },
    [dispatch],
  );
  // popper 닫기 이벤트 핸들러 //
  useEffect(() => {
    document.addEventListener('mousedown', (e) => {
      if (!popRef?.current?.contains(e.target) && !btnRef?.current?.contains(e.target)) setPopover(false);
    });
  }, []);
  const inputRef = useRef(null);
  // 검색 //
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      router.push(`/search?${scope}=${inputRef.current.value}`);
      inputRef.current.value = '';
    },
    [router, scope],
  );
  return (
    <nav className={`navbar navbar-expand-md navbar-light bg-light fixed-top shadow-sm ${st.Navbar}`}>
      {/* 전체 컨테이너 */}
      <div className={`container-xl`}>
        <div className={st.n1}>
          {/* DL 로고 */}
          <Link href="/">
            <a className={`navbar-brand p-0`}>
              <Image src={logo} height="50%" width="50%" alt="homelogo" />
            </a>
          </Link>

          {/* collapse 버튼 */}
          <button
            className="navbar-toggler mb-1"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* collapse 영역 */}
          <div className={`collapse navbar-collapse ${st.collapse}`} id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-md-1">
              <li className="nav-item">
                <Link href="/rank">
                  <a className="nav-link">랭킹</a>
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  게시판
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link href="/board">
                      <a className="dropdown-item">종합 게시판</a>
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link href="/board/notice">
                      <a className="dropdown-item">공지사항</a>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link href="/help">
                  <a className="nav-link">FAQ</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 캐릭터 검색 form */}
        <div className={st.n1}>
          <form className={`d-flex mb-3 mb-md-0 pb-1 ms-auto me-auto`} onSubmit={onSubmit} autoComplete="on">
            <div ref={btnRef}>
              <button
                className={`btn ${st.settingbtn}`}
                type="button"
                ref={setReferenceElement}
                onClick={() => setPopover(!popover)}
              >
                {/* 기어 아이콘 */}
                <i className={`bi bi-gear ${st.icon}`}></i>
              </button>
            </div>
            <input
              className="form-control"
              type="search"
              placeholder={scope === 'character' ? '캐릭터명' : '모험단명'}
              style={{
                borderRadius: 0,
                borderRight: 0,
                borderLeft: 0,
              }}
              size="10"
              maxLength="12"
              required
              ref={inputRef}
            />
            <button
              className="btn btn-outline-primary"
              type="submit"
              style={{
                whiteSpace: 'nowrap',
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              }}
            >
              검색
            </button>
          </form>
        </div>

        {/* 검색 설정 pop */}
        {popover && (
          <div ref={setPopperElement} style={styles.popper} className={`${st.pop} shadow-sm`} {...attributes.popper}>
            <div ref={popRef}>
              <div
                style={{
                  borderBottom: '1px solid #b6b6b6',
                  lineHeight: '40px',
                }}
              >
                <p className="text-center">검색 설정</p>
              </div>
              <div className="d-flex flex-column" style={{ padding: '20px' }}>
                <div className="btn-group mb-3 bg-white" role="group" aria-label="Basic radio toggle button group">
                  <input
                    type="radio"
                    className="btn-check"
                    name="scope"
                    value="character"
                    id="btnradio1"
                    autoComplete="off"
                    checked={scope === 'character'}
                    onChange={onChange}
                  />
                  <label className="btn btn-outline-primary" htmlFor="btnradio1">
                    캐릭터
                  </label>

                  <input
                    type="radio"
                    className="btn-check"
                    name="scope"
                    value="adventure"
                    id="btnradio2"
                    autoComplete="off"
                    checked={scope === 'adventure'}
                    onChange={onChange}
                  />
                  <label className="btn btn-outline-primary" htmlFor="btnradio2">
                    모험단
                  </label>
                </div>
                <div className="btn-group mb-3 bg-white" role="group" aria-label="Basic radio toggle button group">
                  <input
                    type="radio"
                    className="btn-check"
                    name="wordType"
                    value="match"
                    id="btnradio3"
                    autoComplete="off"
                    checked={wordType === 'match'}
                    disabled={scope === 'adventure'}
                    onChange={onChange}
                  />
                  <label className="btn btn-outline-primary" htmlFor="btnradio3">
                    동일 단어
                  </label>

                  <input
                    type="radio"
                    className="btn-check"
                    name="wordType"
                    value="full"
                    id="btnradio4"
                    autoComplete="off"
                    checked={wordType === 'full'}
                    disabled={scope === 'adventure'}
                    onChange={onChange}
                  />
                  <label className="btn btn-outline-primary" htmlFor="btnradio4">
                    전문 검색
                  </label>
                </div>
                <div className="btn-group bg-white" role="group" aria-label="Basic radio toggle button group">
                  <input
                    type="radio"
                    className="btn-check"
                    name="filter"
                    value="true"
                    id="btnradio5"
                    autoComplete="off"
                    checked={filter === 'true'}
                    disabled={scope === 'adventure'}
                    onChange={onChange}
                  />
                  <label className="btn btn-outline-primary text-nowrap" htmlFor="btnradio5">
                    100레벨 이상
                  </label>

                  <input
                    type="radio"
                    className="btn-check"
                    name="filter"
                    value="false"
                    id="btnradio6"
                    autoComplete="off"
                    checked={filter === 'false'}
                    disabled={scope === 'adventure'}
                    onChange={onChange}
                  />
                  <label className="btn btn-outline-primary text-nowrap" htmlFor="btnradio6" style={{ width: '116px' }}>
                    모든 레벨
                  </label>
                </div>
              </div>
            </div>
            <div ref={setArrowElement} style={styles.arrow} className={st.arrow} />
          </div>
        )}

        {/* 우측 로그인 버튼 */}
        <div className={`mb-2 mb-md-0 d-flex justify-content-end ${st.n1}`}>
          {!loading &&
            (!session ? (
              <a onClick={() => signIn('kakao')}>
                <Image alt="loginbtn" src={loginBtn} />
              </a>
            ) : (
              <ul className="navbar-nav mb-2 mb-md-1">
                <li className="nav-item">
                  <Link href="/mypage">
                    <a className="nav-link">마이페이지</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/setting">
                    <a className="nav-link">설정</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a className="nav-link" onClick={signOut}>
                      로그아웃
                    </a>
                  </Link>
                </li>
              </ul>
            ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
