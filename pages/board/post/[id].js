import Layout from '../../../components/layout/layout';
import prisma from '../../../lib/prisma';
import wrapper from '../../../modules/index';
import dynamic from 'next/dynamic';
import { getDateDiff } from '../../../lib/date';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Flip from '../../../components/common/flip';
import { usePopper } from 'react-popper';
import st from '../../../styles/post.module.css';

const PostViewer = dynamic(() => import('../../../components/common/postviewer'), {
  ssr: false,
});

const Board = ({ post: strPost }) => {
  const post = JSON.parse(strPost);
  const { type, authorId, author, markdown, title, postDate, reviseDate, comments, like, hate } = post;
  const [session, loading] = useSession();
  const router = useRouter();
  const { id } = router.query;
  const onRemove = useCallback(() => {
    const res = axios.delete(`/api/post/${id}`);
    router.push('/board');
  }, [id, router]);
  const [likes, setLikes] = useState(like);
  const [hates, setHates] = useState(hate);
  useEffect(() => {
    setInterval(async () => {
      const res = await axios.get(`/api/post/${id}`);
      const post = await res.data;
      setLikes(post?.like);
      setHates(post?.hate);
    }, 10000);
  }, [id]);
  const onLike = useCallback(async () => {
    setLikes(likes + 1);
    await axios.put(`/api/post/${id}`, { like: likes });
  }, [id, likes]);
  const onHate = useCallback(() => {}, []);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'top',
    modifiers: [
      { name: 'arrow', options: { element: arrowElement } },
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  });
  const [referenceElementSecond, setReferenceElementSecond] = useState(null);
  const [popperElementSecond, setPopperElementSecond] = useState(null);
  const [arrowElementSecond, setArrowElementSecond] = useState(null);
  const { stylesSecond, attributesSecond } = usePopper(referenceElementSecond, popperElementSecond, {
    placement: 'top',
    modifiers: [
      { name: 'arrow', options: { element: arrowElementSecond } },
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  });
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
          <a className="me-1 d-inline-block text-secondary">{author.name}</a>
        </Link>
        <span className="text-secondary">&sdot;</span>
        <p className="ms-1 d-inline-block text-secondary">{getDateDiff(postDate)}</p>
        {reviseDate && <p>{`마지막 수정 ${getDateDiff(reviseDate)}`}</p>}
        <hr />
        <PostViewer initialValue={markdown} />
        <div className="d-flex justify-content-center text-center">
          <div className="d-flex flex-column text-primary mx-2">
            <a onClick={onLike} style={!session ? { cursor: 'default' } : {}} ref={setReferenceElement}>
              <i className="bi bi-hand-thumbs-up fs-3"></i>
            </a>
            <Flip numbers={likes} color="#0d6efd" />
          </div>
          <div className="d-flex flex-column text-danger mx-2">
            <a onClick={onHate} style={!session ? { cursor: 'default' } : {}} ref={setReferenceElementSecond}>
              <i className="bi bi-hand-thumbs-down fs-3"></i>
            </a>
            <Flip numbers={hates} color="#dc3545" />
          </div>
        </div>
        <hr />
        <div className="mt-4">
          <h5>{comments.length}개의 댓글</h5>
          {comments.map((comment, index) => (
            <div key={index}>
              <p>{comment.author.name}</p>
              <p>{comment.content}</p>
            </div>
          ))}
        </div>
        <div className="input-group mt-4">
          <span className="input-group-text">{session?.user.name}</span>
          <textarea
            className="form-control"
            aria-label="With textarea"
            required
            placeholder={!session ? '로그인 후 작성가능합니다!' : ''}
            disabled={!session}
          ></textarea>
          <button className="btn btn-outline-success" type="button" id="button-addon2" disabled={!session}>
            작성
          </button>
        </div>
        <hr />
        <div ref={setPopperElement} style={styles.popper} className={`${st.pop} shadow-sm`} {...attributes.popper}>
          로그인 후 가능합니다!
          <div ref={setArrowElement} style={styles.arrow} className={st.arrow} />
        </div>
        <div
          ref={setPopperElementSecond}
          style={stylesSecond?.popper}
          className={`${st.pop} shadow-sm`}
          {...attributesSecond?.popper}
        >
          로그인 후 가능합니다!
          <div ref={setArrowElementSecond} style={stylesSecond?.arrow} className={st.arrow} />
        </div>
      </div>
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
          reTarget: true,
          tail: true,
        },
      },
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
