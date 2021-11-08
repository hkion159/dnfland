import st from '../../styles/thumbnail.module.css';
import Link from 'next/link';
import { CharImg, getDamage } from '../../lib/neople';
import Position from './position';

function Thumbnail({ character }) {
  const {
    serverName,
    serverId,
    characterId: charId,
    characterName: name,
    jobGrowName: job,
    position,
    level,
  } = character;
  return (
    <div className={`border border-secondary rounded-3 p-0 ${st.box}`} style={{ margin: '15px' }}>
      <Link href={`/character?characterid=${charId}&serverid=${serverId}`}>
        <a style={{ color: 'black' }}>
          {/* 이미지 */}
          <div>{CharImg(charId, serverId)}</div>

          {/* 서버, 이름 */}
          <div className="d-flex border-top">
            <div className="px-2 border-end text-secondary">{serverName}</div>
            <div className={`px-2 ${st.align}`}>
              <b>{name}</b>
            </div>
          </div>
          {/* 포지션, 직업 */}
          <div className="d-flex border-top">
            <div className={'px-2 border-end'}>
              <Position position={position} />
            </div>
            <div className={`px-2 ${st.align} ${level < 100 && 'text-secondary'}`}>
              {level < 100 && `Lv. ${level} `}
              {job}
            </div>
          </div>
          {/* 데미지 */}
          <div className="px-2 border-top text-center text-secondary">{getDamage(character)}</div>
        </a>
      </Link>
    </div>
  );
}

export default Thumbnail;
