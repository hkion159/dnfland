import st from '../../styles/footer.module.css';
import Image from 'next/image';
import Link from 'next/link';
import guiIcon from '../../public/images/icon02 copy6.png';
import neopleLogo from '../../public/images/row_color.png';

function Footer() {
  return (
    <footer>
      <div className={`p-3 pb-0 bg-light ${st.footer}`}>
        <div className={`d-flex container-xl justify-content-between ${st.container}`}>
          {/* 개발자 프로필 */}
          <div className={`${st.devprof} ${st.container}`}>
            <h4>던파랜드 개발자</h4>
            <div className={`d-flex`}>
              <div>
                <Link href={`/search?charactername=${encodeURIComponent('고운말_7794')}`}>
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
              <div className={`align-self-center`}>
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
              </div>
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
          <div className={st.container}>
            <p className="text-secondary">Copyright 2021. dnfland all rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
