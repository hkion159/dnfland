import { useCallback } from 'react';

const ItemType = ({ itemRarity = '커먼', itemName, fontSize, reinforce, className }) => {
  const style = useCallback(() => {
    const fontStyle = { fontSize: fontSize || '16px' };
    switch (itemRarity) {
      case '에픽':
        return { ...fontStyle, color: '#E8DC56' };
      case '레전더리':
        return { ...fontStyle, color: '#CB8140' };
      case '크로니클':
        return { ...fontStyle, color: '#D47976' };
      case '유니크':
        return { ...fontStyle, color: '#D71AD9' };
      case '레어':
        return { ...fontStyle, color: '#A177CD' };
      case '언커먼':
        return { ...fontStyle, color: '#88C8D4' };
      case '커먼':
        return { ...fontStyle, color: '#000' }; // 흰색으로 하면 배경때문에 안 보임
      case '마법부여':
        return { ...fontStyle, color: '#93DBB5' };
      case '능력치':
        return { ...fontStyle, color: '#5E9166' };
      case '모험단':
        return { ...fontStyle, color: '#8AC98E' };
      default:
        return {};
    }
  }, [fontSize, itemRarity]);
  return (
    <p style={style()} className={className}>
      {reinforce && `+${reinforce} `}
      {itemName}
    </p>
  );
};

export default ItemType;
