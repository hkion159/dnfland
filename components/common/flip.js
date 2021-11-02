import FlipNumbers from 'react-flip-numbers';

const Flip = ({ numbers, color }) => {
  return <FlipNumbers height={20} width={10} color={color} play numbers={numbers.toString()} />;
};

export default Flip;
