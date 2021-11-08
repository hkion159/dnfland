import { CharImg, getAllInfo, getEquipment, getStatus, ItemImg } from '../lib/neople';
import Layout from '../components/layout/layout';
import wrapper from '../modules/index';
import axios from '../node_modules/axios/index';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useEffect } from 'react';

const Character = ({ allInfoStr, timeStr }) => {
  const allInfo = JSON.parse(allInfoStr);
  const time = JSON.parse(timeStr);
  const [status, equipment, avatar, creature, flag, talisman, skillStyles, buffEquipment, buffAvatar, buffCreature] =
    allInfo;
  const { characterId, characterName, level, jobGrowName, adventureName, guildName } = status;
  const router = useRouter();
  const { serverid: serverId } = router.query;
  useEffect(() => {
    const visitListStr = window.localStorage.getItem('visitlist');
    const visitList = JSON.parse(visitListStr) || [];
    const filteredVL = visitList.filter((visitedCharacter) => visitedCharacter.characterName !== characterName);
    filteredVL.unshift({ characterName, characterId, serverId });
    const slicedVL = filteredVL.slice(0, 10);
    window.localStorage.setItem('visitlist', JSON.stringify(slicedVL));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterId]);
  return (
    <Layout>
      <Head>
        <title>{characterName}</title>
      </Head>
      <div className="d-flex justify-content-center" style={{ backgroundColor: '#eeeeee' }}>
        <div></div>
        <div>{CharImg(characterId, serverId)}</div>
        <div></div>
      </div>
      <div></div>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const charId = await ctx.query.characterid;
  const serverId = (await ctx.query.serverid) || 'cain';
  const allInfo = await getAllInfo(charId, serverId);
  const time = new Date();
  const allInfoStr = JSON.stringify(allInfo);
  const timeStr = JSON.stringify(time);
  return {
    props: { allInfoStr: allInfoStr, timeStr: timeStr },
  };
});

export default Character;
