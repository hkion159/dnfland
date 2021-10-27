import React, { useCallback, useState, useRef, useEffect } from 'react';
import Editor from '../../components/common/wrappededitor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import Layout from '../../components/layout/layout';
import { useRouter } from '../../node_modules/next/dist/client/router';
import { useSession } from 'next-auth/client';

const WritePost = () => {
  const [session, loading] = useSession();
  const [markdown, content, title] = ['응애!!', null, ''];
  const [titleValue, setTitleValue] = useState(title);
  const [htmlValue, setHtml] = useState(content);
  const [markdownValue, setMarkdown] = useState(markdown);
  const ref = useRef();
  const router = useRouter();
  const onChangeTitle = useCallback((e) => {
    setTitleValue(() => e.target.value);
  }, []);
  const onChangeEditValue = useCallback((htmlVal, mdVal) => {
    setHtml(() => htmlVal);
    setMarkdown(() => mdVal);
  }, []);
  const onLoad = useCallback((instance) => {
    ref.current = instance;
  }, []);
  const onPost = useCallback(() => {
    const body = {
      title: titleValue,
      html: htmlValue,
      markdown: markdownValue,
    };
    const api = async () => {
      await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await router.push('/board');
    };
    api();
  }, [htmlValue, markdownValue, router, titleValue]);
  const onCancel = useCallback(() => {
    router.push('/board');
  }, [router]);
  useEffect(() => {
    if (ref.current) {
      const instance = ref.current.getInstance();
      setTitleValue(() => title);
      instance.setMarkdown(markdown);
      instance.setHtml(content);
    }
  }, [content, markdown, title]);
  useEffect(() => {
    if (!loading && !session) {
      alert('로그인 후 작성 가능합니다!');
      router.push('/board');
    }
  }, [loading, router, session]);
  return (
    <Layout>
      <div className="">
        <h4 className="m-4">게시글 작성</h4>
        <div className="p-4">
          <input
            onChange={onChangeTitle}
            className="form-control"
            placeholder="제목"
          />
        </div>
        <div className="p-4">
          <Editor
            placeholder="헤롱헤롱쿨쿨"
            initialValue={markdownValue}
            previewStyle="vertical"
            initialEditType="markdown"
            height="600px"
            usageStatistics={false}
            useCommandShortcut
            onChange={onChangeEditValue}
            onLoad={onLoad}
          />
        </div>
        <div className="d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-outline-success mx-3"
            onClick={onPost}
          >
            등록
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary mx-3"
            onClick={onCancel}
          >
            취소
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default WritePost;
