import { ItemImg } from '../../../lib/neople';
import ItemType from '../itemtype';

const AvatarCreature = ({ avatar, creature }) => {
  return (
    <div className="container text-start">
      {avatar?.map((item, index) => (
        <div className="row" key={index}>
          <div className="col d-flex p-3 align-items-center">
            <div>{ItemImg(item.itemId)}</div>
            <div className="ms-3">
              <ItemType itemRarity={item.itemRarity} itemName={item.itemName} fontSize="20px" />
              <p>{item.optionAbility}</p>
            </div>
            <div className="ms-auto">
              <ItemType itemRarity={item.emblems[0]?.itemRarity} itemName={item.emblems[0]?.itemName} />
              <ItemType itemRarity={item.emblems[1]?.itemRarity} itemName={item.emblems[1]?.itemName} />
              <ItemType itemRarity={item.emblems[2]?.itemRarity} itemName={item.emblems[2]?.itemName} />
            </div>
            <div className="ms-3">{item.clone.itemId && ItemImg(item.clone.itemId)}</div>
          </div>
          <hr className="m-0" />
        </div>
      ))}
      <div className="row">
        <div className="col d-flex p-3 align-items-center">
          <div>{ItemImg(creature.itemId)}</div>
          <div className="ms-3">
            <ItemType itemRarity={creature.itemRarity} itemName={creature.itemName} fontSize="20px" />
          </div>
          <div className="ms-auto">
            <ItemType itemRarity={creature.artifact[0]?.itemRarity} itemName={creature.artifact[0]?.itemName} />
            <ItemType itemRarity={creature.artifact[1]?.itemRarity} itemName={creature.artifact[1]?.itemName} />
            <ItemType itemRarity={creature.artifact[2]?.itemRarity} itemName={creature.artifact[2]?.itemName} />
          </div>
          <div className="ms-3">{creature.clone.itemId && ItemImg(creature.clone.itemId)}</div>
        </div>
        <hr className="m-0" />
      </div>
    </div>
  );
};

export default AvatarCreature;
