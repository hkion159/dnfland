import Navbar from './navbar';
import st from '../../styles/layout.module.css';
import Footer from './footer';
import MainBox from '../box/mainbox';

function Layout(props) {
  return (
    <div className={`${st.layout}`}>
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

export default Layout;
