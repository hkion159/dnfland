import HomeStyle from '../../styles/homebox.module.css';
import { useSession } from 'next-auth/client';

export default function Homebox() {
  const [session, loading] = useSession();
  console.log(session);
  return (
    <div className={HomeStyle.container}>
      <div className={HomeStyle.introduce}>
        <h3>던파랜드에 오신 것을 환영합니다.</h3>
        <h5>
          현재 사이트 개발 진행중에 있으며 데미지 계산 로직은 미구현 상태입니다.
        </h5>
        {!session && (
          <h5>로그인하고 모험단을 등록하면 홈에서 바로 접근할 수 있습니다.</h5>
        )}
      </div>
      <div className={HomeStyle.infos}>
        <div className={HomeStyle.f1}>던파랜드소식</div>
        <div className={HomeStyle.f1}>한줄건의하기</div>
      </div>
    </div>
  );
}
