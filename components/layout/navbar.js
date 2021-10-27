import Link from 'next/link';
import Image from 'next/image';
import NavStyle from '../../styles/navbar.module.css';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/client';
import { usePopper } from 'react-popper';
import { useDispatch, useSelector } from 'react-redux';
import { setSettings } from '../../modules/search';
import loginBtn from '../../public/images/kakao_login_medium_narrow.png';

function Navbar() {
  const router = useRouter();
  const inputRef = useRef(null);
  // 캐릭터 검색 이벤트 핸들러 //
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      router.push(`/search?charactername=${inputRef.current.value}`, '/search');
      inputRef.current.value = '';
    },
    [router],
  );
  // 캐릭터 검색 입력에 포커스 //
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
      if (
        !popRef?.current?.contains(e.target) &&
        !btnRef?.current?.contains(e.target)
      )
        setPopover(false);
    });
  }, []);
  return (
    <nav
      className={`navbar navbar-expand-md navbar-light bg-light sticky-top shadow-sm ${NavStyle.Navbar}`}
    >
      {/* 전체 컨테이너 */}
      <div className={`container-xl`}>
        <div className={NavStyle.n1}>
          {/* DL 로고 */}
          <Link href="/">
            <a className={`navbar-brand p-0`}>
              <Image
                src="/images/DLlogo.png"
                height="50%"
                width="50%"
                alt="homelogo"
              />
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
          <div
            className={`collapse navbar-collapse ${NavStyle.collapse}`}
            id="navbarSupportedContent"
          >
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

        {/* 중앙 캐릭터 검색 form */}
        <div className={NavStyle.n1}>
          <form
            className={`d-flex mb-3 mb-md-0 pb-1 ms-auto me-auto`}
            onSubmit={onSubmit}
            autoComplete="on"
          >
            <div ref={btnRef}>
              <button
                className={`btn ${NavStyle.settingbtn}`}
                type="button"
                ref={setReferenceElement}
                onClick={() => setPopover(!popover)}
              >
                {/* 기어 아이콘 */}
                <i className={`bi bi-gear ${NavStyle.icon}`}></i>
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
          <div
            ref={setPopperElement}
            style={styles.popper}
            className={`${NavStyle.pop} shadow-sm`}
            {...attributes.popper}
          >
            <div ref={popRef}>
              <div
                style={{
                  borderBottom: '1px solid #b6b6b6',
                  lineHeight: '40px',
                }}
              >
                <p className="text-center">검색 설정</p>
              </div>
              <div style={{ padding: '20px' }}>
                {/* 1번 라인 */}
                <div className="d-flex">
                  <div className={NavStyle.f1}>
                    <div className={`form-check form-check-inline`}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="scope"
                        id="inlineRadio1"
                        value="character"
                        checked={scope === 'character'}
                        onChange={onChange}
                      />
                      <label
                        className="form-check-label mb-1"
                        htmlFor="inlineRadio1"
                        style={{ whiteSpace: 'nowrap' }}
                      >
                        캐릭터
                      </label>
                    </div>
                  </div>
                  <div className={NavStyle.f1}>
                    <div className={`form-check form-check-inline`}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="scope"
                        id="inlineRadio2"
                        value="adventure"
                        checked={scope === 'adventure'}
                        onChange={onChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio2"
                      >
                        모험단
                      </label>
                    </div>
                  </div>
                </div>
                {/* 2번 라인 */}
                <div className="d-flex">
                  <div className={NavStyle.f1}>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="wordType"
                        id="inlineRadio3"
                        value="match"
                        checked={wordType === 'match'}
                        onChange={onChange}
                      />
                      <label
                        className="form-check-label mb-1"
                        htmlFor="inlineRadio3"
                        style={{ whiteSpace: 'nowrap' }}
                      >
                        동일 단어
                      </label>
                    </div>
                  </div>
                  <div className={NavStyle.f1}>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="wordType"
                        id="inlineRadio4"
                        value="full"
                        checked={wordType === 'full'}
                        onChange={onChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio4"
                      >
                        전문 검색
                      </label>
                    </div>
                  </div>
                </div>
                {/* 3번 라인 */}
                <div className="d-flex">
                  <div className={NavStyle.f1}>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="filter"
                        id="inlineRadio5"
                        value="true"
                        checked={filter === 'true'}
                        onChange={onChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio5"
                        style={{ whiteSpace: 'nowrap' }}
                      >
                        100레벨 이상
                      </label>
                    </div>
                  </div>
                  <div className={NavStyle.f1}>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="filter"
                        id="inlineRadio6"
                        value="false"
                        checked={filter === 'false'}
                        onChange={onChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio6"
                      >
                        모든 레벨
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              ref={setArrowElement}
              style={styles.arrow}
              className={NavStyle.arrow}
            />
          </div>
        )}

        {/* 우측 로그인 버튼 */}
        <div
          className={`mb-2 mb-md-0 d-flex justify-content-end ${NavStyle.n1}`}
        >
          {!loading &&
            (!session ? (
              <a onClick={() => signIn('kakao')}>
                <Image alt="loginbtn" src={loginBtn} width="183" height="45" />
              </a>
            ) : (
              <ul className="navbar-nav mb-2 mb-md-1">
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    마이페이지
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    설정
                  </a>
                </li>
                <li>
                  <a className="nav-link" onClick={signOut}>
                    로그아웃
                  </a>
                </li>
              </ul>
            ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
