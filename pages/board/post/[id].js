import Layout from '../../../components/layout/layout';
import prisma from '../../../lib/prisma';
import wrapper from '../../../modules/index';
import dynamic from 'next/dynamic';
import { getDateDiff } from '../../../lib/date';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Flip from '../../../components/common/flip';
import Popper from '../../../components/common/popper';
import Time from '../../../components/common/time';
import CommentForm from '../../../components/common/commentform';
import Comment from '../../../components/common/comment';
import Modal from '../../../components/common/modal';

const PostViewer = dynamic(() => import('../../../components/common/postviewer'), {
  ssr: false,
});

const Board = ({ post: strPost }) => {
  const post = JSON.parse(strPost);
  const { type, authorId, author, markdown, title, postDate, reviseDate, comments, like, hate } = post;
  const [rtComments, setRtComments] = useState(comments);
  const [session, loading] = useSession();
  const router = useRouter();
  const { id } = router.query;
  const onRemove = useCallback(() => {
    axios.delete(`/api/post/${id}`);
    router.push('/board');
  }, [id, router]);
  const [likes, setLikes] = useState(like);
  const [hates, setHates] = useState(hate);
  const [isLike, setIsLike] = useState(false);
  const [isHate, setIsHate] = useState(false);
  const onLike = useCallback(async () => {
    if (!session) return;
    if (isLike) {
      setIsLike(false);
      await axios.put(`/api/post/${id}`, {
        like: { decrement: 1 },
        likedUser: {
          disconnect: {
            id: session?.id,
          },
        },
      });
      setLikes(likes - 1);
    } else {
      setIsLike(true);
      if (isHate) {
        setIsHate(false);
        await axios.put(`/api/post/${id}`, {
          hate: { decrement: 1 },
          hatedUser: {
            disconnect: {
              id: session?.id,
            },
          },
        });
        setHates(hates - 1);
      }
      await axios.put(`/api/post/${id}`, {
        like: { increment: 1 },
        likedUser: {
          connect: {
            id: session?.id,
          },
        },
      });
      setLikes(likes + 1);
    }
  }, [hates, id, isHate, isLike, likes, session]);
  const onHate = useCallback(async () => {
    if (!session) return;
    if (isHate) {
      setIsHate(false);
      await axios.put(`/api/post/${id}`, {
        hate: { decrement: 1 },
        hatedUser: {
          disconnect: {
            id: session?.id,
          },
        },
      });
      setHates(hates - 1);
    } else {
      setIsHate(true);
      if (isLike) {
        setIsLike(false);
        await axios.put(`/api/post/${id}`, {
          like: { decrement: 1 },
          likedUser: {
            disconnect: {
              id: session?.id,
            },
          },
        });
        setLikes(likes - 1);
      }
      await axios.put(`/api/post/${id}`, {
        hate: { increment: 1 },
        hatedUser: {
          connect: {
            id: session?.id,
          },
        },
      });
      setHates(hates + 1);
    }
  }, [hates, id, isHate, isLike, likes, session]);
  const getComments = useCallback(async () => {
    const res = await axios.get(`/api/post/${id}`);
    const comments = await res.data.comments;
    setRtComments(comments);
  }, [id]);
  const commentRef = useRef(null);
  const onComment = useCallback(
    async (e) => {
      e.preventDefault();
      if (!session || commentRef.current.value === '') return;
      await axios.put(`/api/post/${id}`, {
        comments: {
          create: {
            content: commentRef.current.value,
            author: {
              connect: {
                id: session?.id,
              },
            },
          },
        },
      });
      commentRef.current.value = '';
      await getComments();
    },
    [getComments, id, session],
  );
  const [isRecomment, setIsRecomment] = useState([]);
  const recommentRef = useRef(null);
  const removeBtnRef = useRef(null);
  const [removeId, setRemoveId] = useState(0);
  const [removeConfirm, setRemoveConfirm] = useState(false);
  const onCommentRemove = useCallback((commentId) => {
    removeBtnRef.current.click();
    setRemoveId(commentId);
  }, []);
  const onRemoveConfirm = useCallback(() => {
    setRemoveConfirm(true);
  }, []);
  const onRecommentClick = useCallback(
    (index) => {
      const tmp = [];
      tmp[index] = !isRecomment[index];
      setIsRecomment(tmp);
    },
    [isRecomment],
  );
  const onRecomment = useCallback(
    async (targetId) => {
      if (recommentRef.current.value === '') return;
      await axios.put(`/api/post/${id}`, {
        comments: {
          create: {
            content: recommentRef.current.value,
            author: {
              connect: {
                id: session?.id,
              },
            },
            target: {
              connect: {
                id: targetId,
              },
            },
          },
        },
      });
      recommentRef.current.value = '';
      setIsRecomment([]);
      await getComments();
    },
    [getComments, id, session?.id],
  );
  useEffect(() => {
    const likeFind = post.likedUser.filter((user) => user.id === session?.id);
    if (likeFind.length > 0) setIsLike(true);
    const hateFind = post.hatedUser.filter((user) => user.id === session?.id);
    if (hateFind.length > 0) setIsHate(true);
    setInterval(async () => {
      const res = await axios.get(`/api/post/${id}`);
      const post = await res.data;
      setLikes(post?.like);
      setHates(post?.hate);
      await getComments();
    }, 10000);
    if (removeId !== 0 && removeConfirm) {
      const comment = rtComments.filter((comment) => comment.id === removeId)[0];
      if (comment.tail.length === 0) {
        axios.put(`/api/post/${id}`, {
          comments: {
            delete: {
              id: removeId,
            },
          },
        });
      } else {
      }
      setRemoveId(0);
      setRemoveConfirm(false);
      getComments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, removeConfirm, removeId, session?.id]);
  const [referenceElement, setReferenceElement] = useState(null);
  const [referenceElementSecond, setReferenceElementSecond] = useState(null);
  const [popperFirst, setPopperFirst] = useState(false);
  const [popperSecond, setPopperSecond] = useState(false);
  return (
    <Layout>
      <div className="px-4">
        <div className="d-flex my-4">
          <p className="">{type === 'notice' ? '공지사항' : '일반'}</p>
          <div className="ms-auto">
            {session?.id === authorId && <button className="btn btn-outline-info">수정</button>}
            {(session?.id === id || session?.id === 1) && (
              <button className="btn btn-outline-danger ms-2" onClick={onRemove}>
                삭제
              </button>
            )}
            <button className="btn btn-outline-primary ms-2">목록</button>
          </div>
        </div>
        <h3 className="d-block">{title}</h3>
        <Link href="/">
          <a className="me-1 d-inline-block link-secondary">{author.name}</a>
        </Link>
        <span className="text-secondary">&sdot;</span>
        <Time className="ms-1" datetime={postDate} />
        {reviseDate && <p>{`마지막 수정 ${getDateDiff(reviseDate)}`}</p>}
        <hr />
        <PostViewer initialValue={markdown} />
        <div className="d-flex justify-content-center text-center">
          <div className="d-flex flex-column text-primary mx-2">
            <a
              onClick={onLike}
              style={!session ? { cursor: 'default' } : {}}
              ref={setReferenceElement}
              onMouseOver={() => {
                if (!session) setPopperFirst(true);
              }}
              onMouseLeave={() => {
                if (!session) setPopperFirst(false);
              }}
            >
              {isLike ? (
                <i className="bi bi-hand-thumbs-up-fill fs-3"></i>
              ) : (
                <i className="bi bi-hand-thumbs-up fs-3"></i>
              )}
            </a>
            <Flip numbers={likes} color="#0d6efd" />
          </div>
          <div className="d-flex flex-column text-danger mx-2">
            <a
              onClick={onHate}
              style={!session ? { cursor: 'default' } : {}}
              ref={setReferenceElementSecond}
              onMouseOver={() => {
                if (!session) setPopperSecond(true);
              }}
              onMouseLeave={() => {
                if (!session) setPopperSecond(false);
              }}
            >
              {isHate ? (
                <i className="bi bi-hand-thumbs-down-fill fs-3"></i>
              ) : (
                <i className="bi bi-hand-thumbs-down fs-3"></i>
              )}
            </a>
            <Flip numbers={hates} color="#dc3545" />
          </div>
        </div>
        <hr />
        <div className="mt-4" style={{ borderBottom: '1px solid #D3D4D6' }}>
          <h5 className="mb-4">{rtComments?.length}개의 댓글</h5>
          {rtComments?.map((comment, index) => {
            if (!comment.target) {
              if (comment.tail === [])
                return (
                  <Comment
                    key={index}
                    comment={comment}
                    session={session}
                    rtComments={rtComments}
                    index={index}
                    onRecommentClick={onRecommentClick}
                    onCommentRemove={() => onCommentRemove(comment.id)}
                    isRecomment={isRecomment}
                    onRecomment={onRecomment}
                  />
                );
              else
                return (
                  <div key={index}>
                    <Comment
                      comment={comment}
                      session={session}
                      index={index}
                      onRecommentClick={onRecommentClick}
                      onCommentRemove={() => onCommentRemove(comment.id)}
                      isRecomment={isRecomment}
                      onRecomment={onRecomment}
                      recommentRef={recommentRef}
                    />
                    {comment.tail.map((recomment, index) => (
                      <Comment
                        key={index}
                        comment={recomment}
                        session={session}
                        index={index}
                        onCommentRemove={() => onCommentRemove(recomment.id)}
                        recomment
                      />
                    ))}
                  </div>
                );
            }
          })}
        </div>
        <CommentForm commentRef={commentRef} onClick={onComment} className="mt-4" />
        <hr />
        {!session && popperFirst && <Popper refEl={referenceElement} />}
        {!session && popperSecond && <Popper refEl={referenceElementSecond} />}
      </div>
      <Modal btnRef={removeBtnRef} target={'댓글'} onConfirm={onRemoveConfirm} />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(ctx.query.id),
    },
    include: {
      author: true,
      comments: {
        include: {
          author: true,
          target: true,
          tail: {
            include: {
              author: true,
            },
          },
        },
      },
      likedUser: true,
      hatedUser: true,
    },
  });
  const data = JSON.stringify(post);
  return {
    props: {
      post: data,
    },
  };
});

export default Board;
