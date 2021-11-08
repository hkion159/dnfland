const MenuBtn = ({ index, title, onChangeMenu, menu = [] }) => {
  return (
    <button
      className={`list-group-item list-group-item-action ${menu[index] ? 'active' : ''}`}
      onClick={() => onChangeMenu(index)}
    >
      {title}
    </button>
  );
};

export default MenuBtn;
