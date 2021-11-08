import Image from 'next/image';
import axios from 'axios';
import { PrismaClient } from '@prisma/client';

export function getAPIKey() {
  return process.env.NEOPLE_API_KEY;
}

function getBaseUrl() {
  return 'https://api.neople.co.kr/df';
}

// 캐릭터 이미지
export function CharImg(charId, serverId) {
  return (
    <Image
      alt="character"
      src={`https://img-api.neople.co.kr/df/servers/${serverId}/characters/${charId}?zoom=1`}
      width={200}
      height={230}
      quality="100"
    />
  );
}

// 아이템 이미지
export function ItemImg(itemId) {
  return <Image alt="item" src={`https://img-api.neople.co.kr/df/items/${itemId}`} width={28} height={28} />;
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
export async function getCharacters(name, { scope, wordType, filter }) {
  let characters;
  let res;
  const searchKey = encodeURIComponent(name);
  switch (scope) {
    case 'character':
      res = await axios.get(
        `${getBaseUrl()}/servers/all/characters?characterName=${searchKey}&wordType=${wordType}&limit=200&apikey=${getAPIKey()}`,
      );
      characters = await res.data['rows'];
      if (filter === 'true') return characters.filter((character) => character['level'] >= 100);
      return characters;
    case 'adventure':
      const prisma = new PrismaClient();
      const adventure = await prisma.adventure.findUnique({
        where: {
          name: name,
        },
        include: {
          characters: true,
        },
      });
      return adventure?.characters ?? [];
  }
}

// 캐릭터 데미지
export function getDamage(character) {
  return '데미지 계산 작업중입니다';
}

// 캐릭터 능력치 정보
export async function getStatus(charId, serverId) {
  const res = await axios.get(`${getBaseUrl()}/servers/${serverId}/characters/${charId}/status?apikey=${getAPIKey()}`);
  const data = await res.data;
  return data;
}

// 캐릭터 장착 장비
export async function getEquipment(charId, serverId) {
  const res = await axios.get(
    `${getBaseUrl()}/servers/${serverId}/characters/${charId}/equip/equipment?apikey=${getAPIKey()}`,
  );
  const data = await res.data;
  return data;
}

// 캐릭터 장착 아바타
export async function getAvatar(charId, serverId) {
  const res = await axios.get(
    `${getBaseUrl()}/servers/${serverId}/characters/${charId}/equip/avatar?apikey=${getAPIKey()}`,
  );
  const data = await res.data;
  const avatar = await data.avatar;
  return avatar;
}

// 캐릭터 장착 크리쳐
export async function getCreature(charId, serverId) {
  const res = await axios.get(
    `${getBaseUrl()}/servers/${serverId}/characters/${charId}/equip/creature?apikey=${getAPIKey()}`,
  );
  const data = await res.data;
  const creature = await data.creature;
  return creature;
}

// 캐릭터 장착 휘장
export async function getFlag(charId, serverId) {
  const res = await axios.get(
    `${getBaseUrl()}/servers/${serverId}/characters/${charId}/equip/flag?apikey=${getAPIKey()}`,
  );
  const data = await res.data;
  const flag = await data.flag;
  return flag;
}

// 캐릭터 장착 탈리스만
export async function getTalisman(charId, serverId) {
  const res = await axios.get(
    `${getBaseUrl()}/servers/${serverId}/characters/${charId}/equip/talisman?apikey=${getAPIKey()}`,
  );
  const data = await res.data;
  const talismans = data.talismans;
  return talismans;
}

// 캐릭터 스킬 스타일
export async function getSkillStyles(charId, serverId) {
  const res = await axios.get(
    `${getBaseUrl()}/servers/${serverId}/characters/${charId}/skill/style?apikey=${getAPIKey()}`,
  );
  const skill = res.data['skill']['style'];
  return skill;
}

// 캐릭터 버프 스킬 강화 장착 장비
export async function getBuffEquipment(charId, serverId) {
  const res = await axios.get(
    `${getBaseUrl()}/servers/${serverId}/characters/${charId}/skill/buff/equip/equipment?apikey=${getAPIKey()}`,
  );
  const data = await res.data;
  const buffEquipment = await data.skill.buff;
  return buffEquipment;
}

// 캐릭터 버프 스킬 강화 장착 아바타
export async function getBuffAvatar(charId, serverId) {
  const res = await axios.get(
    `${getBaseUrl()}/servers/${serverId}/characters/${charId}/skill/buff/equip/avatar?apikey=${getAPIKey()}`,
  );
  const data = await res.data;
  const buffAvatar = await data.skill.buff.avatar;
  return buffAvatar;
}

// 캐릭터 버프 스킬 강화 장착 크리쳐
export async function getBuffCreature(charId, serverId) {
  const res = await axios.get(
    `${getBaseUrl()}/servers/${serverId}/characters/${charId}/skill/buff/equip/creature?apikey=${getAPIKey()}`,
  );
  const data = await res.data;
  const buffCreature = await data.skill.buff.creature;
  return buffCreature;
}

// 캐릭터 종합 정보
export async function getAllInfo(charId, serverId) {
  const result = await Promise.all([
    getStatus(charId, serverId),
    getEquipment(charId, serverId),
    getAvatar(charId, serverId),
    getCreature(charId, serverId),
    getFlag(charId, serverId),
    getTalisman(charId, serverId),
    getSkillStyles(charId, serverId),
    getBuffEquipment(charId, serverId),
    getBuffAvatar(charId, serverId),
    getBuffCreature(charId, serverId),
  ]);
  return result;
}

export function getEquipInfo(equipment) {
  const weapon = equipment.filter((item) => item.slotName === '무기')[0];
  const title = equipment.filter((item) => item.slotName === '칭호')[0];
  const jacket = equipment.filter((item) => item.slotName === '상의')[0];
  const shoulder = equipment.filter((item) => item.slotName === '머리어깨')[0];
  const pants = equipment.filter((item) => item.slotName === '하의')[0];
  const shoes = equipment.filter((item) => item.slotName === '신발')[0];
  const waist = equipment.filter((item) => item.slotName === '허리')[0];
  const amulet = equipment.filter((item) => item.slotName === '목걸이')[0];
  const wrist = equipment.filter((item) => item.slotName === '팔찌')[0];
  const ring = equipment.filter((item) => item.slotName === '반지')[0];
  const support = equipment.filter((item) => item.slotName === '보조장비')[0];
  const magicstone = equipment.filter((item) => item.slotName === '마법석')[0];
  const earring = equipment.filter((item) => item.slotName === '귀걸이')[0];
  return [weapon, title, jacket, shoulder, pants, shoes, waist, amulet, wrist, ring, support, magicstone, earring];
}
