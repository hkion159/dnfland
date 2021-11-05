const UserTag = ({ authorId, postAuthorId, comment }) => {
  return (
    <span>
      {authorId === 1 && <span className="ms-2 badge bg-success">관리자</span>}
      {comment && authorId === postAuthorId && <span className="ms-2 badge bg-primary">작성자</span>}
    </span>
  );
};

export default UserTag;
