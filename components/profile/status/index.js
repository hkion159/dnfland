import Row from './row';

const Status = ({ status }) => {
  return (
    <div className="container py-3">
      <Row rowNum={0} status={status} />
      <Row rowNum={1} status={status} />
      <hr />
      <Row rowNum={2} status={status} />
      <Row rowNum={3} status={status} />
      <Row rowNum={4} status={status} />
      <Row rowNum={5} status={status} />
      <Row rowNum={6} status={status} half />
      <hr />
      <Row rowNum={6.5} status={status} />
      <Row rowNum={7.5} status={status} half />
      <hr />
      <Row rowNum={8.5} status={status} />
      <Row rowNum={9.5} status={status} />
      <hr />
      <Row rowNum={11.5} status={status} jump={2} />
      <Row rowNum={12.5} status={status} jump={2} />
    </div>
  );
};

export default Status;
