import mainboxStyle from '../../styles/mainbox.module.css';

function MainBox({ children }) {
  return (
    <div className={`${mainboxStyle.container}`}>
      <div className={`${mainboxStyle.ad}`}></div>
      <div className={`p-0 ${mainboxStyle.contentbox}`}>{children}</div>
      <div className={`${mainboxStyle.ad}`}></div>
    </div>
  );
}

export default MainBox;
