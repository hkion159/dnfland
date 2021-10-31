import searchStyle from '../../styles/searchbox.module.css';
import Thumbnail from '../profile/thumbnail';

function SearchBox({ characters, name }) {
  const charsArr = JSON.parse(characters);
  console.log(charsArr);
  return (
    <div>
      <div className="p-4 border-bottom border-secondary">
        <h5 className="text-center m-0">
          {charsArr.length
            ? `닉네임 '${name}' 검색 결과는 ${charsArr.length}캐릭터입니다.`
            : `닉네임 '${name}' 검색 결과가 없습니다.`}
        </h5>
      </div>
      <div className={`${searchStyle.result}`}>
        {charsArr.map((character, index) => (
          <Thumbnail character={character} key={index} />
        ))}
      </div>
    </div>
  );
}
export default SearchBox;
