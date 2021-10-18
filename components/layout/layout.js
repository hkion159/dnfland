import Navbar from './Navbar';
import layoutStyle from '../../styles/layout.module.css';
import Footer from './footer';
import MainBox from '../box/mainbox';

export default function Layout(props) {
  return (
    <div className={`${layoutStyle.layout}`}>
      {/* 높이 100% 만들기 */}
      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div {
          height: 100%;
        }
      `}</style>
      {/* 내비게이션 바 */}
      <Navbar />
      {/* 메인 컨텐츠 영역 */}
      <MainBox>{props.children}</MainBox>
      {/* 홈페이지 푸터 */}
      {props.home && <Footer />}
    </div>
  );
}
