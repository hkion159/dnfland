import { useSession } from 'next-auth/client';

const CommentForm = ({ onClick, commentRef, className, recomment, from, to }) => {
  const [session] = useSession();
  return (
    <div className={'input-group ' + className}>
      {recomment ? (
        <span className="input-group-text d-flex p-0 flex-column">
          <div className="d-flex flex-fill px-2 align-items-center" style={{ borderBottom: '1px solid #D3D4D6' }}>
            {to}
          </div>
          <div className="d-flex flex-fill px-2 align-items-center">{from}</div>
        </span>
      ) : (
        <span className="input-group-text">{session?.user.name}</span>
      )}
      <textarea
        className="form-control"
        aria-label="With textarea"
        required
        placeholder={!session ? '로그인 후 작성가능합니다!' : ''}
        disabled={!session}
        ref={commentRef}
      ></textarea>
      <button className="btn btn-outline-success" id="button-addon2" disabled={!session} onClick={onClick}>
        작성
      </button>
    </div>
  );
};

export default CommentForm;
