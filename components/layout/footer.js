import st from '../../styles/footer.module.css';
import Image from 'next/image';
import Link from 'next/link';
import guiIcon from '../../public/images/icon02 copy6.png';
import neopleLogo from '../../public/images/row_color.png';
import { useCallback, useRef, useState } from 'react';
import { useSession } from 'next-auth/client';
import axios from 'axios';

function Footer() {
  const [session, loading] = useSession();
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
  return (
    <footer>
      <div className={`p-3 pb-0 bg-light ${st.footer}`}>
        <div className={`d-flex container-xl justify-content-between ${st.container}`}>
          {/* 개발자 프로필 */}
          <div className={`${st.devprof} ${st.container}`}>
            <h4>던파랜드 개발자</h4>
            <div className={`d-flex`}>
              <div>
                <Link href={`/search?character=${encodeURIComponent('고운말_7794')}`}>
                  <a>
                    <Image
                      alt="developer"
                      src="https://img-api.neople.co.kr/df/servers/cain/characters/4ecd3f9eea4b6dd87044a9d9323efd20?zoom=1"
                      width="100"
                      height="115"
                    />
                  </a>
                </Link>
              </div>
              {/* <div className={`align-self-center`}>
                <h5>
                  모험단명:{' '}
                  <Link href={`/search?adventure=${encodeURIComponent('변태소녀')}`}>
                    <a className="link-primary">변태소녀</a>
                  </Link>
                  <br />
                  본캐명:{' '}
                  <Link href={`/character?characterid=4ecd3f9eea4b6dd87044a9d9323efd20}`}>
                    <a className="link-primary">고운말_7794</a>
                  </Link>
                  <br />
                  <Link href="http://df.nexon.com/df/guild/search/detail?guId=10163541&page=1&gname=%BA%EE%B9%CC%BF%AC%C7%D5">
                    <a className="link-primary">
                      <Image alt="" src={guiIcon} />
                      븜미연합
                    </a>
                  </Link>{' '}
                  길드마스터
                </h5>
              </div> */}
            </div>
          </div>

          {/* 센터 네오플 로고 */}
          <div className={`d-flex align-items-center justify-content-center ${st.container}`}>
            <Link href="http://developers.neople.co.kr" target="_blank">
              <a>
                <Image alt="openapi" src={neopleLogo} />
              </a>
            </Link>
          </div>

          {/* 우측 기타 정보 */}
          <div style={{ flex: '1' }} className="d-flex flex-column">
            <h5>한 줄 건의하기</h5>
            <form className="input-group" onSubmit={onSubmit}>
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
            <p className="text-secondary mt-auto mb-auto">Copyright 2021. dnfland all rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
