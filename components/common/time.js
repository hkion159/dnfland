import { useCallback, useState } from 'react';
import { getDateDiff, getStdDateTime } from '../../lib/date';

const Time = ({ datetime, className }) => {
  const [mouseOver, setMouseOver] = useState(false);
  const onMouseOver = useCallback((e) => {
    setMouseOver(true);
  }, []);
  const onMouseLeave = useCallback((e) => {
    setMouseOver(false);
  }, []);
  return (
    <p className={'d-inline-block text-secondary ' + className} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
      {mouseOver ? getStdDateTime(datetime) : getDateDiff(datetime)}
    </p>
  );
};

export default Time;
