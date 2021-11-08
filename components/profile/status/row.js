const Row = ({ rowNum, status, half, jump = 1 }) => {
  return (
    <div className="row px-3">
      <div className={`${half ? 'col' : 'col'} d-flex bg-light border mx-2 my-1 p-0`}>
        <div className="border-end" style={{ flex: '1' }}>
          {status[rowNum * 2].name}
        </div>
        <div className="" style={{ flex: '1' }}>
          {status[rowNum * 2].value}
        </div>
      </div>
      {half ? (
        <div className="col m-2 p-0"></div>
      ) : (
        <div className="col d-flex bg-light border mx-2 my-1 p-0">
          <div className="border-end" style={{ flex: '1' }}>
            {status[rowNum * 2 + jump].name}
          </div>
          <div className="" style={{ flex: '1' }}>
            {status[rowNum * 2 + jump].value}
          </div>
        </div>
      )}
    </div>
  );
};

export default Row;
