import st from '../../styles/searchbox.module.css';
import Thumbnail from '../profile/thumbnail';

function SearchBox({ characters, name, settings: settingsStr }) {
  const charsArr = JSON.parse(characters);
  const settings = JSON.parse(settingsStr);
  console.log(charsArr);
  return (
    <div>
      <div className="p-4 border-bottom border-secondary text-center">
        <h5 className="mb-0">
          {charsArr.length
            ? `${settings.scope === 'character' ? '닉네임' : '모험단'} '${name}' 검색 결과는 ${charsArr.length}${
                settings.scope === 'character?' ? '캐릭터' : '개'
              }입니다.`
            : `${settings.scope === 'character' ? '닉네임' : '모험단'} '${name}' 검색 결과가 없습니다.`}
        </h5>
        {charsArr.length === 200 && <p className="mt-1">최대 동시 검색은 200캐릭터까지만 가능합니다.</p>}
        {settings.scope === 'adventure' && charsArr.length === 0 && (
          <p className="mt-1">캐릭터를 모험단에 등록해야 모험단 검색 결과에 나타납니다.</p>
        )}
      </div>
      <div className={`${st.result}`}>
        {charsArr.map((character, index) => (
          <Thumbnail character={character} key={index} />
        ))}
      </div>
    </div>
  );
}
export default SearchBox;
