import Image from 'next/image';
import axios from 'axios';
import prisma from '../../lib/prisma';

export function getAPIKey() {
  return process.env.NEOPLE_API_KEY;
}

function getBaseUrl() {
  return 'https://api.neople.co.kr/df';
}

// 캐릭터 이미지
export function CharImg(props) {
  const { character, zoom = 1 } = props;
  const { ['serverId']: serverId, ['characterId']: charId } = character;
  return (
    <Image
      alt="character"
      src={`https://img-api.neople.co.kr/df/servers/${serverId}/characters/${charId}?zoom=${zoom}`}
      width={200 * zoom}
      height={230 * zoom}
    />
  );
}

// 서버
export function getServerList() {
  const servers = [
    {
      serverId: 'cain',
      serverName: '카인',
    },
    {
      serverId: 'diregie',
      serverName: '디레지에',
    },
    {
      serverId: 'siroco',
      serverName: '시로코',
    },
    {
      serverId: 'prey',
      serverName: '프레이',
    },
    {
      serverId: 'casillas',
      serverName: '카시야스',
    },
    {
      serverId: 'hilder',
      serverName: '힐더',
    },
    {
      serverId: 'anton',
      serverName: '안톤',
    },
    {
      serverId: 'bakal',
      serverName: '바칼',
    },
  ];
  return servers;
}

// 캐릭터 검색
export async function getCharacters(charName, { scope, wordType, filter }) {
  switch (scope) {
    case 'character':
      const searchKey = encodeURIComponent(charName);
      const res = await axios.get(
        `${getBaseUrl()}/servers/all/characters?characterName=${searchKey}&wordType=${wordType}&limit=200&apikey=${getAPIKey()}`,
      );
      const data = res.data['rows'];
      if (filter === 'true') return data.filter((user) => user['level'] >= 100);
      return data;
    case 'adventure':
      const characters = prisma.adventure.findMany({
        where: {
          name: '',
        },
      });
      return 0;
  }
}

// 캐릭터 데미지
export function getDamage(character) {
  return '데미지 계산 작업중입니다';
}

//
export function getStats(charId, serverId) {
  const res = axios.get(
    `https://api.neople.co.kr/df/servers/${serverId}/characters/${charId}/status?apikey=${getAPIKey()}`,
  );
  const data = res.data;
}

// 캐릭터 스킬 스타일
export async function getSkillStyles(character) {
  const { ['serverId']: serverId, ['characterId']: charId } = character;
  const res = await axios.get(
    `${getBaseUrl()}/servers/${serverId}/characters/${charId}/skill/style?apikey=${getAPIKey()}`,
  );
  const skills = res.data['skill']['style'];
  return skills;
}
