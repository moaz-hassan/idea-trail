'use client';

import { useState } from 'react';
import ArticleEditor from './ArticleEditor';

export default function EditorWrapper() {
  const [editorState, setEditorState] = useState('');

  const onChange = (editorState) => {
    setEditorState(editorState);
    // You can also pass this up to a parent component if needed
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ArticleEditor onChange={onChange} />
      {/* Hidden input to use in forms */}
      <input type="hidden" name="content" value={editorState} />
    </div>
  );
}