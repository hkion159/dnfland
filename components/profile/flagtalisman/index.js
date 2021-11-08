import { ItemImg } from '../../../lib/neople';
import ItemType from '../itemtype';

const FlagTalisman = ({ flag, talisman }) => {
  return (
    <div className="container text-start">
      <div className="row">
        <div className="col d-flex p-3 align-items-center">
          <div>{ItemImg(flag.itemId)}</div>
          <div className="ms-3">
            <ItemType
              itemRarity={flag.itemRarity}
              itemName={flag.itemName}
              fontSize="20px"
              reinforce={flag.reinforce}
            />
            <p>{flag.itemAbility}</p>
          </div>
          <div className="ms-auto">
            <ItemType itemRarity={flag.gems[0]?.itemRarity} itemName={flag.gems[0]?.itemName} />
            <ItemType itemRarity={flag.gems[1]?.itemRarity} itemName={flag.gems[1]?.itemName} />
            <ItemType itemRarity={flag.gems[2]?.itemRarity} itemName={flag.gems[2]?.itemName} />
            <ItemType itemRarity={flag.gems[3]?.itemRarity} itemName={flag.gems[3]?.itemName} />
          </div>
        </div>
        <hr />
      </div>
      {talisman.map((talisman, index) => (
        <div className="row" key={index}>
          <div className="col d-flex p-3 align-items-center">
            <div>{ItemImg(talisman.talisman.itemId)}</div>
            <div className="ms-3">
              <ItemType
                itemRarity={talisman.talisman.itemRarity}
                itemName={talisman.talisman.itemName}
                fontSize="20px"
              />
            </div>
            <div className="ms-auto">
              {talisman.runes.map((rune, index) => (
                <div key={index}>
                  <ItemType itemName={rune.itemName} />
                </div>
              ))}
            </div>
            <div className="ms-2">
              {talisman.runes.map((rune, index) => (
                <div key={index}>{ItemImg(rune.itemId)}</div>
              ))}
            </div>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default FlagTalisman;
