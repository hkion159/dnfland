import ItemType from '../itemtype';
import { ItemImg } from '../../../lib/neople';

const Buff = ({ equipment: { skillInfo, equipment }, avatar, creature }) => {
  return (
    <div className="container text-start">
      <div className="row">
        <div className="col text-center">
          <h5>{skillInfo?.name}</h5>
          <p>
            {'Lv. '}
            {skillInfo?.option.level}
          </p>
          <p style={{ whiteSpace: 'pre-line' }}>{skillInfo?.option.desc}</p>
        </div>
      </div>
      {equipment?.map((item, index) => (
        <div className="row" key={index}>
          <div className="col d-flex p-3 align-items-center">
            <div>{ItemImg(item.itemId)}</div>
            <div className="ms-3">
              <ItemType itemRarity={item.itemRarity} itemName={item.itemName} fontSize="20px" />
            </div>
          </div>
          <hr className="m-0" />
        </div>
      ))}
      {avatar?.map((item, index) => (
        <div className="row" key={index}>
          <div className="col d-flex p-3 align-items-center">
            <div>{ItemImg(item.itemId)}</div>
            <div className="ms-3">
              <ItemType itemRarity={item.itemRarity} itemName={item.itemName} fontSize="20px" />
            </div>
          </div>
          <hr className="m-0" />
        </div>
      ))}
      <div className="row">
        <div className="col d-flex p-3 align-items-center">
          <div>{ItemImg(creature[0].itemId)}</div>
          <div className="ms-3">
            <ItemType itemRarity={creature[0].itemRarity} itemName={creature[0].itemName} fontSize="20px" />
          </div>
        </div>
        <hr className="m-0" />
      </div>
    </div>
  );
};

export default Buff;
