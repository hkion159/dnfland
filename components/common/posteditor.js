import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

function PostEditor(props) {
  const { forwardRef } = props;
  return <Editor {...props} ref={forwardRef} />;
}

export default PostEditor;
