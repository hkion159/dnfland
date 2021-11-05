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
import Toast from '../../../components/common/toast';
import UserTag from '../../../components/common/usertag';
import Head from 'next/head';

const PostViewer = dynamic(() => import('../../../components/common/postviewer'), {
  ssr: false,
});

const Board = ({ postStr, prevPostsStr, nextPostsStr }) => {
  const post = JSON.parse(postStr);
  const prevPosts = JSON.parse(prevPostsStr);
  const nextPosts = JSON.parse(nextPostsStr);
  const { type, authorId, author, markdown, title, postDate, reviseDate, comments, like, hate } = post;
  const [session, loading] = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [likes, setLikes] = useState(like);
  const [hates, setHates] = useState(hate);
  const [isLike, setIsLike] = useState(false);
  const [isHate, setIsHate] = useState(false);
  const [rtComments, setRtComments] = useState(comments);
  const commentRef = useRef(null);
  const [willInitialize, setWillInitialize] = useState(false);
  const [isRecomment, setIsRecomment] = useState([]);
  const recommentRef = useRef(null);
  const removeBtnRef = useRef(null);
  const [removeId, setRemoveId] = useState(0);
  const [removeConfirm, setRemoveConfirm] = useState(false);
  const getComments = useCallback(async () => {
    const res = await axios.get(`/api/post/${id}`);
    const comments = await res.data.comments;
    setRtComments(comments);
  }, [id]);
  const initializePost = useCallback(() => {
    setLikes(like);
    setHates(hate);
    const likeFind = post.likedUser.filter((user) => user.id === session?.id);
    if (likeFind.length > 0) setIsLike(true);
    else setIsLike(false);
    const hateFind = post.hatedUser.filter((user) => user.id === session?.id);
    if (hateFind.length > 0) setIsHate(true);
    else setIsHate(false);
    getComments();
  }, [getComments, hate, like, post.hatedUser, post.likedUser, session?.id]);
  useEffect(() => {
    setWillInitialize(true);
  }, [id]);
  useEffect(() => {
    if (willInitialize) {
      initializePost();
      setWillInitialize(false);
    }
  }, [initializePost, willInitialize]);
  useEffect(() => {
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
        alert('대댓글이 달린 댓글은 삭제할 수 없습니다!');
      }
      setRemoveId(0);
      setRemoveConfirm(false);
    }
  }, [getComments, id, removeConfirm, removeId, rtComments]);
  const onRemove = useCallback(() => {
    removeBtnRef.current.target = '게시글';
    removeBtnRef.current.click();
    axios.delete(`/api/post/${id}`);
    router.push('/board');
  }, [id, router]);
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
      setLikes((likes) => likes - 1);
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
        setHates((hates) => hates - 1);
      }
      await axios.put(`/api/post/${id}`, {
        like: { increment: 1 },
        likedUser: {
          connect: {
            id: session?.id,
          },
        },
      });
      setLikes((likes) => likes + 1);
    }
  }, [id, isHate, isLike, session]);
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
      setHates((hates) => hates - 1);
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
        setLikes((likes) => likes - 1);
      }
      await axios.put(`/api/post/${id}`, {
        hate: { increment: 1 },
        hatedUser: {
          connect: {
            id: session?.id,
          },
        },
      });
      setHates((hates) => hates + 1);
    }
  }, [id, isHate, isLike, session]);

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
      setWillInitialize(true);
    },
    [id, session],
  );
  const onCommentRemove = useCallback((commentId) => {
    removeBtnRef.current.target = '댓글';
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
      setWillInitialize(true);
    },
    [id, session?.id],
  );
  const [referenceElement, setReferenceElement] = useState(null);
  const [referenceElementSecond, setReferenceElementSecond] = useState(null);
  const [popperFirst, setPopperFirst] = useState(false);
  const [popperSecond, setPopperSecond] = useState(false);
  console.log(markdown);
  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <div>
        <div className="d-flex my-4">
          <span className="align-self-center">
            {type === 'notice' ? (
              <Link href="/board/notice">
                <a className="link-dark">공지사항</a>
              </Link>
            ) : (
              <Link href="/board">
                <a className="link-dark">종합 게시판</a>
              </Link>
            )}
          </span>
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
          <a className="d-inline-block link-secondary">{author.name}</a>
        </Link>
        <UserTag authorId={authorId} />
        <span className="ms-1 text-secondary">&sdot;</span>
        <Time className="ms-1" datetime={postDate} />
        {reviseDate && <p>{`마지막 수정 ${getDateDiff(reviseDate)}`}</p>}
        <hr />
        <span className="text-break">{!willInitialize && <PostViewer initialValue={markdown} />}</span>
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
                    postAuthorId={authorId}
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
                      postAuthorId={authorId}
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
                        postAuthorId={authorId}
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
        <table className="table table-hover my-4">
          <tbody>
            {prevPosts.map(({ id, title, author, postDate, comments }, index) => (
              <tr key={id} style={index === 0 ? { borderTop: '1px solid #e0e0e0' } : {}}>
                <td style={{ width: '5%', minWidth: '50px' }}>{id}</td>
                <td
                  className="ps-4"
                  style={{
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    maxWidth: '0',
                  }}
                >
                  <Link href={`/board/post/${id}`}>
                    <a>
                      {title}
                      <span className="text-secondary">{comments?.length ? ` (${comments.length})` : null}</span>
                    </a>
                  </Link>
                </td>
                <td style={{ width: '15%', minWidth: '130px' }}>{author.name}</td>
                <td className="text-end pe-4 text-secondary" style={{ width: '10%', minWidth: '100px' }}>
                  {getDateDiff(postDate)}
                </td>
              </tr>
            ))}
            <tr>
              <td>{id}</td>
              <td
                className="ps-4"
                style={{
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  maxWidth: '0',
                }}
              >
                <span className="fw-bold text-decoration-underline">{title}</span>
                <span className="text-secondary">{comments?.length ? ` (${comments.length})` : null}</span>
              </td>
              <td>{author.name}</td>
              <td className="text-end pe-4 text-secondary">{getDateDiff(postDate)}</td>
            </tr>
            {nextPosts.map(({ id, title, author, postDate, comments }, index) => (
              <tr key={id} style={index === 0 ? { borderTop: '1px solid #e0e0e0' } : {}}>
                <td style={{ width: '5%', minWidth: '50px' }}>{id}</td>
                <td
                  className="ps-4"
                  style={{
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    maxWidth: '0',
                  }}
                >
                  <Link href={`/board/post/${id}`}>
                    <a>
                      {title}
                      <span className="text-secondary">{comments?.length ? ` (${comments.length})` : null}</span>
                    </a>
                  </Link>
                </td>
                <td style={{ width: '15%', minWidth: '130px' }}>{author.name}</td>
                <td className="text-end pe-4 text-secondary" style={{ width: '10%', minWidth: '100px' }}>
                  {getDateDiff(postDate)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex mb-4">
          <button className="btn btn-outline-primary ms-auto">목록</button>
        </div>
      </div>
      {!session && popperFirst && <Popper refEl={referenceElement} />}
      {!session && popperSecond && <Popper refEl={referenceElementSecond} />}
      <Modal btnRef={removeBtnRef} target={''} onConfirm={onRemoveConfirm} />
      {/* <Toast /> */}
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const id = Number(ctx.query.id);
  const post = await prisma.post.findUnique({
    where: {
      id: id,
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
  const previousPosts = await prisma.post.findMany({
    take: -2,
    skip: 1,
    cursor: {
      id: id,
    },
    where: {
      type: post.type,
    },
    include: {
      author: true,
      comments: true,
    },
  });
  const nextPosts = await prisma.post.findMany({
    take: 2,
    skip: 1,
    cursor: {
      id: id,
    },
    where: {
      type: post.type,
    },
    include: {
      author: true,
      comments: true,
    },
  });
  const postStr = JSON.stringify(post);
  const prevPostsStr = JSON.stringify(previousPosts);
  const nextPostsStr = JSON.stringify(nextPosts);
  return {
    props: {
      postStr: postStr,
      prevPostsStr: prevPostsStr,
      nextPostsStr: nextPostsStr,
    },
  };
});

export default Board;
