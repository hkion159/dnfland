import { useCallback, useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import Editor from '../../../components/common/wrappededitor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import Layout from '../../../components/layout/layout';
import axios from 'axios';
import { setPost } from '../../../modules/post';

const Revise = () => {
  const [session, loading] = useSession();
  const router = useRouter();
  const { id } = router.query;
  const postState = useSelector((state) => state.post);
  const { title, markdown } = postState;
  const [titleValue, setTitleValue] = useState(title);
  const [htmlValue, setHtml] = useState('');
  const [markdownValue, setMarkdown] = useState(markdown);
  const ref = useRef();
  const onChangeTitle = useCallback((e) => {
    setTitleValue(() => e.target.value);
  }, []);
  const onLoad = useCallback((instance) => {
    ref.current = instance;
  }, []);
  const onChangeEditValue = useCallback((htmlVal, mdVal) => {
    setHtml(() => htmlVal);
    setMarkdown(() => mdVal);
  }, []);
  const onCancel = useCallback(() => {
    router.back();
  }, [router]);
  const onRevise = useCallback(() => {
    const body = {
      title: titleValue,
      html: htmlValue,
      markdown: markdownValue,
      reviseDate: new Date(),
    };
    const api = async () => {
      await axios.put(`/api/post/${id}`, body);
      await router.push(`/board/post/${id}`);
    };
    if (titleValue === '' || markdownValue === '') alert('제목이나 내용이 비어있으면 안 됩니다!');
    else {
      api();
      setPost({ title: '', markdown: '' });
    }
  }, [htmlValue, id, markdownValue, router, titleValue]);
  useEffect(() => {
    if (ref.current) {
      const instance = ref.current.getInstance();
      setTitleValue(() => title);
      instance.setHtml('');
      instance.setMarkdown(markdown);
    }
  }, [markdown, title]);
  useEffect(() => {
    if (!loading && !session) {
      alert('로그인 후 수정 가능합니다!');
      router.push('/board');
    }
  }, [loading, router, session]);

  return (
    <Layout>
      <h4 className="m-4">게시글 수정</h4>
      <div className="p-4">
        <input
          onChange={onChangeTitle}
          className="form-control"
          placeholder="제목"
          required
          maxLength="100"
          value={titleValue}
        />
      </div>
      <div className="p-4">
        <Editor
          placeholder="헤롱헤롱쿨쿨"
          initialValue={markdownValue}
          initialEditType="wysiwyg"
          height="600px"
          usageStatistics={false}
          useCommandShortcut
          onChange={onChangeEditValue}
          onLoad={onLoad}
        />
      </div>
      <div className="d-flex justify-content-center">
        <button type="button" className="btn btn-outline-success mx-3" onClick={onRevise}>
          수정
        </button>
        <button type="button" className="btn btn-outline-secondary mx-3" onClick={onCancel}>
          취소
        </button>
      </div>
    </Layout>
  );
};

export default Revise;
