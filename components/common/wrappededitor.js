import React, { useRef, useCallback, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

const PostEditor = dynamic(() => import('./posteditor'), {
  ssr: false,
});

// eslint-disable-next-line react/display-name
const WrappedEditor = React.forwardRef((props, ref) => <PostEditor {...props} forwardRef={ref} />);

const Index = (props) => {
  const editorRef = useRef(null);
  const [isLoaded, setLoad] = useState(false);
  const onChange = useCallback(() => {
    if (!editorRef.current) return;
    const instance = editorRef.current.getInstance();
    props.onChange(instance.getHTML(), instance.getMarkdown());
  }, [props, editorRef]);
  useEffect(() => {
    if (editorRef.current) {
      setLoad(true);
    }
  }, []);
  useEffect(() => {
    if (isLoaded) {
      props.onLoad(editorRef.current);
    }
  }, [isLoaded, props]);
  return <WrappedEditor {...props} ref={editorRef} onChange={onChange} />;
};

Index.propTypes = {
  onChange: PropTypes.func.isRequired,
  onLoad: PropTypes.func.isRequired,
};

export default Index;
