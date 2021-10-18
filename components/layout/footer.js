import footerStyle from '../../styles/footer.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <div className={`p-3 pb-0 bg-light ${footerStyle.footer}`}>
      <div
        className={`d-flex container-xl justify-content-between ${footerStyle.container}`}
      >
        {/* 개발자 프로필 */}
        <div className={`${footerStyle.devprof} ${footerStyle.container}`}>
          <h4>던파랜드 개발자</h4>
          <div className={`d-flex`}>
            <div>
              <Link
                href={`/search?charactername=${encodeURIComponent(
                  '고운말_7794',
                )}`}
              >
                <a>
                  <Image
                    loader={({ src, width }) => `${src}&w=${width}`}
                    alt=""
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
                <Link
                  href={`/search?adventure=${encodeURIComponent('변태소녀')}`}
                >
                  <a className="link-primary">변태소녀</a>
                </Link>
                <br />
                본캐명:{' '}
                <Link
                  href={`/search?charactername=${encodeURIComponent(
                    '고운말_7794',
                  )}`}
                >
                  <a className="link-primary">고운말_7794</a>
                </Link>
                <br />
                <Link href="http://df.nexon.com/df/guild/search/detail?guId=10163541&page=1&gname=%BA%EE%B9%CC%BF%AC%C7%D5">
                  <a className="link-primary">
                    <Image
                      alt=""
                      src="/images/icon02 copy6.png"
                      width="28"
                      height="28"
                    />
                    븜미연합
                  </a>
                </Link>{' '}
                길드마스터
              </h5>
            </div>
          </div>
        </div>

        {/* 센터 네오플 로고 */}
        <div
          className={`d-flex align-items-center justify-content-center ${footerStyle.container}`}
        >
          <Link href="http://developers.neople.co.kr" target="_blank">
            <a>
              <Image
                alt="openapi"
                src="/images/row_color.png"
                height="36"
                width="191"
              />
            </a>
          </Link>
        </div>

        {/* 우측 기타 정보 */}
        <div className={footerStyle.container}>
          <p className="text-secondary">
            Copyright 2021. dnfland all rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
