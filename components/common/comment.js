import Time from './time';
import CommentForm from './commentform';

const Comment = ({
  comment,
  className,
  session,
  onRecommentClick,
  onCommentRemove,
  isRecomment,
  index,
  onRecomment,
  recommentRef,
  recomment,
}) => {
  const { author, authorId, content, date, id } = comment;
  return (
    <div
      className={`py-2 px-3 d-flex ` + className}
      style={
        authorId === session?.id
          ? { backgroundColor: '#F8F9FB', borderTop: '1px solid #D3D4D6' }
          : { borderTop: '1px solid #D3D4D6' }
      }
    >
      <div className={recomment && 'p-4 d-flex align-items-center'}>
        {recomment && <i className="bi bi-arrow-return-right"></i>}
      </div>
      <div className="flex-fill">
        <p className="d-inline-block">
          <b>{author?.name}</b>
        </p>
        {authorId === authorId && <span className="ms-2 badge bg-primary">작성자</span>}
        <p style={{ whiteSpace: 'pre-line' }}>{content}</p>
        <div>
          <Time datetime={date} />
          {recomment && authorId !== session?.id && session?.id !== 1 ? null : (
            <span>
              <span className="text-secondary mx-2">&sdot;</span>
              <span>
                {!recomment && (
                  <a className="link-secondary me-2" onClick={() => onRecommentClick(index)}>
                    {isRecomment[index] ? '답글 닫기' : '답글 쓰기'}
                  </a>
                )}
              </span>
              {authorId === session?.id || session?.id === 1 ? (
                <a className="link-danger" onClick={onCommentRemove}>
                  삭제
                </a>
              ) : null}
            </span>
          )}
        </div>
        {!recomment && isRecomment[index] && (
          <div className="p-3 pb-2">
            <CommentForm
              recomment
              from={session?.user.name}
              to={author.name}
              commentRef={recommentRef}
              onClick={() => onRecomment(id)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
