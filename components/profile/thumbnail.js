import st from '../../styles/thumbnail.module.css';
import Link from 'next/link';
import { CharImg, getDamage } from '../../lib/neople';

function Thumbnail({ character }) {
  const { serverName, characterId: charId, characterName: name, jobGrowName: job, position, level } = character;
  const positionColor = {
    d: 'text-danger',
    s: 'text-primary',
    b: 'text-success',
    노전직: 'text-warning',
  };
  return (
    <div className={`border border-secondary rounded-3 p-0 ${st.box}`} style={{ margin: '15px' }}>
      <Link href={`/character?characterid=${charId}`}>
        <a style={{ color: 'black' }}>
          {/* 이미지 */}
          <div>
            <CharImg character={character} />
          </div>

          {/* 서버, 이름 */}
          <div className="d-flex border-top">
            <div className="px-2 border-end text-secondary">{serverName}</div>
            <div className={`px-2 ${st.align}`}>
              <b>{name}</b>
            </div>
          </div>
          {/* 포지션, 직업 */}
          <div className="d-flex border-top">
            <div className={`px-2 border-end ${positionColor[position]}`}>{position.toUpperCase()}</div>
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
