import Layout from '../components/layout/layout';
import Head from 'next/head';
import SearchBox from '../components/box/searchbox';
import { useRouter } from 'next/router';
import { getCharacters, getServerList } from './api/neople';
import { getPosition } from './api/jobs';
import wrapper from '../modules/index';
import { useEffect } from 'react';

function Search({ characters, searchKey, error }) {
  const router = useRouter();
  useEffect(() => {
    if (error) {
      alert('응애!!');
      router.push('/');
    }
  }, [error, router]);
  return (
    <>
      <Layout>
        <Head>
          <title>{`${searchKey} - 검색결과`}</title>
        </Head>
        <SearchBox characters={characters} name={searchKey} />
      </Layout>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const charName = await ctx.query.charactername;
    if (!charName) {
      return { props: { error: true } };
    }
    const settings = await store.getState().search;
    const servers = getServerList();
    const charsArr = await getCharacters(charName, settings);
    const chars = [];
    // 배열 내 객체에 대해 비동기 실행을 위한 부분
    // 캐릭터 객체에 서버 이름과 포지션 추가
    async function process() {
      for (const character of charsArr) {
        const serverName = servers.filter(
          (server) => server['serverId'] === character['serverId'],
        )[0]['serverName'];
        const position = await getPosition(character);
        const newCharacter = await {
          ...character,
          serverName: serverName,
          position: position,
        };
        chars.push(newCharacter);
      }
    }
    await process();
    const charsStr = JSON.stringify(chars);
    return {
      props: {
        characters: charsStr,
        searchKey: charName,
      },
    };
  },
);

export default Search;
