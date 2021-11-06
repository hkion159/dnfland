const Modal = ({ target, btnRef, onConfirm }) => {
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#commentDeleteModal"
        style={{ display: 'none' }}
        ref={btnRef}
        target=""
      >
        {target} 삭제 버튼
      </button>

      <div
        className="modal fade"
        id="commentDeleteModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                알림
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">정말 {btnRef.current?.target}을 삭제하시겠습니까?</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={onConfirm}>
                삭제
              </button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
