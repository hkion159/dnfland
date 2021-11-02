import { usePopper } from 'react-popper';
import st from '../../styles/post.module.css';
import { useState } from 'react';

const Popper = ({ refEl }) => {
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(refEl, popperElement, {
    placement: 'top',
    modifiers: [
      { name: 'arrow', options: { element: arrowElement } },
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  });
  return (
    <div ref={setPopperElement} style={styles.popper} className={`${st.pop} shadow-sm`} {...attributes.popper}>
      로그인 후 가능합니다!
      <div ref={setArrowElement} style={styles.arrow} className={st.arrow} />
    </div>
  );
};

export default Popper;
