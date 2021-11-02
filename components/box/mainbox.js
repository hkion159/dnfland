import mainSt from '../../styles/mainbox.module.css';

function MainBox({ children }) {
  return (
    <div className={`${mainSt.container}`}>
      <div className={`${mainSt.ad}`}></div>
      <div className={`p-0 ${mainSt.contentbox}`}>{children}</div>
      <div className={`${mainSt.ad}`}></div>
    </div>
  );
}

export default MainBox;
