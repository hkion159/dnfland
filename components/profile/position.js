const Position = ({ position }) => {
  const color = {
    D: 'text-danger',
    S: 'text-primary',
    B: 'text-success',
    노전직: 'text-warning',
  };
  return <p className={`${color[position] ?? 'text-dark'} d-inline-block`}>{position}</p>;
};

export default Position;
