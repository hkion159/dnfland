import { useEffect, useState } from 'react';
import st from '../../styles/mainbox.module.css';
import Link from 'next/link';
import { useSession } from 'next-auth/client';
import axios from 'axios';

function MainBox({ children }) {
  const [visitList, setVisitList] = useState([]);
  const [adventure, setAdventure] = useState();
  const [characters, setCharacters] = useState([]);
  const [king, setKing] = useState();
  const [session, loading] = useSession();
  useEffect(() => {
    const visitListStr = window.localStorage.getItem('visitlist');
    const visitList = JSON.parse(visitListStr) || [];
    setVisitList(visitList);
  }, []);
  useEffect(() => {
    if (session) {
      const api = async () => {
        const res = await axios.get('/api/user');
        const user = await res.data;
        const adventure = await user.adventure;
        const characters = (await adventure?.characters) ?? [];
        const king = await adventure?.king;
        setAdventure(adventure);
        setCharacters(characters);
        setKing(king);
      };
      api();
    }
  }, [session]);
  return (
    <div className={`${st.container}`}>
      <div className={`${st.ad} d-flex align-items-start justify-content-end`}>
        <div
          className="m-3 bg-light sticky-top text-center"
          style={{ borderRadius: '10px', border: '1px solid #bbbbbb', top: '75px', opacity: '0.9' }}
        >
          <div className="bg-gradient">
            <div className="py-1 px-3">
              <b>내 모험단</b>
            </div>
            {adventure && (
              <div className="px-3 pb-1" style={{ color: '#8AC98E' }}>
                {adventure?.name}
              </div>
            )}
          </div>
          {!session && (
            <div className="py-1 px-3" style={{ borderTop: '1px solid #e0e0e0' }}>
              로그인해보세요!
            </div>
          )}
          {session && characters?.length === 0 && (
            <div className="py-1 px-3" style={{ borderTop: '1px solid #e0e0e0' }}>
              캐릭터를 검색하고
              <br />
              모험단에 등록하세요!
            </div>
          )}
          {session && king && (
            <div className="py-1 px-3" style={{ borderTop: '1px solid #e0e0e0' }}>
              <Link href={`/character?characterid=${king?.characterId}&serverid=${king?.serverId}`}>
                <a className="link-black">
                  <i className="align-baseline bi bi-play"></i>
                  <b>{king?.name}</b>
                </a>
              </Link>
            </div>
          )}
          <div className="overflow-scroll">
            {characters?.map((character, index) => (
              <div key={index} className="py-1 px-3" style={{ borderTop: '1px solid #e0e0e0' }}>
                <span>
                  <Link href={`/character?characterid=${character.characterId}&serverid=${character.serverId}`}>
                    <a className="link-black">{character.name}</a>
                  </Link>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={`p-0 ${st.contentbox}`}>{children}</div>
      <div className={`${st.ad} d-flex align-items-start`}>
        <div
          className="m-3 bg-light sticky-top text-center"
          style={{ borderRadius: '10px', border: '1px solid #bbbbbb', top: '75px', opacity: '0.9' }}
        >
          <div className="py-1 px-3 bg-gradient">
            <b>조회 기록</b>
          </div>
          {visitList?.map((visited, index) => (
            <div key={index} className="py-1 px-3" style={{ borderTop: '1px solid #e0e0e0' }}>
              <span>
                <Link href={`/character?characterid=${visited.characterId}&serverid=${visited.serverId}`}>
                  <a className="link-black">{visited.characterName}</a>
                </Link>
              </span>
            </div>
          ))}
          {visitList?.length === 0 && (
            <div className="py-1 px-3" style={{ borderTop: '1px solid #e0e0e0' }}>
              캐릭터를 검색해보세요!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainBox;
