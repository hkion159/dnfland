import { CharImg, getAllInfo, getEquipInfo, getEquipment, ItemImg } from '../lib/neople';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import Layout from '../components/layout/layout';
import wrapper from '../modules/index';
import axios from '../node_modules/axios/index';
import Status from '../components/profile/status';
import AvatarCreature from '../components/profile/avatarcreature/index';
import st from '../styles/character.module.css';
import FlagTalisman from '../components/profile/flagtalisman/index';
import Skill from '../components/profile/skill/index';
import Buff from '../components/profile/buff/index';
import MenuBtn from '../components/common/menubtn';
import ItemType from '../components/profile/itemtype';
import { getPosition } from './api/jobs';
import Position from '../components/profile/position';

const Character = ({ allInfoStr, timeStr, positionStr, serverIdStr }) => {
  const allInfo = JSON.parse(allInfoStr);
  const time = JSON.parse(timeStr);
  const position = JSON.parse(positionStr);
  const serverId = JSON.parse(serverIdStr);
  console.log(allInfo);
  const [rowStatus, rowEquipment, avatar, creature, flag, talisman, skill, buffEquipment, buffAvatar, buffCreature] =
    allInfo;
  const { characterId, characterName, level, jobGrowName, adventureName, guildName } = rowStatus;
  const status = rowStatus.status;
  const equipment = rowEquipment.equipment;
  const set = rowEquipment.setItemInfo;
  const [weapon, title, jacket, shoulder, pants, shoes, waist, amulet, wrist, ring, support, magicstone, earring] =
    getEquipInfo(equipment);
  const fame = status.filter((stat) => stat.name === '모험가 명성')[0]?.value ?? 0;
  const router = useRouter();
  const [menu, setMenu] = useState([true]);
  const updateChar = useCallback(async (info) => {
    await axios.put('/api/character', info);
  }, []);
  const onChangeMenu = useCallback((value) => {
    const tmp = [];
    tmp[value] = true;
    setMenu(tmp);
  }, []);
  useEffect(() => {
    const visitListStr = window.localStorage.getItem('visitlist');
    const visitList = JSON.parse(visitListStr) || [];
    const filteredVL = visitList.filter((visitedCharacter) => visitedCharacter.characterName !== characterName);
    filteredVL.unshift({ characterName, characterId, serverId });
    const slicedVL = filteredVL.slice(0, 10);
    window.localStorage.setItem('visitlist', JSON.stringify(slicedVL));
    updateChar({
      charId: characterId,
      charName: characterName,
      serverId: serverId,
      jobName: jobGrowName,
      guildName: guildName,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterId]);
  return (
    <Layout>
      <Head>
        <title>{characterName}</title>
      </Head>
      <div className="d-flex flex-column">
        <div className="d-flex flex-column text-center">
          <div className="d-flex justify-content-center">
            <div
              className="d-flex align-items-start flex-wrap p-1 py-3"
              style={{ width: '80px', marginRight: '60px', alignContent: 'flex-start' }}
            >
              <div style={{ margin: '0 2px' }}>{ItemImg(shoulder.itemId)}</div>
              <div style={{ margin: '0 2px' }}>{ItemImg(jacket.itemId)}</div>
              <div style={{ margin: '0 2px' }}>{ItemImg(pants.itemId)}</div>
              <div style={{ margin: '0 2px' }}>{ItemImg(waist.itemId)}</div>
              <div style={{ margin: '0 2px' }}>{ItemImg(shoes.itemId)}</div>
            </div>
            <div className="position-absolute" style={{ top: '20px', zIndex: '2' }}>
              {CharImg(characterId, serverId)}
            </div>
            <div
              className="d-flex align-items-start justify-content-start flex-wrap p-1 py-3"
              style={{ width: '80px', marginLeft: '60px' }}
            >
              <div style={{ margin: '0 2px' }}>{ItemImg(weapon.itemId)}</div>
              <div style={{ margin: '0 2px' }}>{ItemImg(title?.itemId)}</div>
              <div style={{ margin: '0 2px' }}>{ItemImg(wrist.itemId)}</div>
              <div style={{ margin: '0 2px' }}>{ItemImg(amulet.itemId)}</div>
              <div style={{ margin: '0 2px' }}>{ItemImg(support.itemId)}</div>
              <div style={{ margin: '0 2px' }}>{ItemImg(ring.itemId)}</div>
              <div style={{ margin: '0 2px' }}>{ItemImg(magicstone.itemId)}</div>
              <div style={{ margin: '0 2px' }}>{ItemImg(earring.itemId)}</div>
            </div>
          </div>
          <ItemType itemRarity={'모험단'} itemName={adventureName} />
          <div>
            <ItemType itemName={`Lv.${level} `} className="d-inline-block" />
            <ItemType itemName={characterName} className="fw-bold d-inline-block ms-1" />
          </div>
          <div>
            <Position position={position} /> <ItemType itemName={`[${jobGrowName}]`} className="d-inline-block ms-1" />
          </div>
          <div className="progress mt-2">
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              aria-valuenow="75"
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: `${(fame / 20000) * 100}%` }}
            >
              {fame}
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <span style={{ flex: '1' }} className="text-secondary text-start">
              0
            </span>
            <span style={{ flex: '1' }}></span>
            <span style={{ flex: '1' }} className="text-secondary text-end">
              20000
            </span>
          </div>
        </div>
        <div className="d-flex">
          <div>
            <div className="list-group text-center" style={{ borderRadius: '0' }}>
              <MenuBtn title="데미지" index={0} onChangeMenu={onChangeMenu} menu={menu} />
              <MenuBtn title="능력치" index={1} onChangeMenu={onChangeMenu} menu={menu} />
              <MenuBtn title="아바타와 크리쳐" index={2} onChangeMenu={onChangeMenu} menu={menu} />
              <MenuBtn title="휘장과 탈리스만" index={3} onChangeMenu={onChangeMenu} menu={menu} />
              <MenuBtn title="스킬 스타일" index={4} onChangeMenu={onChangeMenu} menu={menu} />
              <MenuBtn title="버프 스킬 강화" index={5} onChangeMenu={onChangeMenu} menu={menu} />
            </div>
          </div>
          <div className={`flex-fill text-center overflow-auto ${st.info}`}>
            {menu[0] && (
              <h5>
                데미지 계산 로직은 구현 중입니다.
                <br />
                현재 데미지를 제외한 정보들은 조회 가능합니다.
              </h5>
            )}
            {menu[1] && <Status status={status} />}
            {menu[2] && <AvatarCreature avatar={avatar} creature={creature} />}
            {menu[3] && <FlagTalisman flag={flag} talisman={talisman} />}
            {menu[4] && <Skill skill={skill} />}
            {menu[5] && <Buff equipment={buffEquipment} avatar={buffAvatar} creature={buffCreature} />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const charId = await ctx.query.characterid;
  const serverId = (await ctx.query.serverid) || 'cain';
  const allInfo = await getAllInfo(charId, serverId);
  const position = await getPosition({ characterId: charId, serverId: serverId, jobGrowName: allInfo[0].jobGrowName });
  const time = new Date();
  const allInfoStr = JSON.stringify(allInfo);
  const timeStr = JSON.stringify(time);
  const positionStr = JSON.stringify(position);
  const serverIdStr = JSON.stringify(serverId);
  return {
    props: { allInfoStr: allInfoStr, timeStr: timeStr, positionStr: positionStr, serverIdStr: serverIdStr },
  };
});

export default Character;
