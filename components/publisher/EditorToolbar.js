"use client";

import React, { useState } from 'react';
import {
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
  $getSelection,
  $isRangeSelection,
} from 'lexical';
import { 
  $setBlocksType,
  $getSelectionStyleValueForProperty,
} from '@lexical/selection';
import { $createHeadingNode } from '@lexical/rich-text';
import { 
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
} from '@lexical/list';
import { 
  INSERT_PARAGRAPH_COMMAND,
  $createQuoteNode,
} from '@lexical/rich-text';
import { $createCodeNode } from '@lexical/code';
import { $createLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $insertNodeToNearestRoot } from '@lexical/utils';
import { $createImageNode } from './ImageNode';

import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  ListIcon,
  ListOrderedIcon,
  QuoteIcon,
  LinkIcon,
  CodeIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ImageIcon,
} from 'lucide-react';

export default function EditorToolbar() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');

  // Update button states based on selection
  React.useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          setIsBold(selection.hasFormat('bold'));
          setIsItalic(selection.hasFormat('italic'));
          setIsUnderline(selection.hasFormat('underline'));
          setIsStrikethrough(selection.hasFormat('strikethrough'));
        }
        return false;
      },
      1
    );
  }, [editor]);

  const formatText = (format) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  const formatHeading = (headingSize) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(headingSize));
      }
    });
  };

  const insertQuote = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createQuoteNode());
      }
    });
  };

  const insertCodeBlock = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createCodeNode());
      }
    });
  };

  const insertLink = () => {
    if (linkUrl) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl);
      setLinkUrl('');
      setShowLinkDialog(false);
    }
  };

  const insertImage = () => {
    if (imageUrl) {
      editor.update(() => {
        const imageNode = $createImageNode({
          src: imageUrl,
          alt: imageAlt || 'Image',
          maxWidth: 800,
        });
        $insertNodeToNearestRoot(imageNode);
      });
      setImageUrl('');
      setImageAlt('');
      setShowImageDialog(false);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-1 p-2 border-b border-gray-300 bg-gray-50 dark:bg-zinc-900">
        <button 
          onClick={() => formatText("bold")} 
          title="Bold" 
          className={`p-2 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded ${isBold ? 'bg-gray-200 dark:bg-zinc-700' : ''}`}
        >
          <BoldIcon className="w-4 h-4" />
        </button>
        <button 
          onClick={() => formatText("italic")} 
          title="Italic" 
          className={`p-2 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded ${isItalic ? 'bg-gray-200 dark:bg-zinc-700' : ''}`}
        >
          <ItalicIcon className="w-4 h-4" />
        </button>
        <button 
          onClick={() => formatText("underline")} 
          title="Underline" 
          className={`p-2 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded ${isUnderline ? 'bg-gray-200 dark:bg-zinc-700' : ''}`}
        >
          <UnderlineIcon className="w-4 h-4" />
        </button>
        <button 
          onClick={() => formatText("strikethrough")} 
          title="Strikethrough" 
          className={`p-2 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded ${isStrikethrough ? 'bg-gray-200 dark:bg-zinc-700' : ''}`}
        >
          <StrikethroughIcon className="w-4 h-4" />
        </button>

        <div className="h-6 border-l border-gray-300 mx-1"></div>

        <button onClick={() => formatHeading("h1")} title="Heading 1" className="p-2 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded">
          <Heading1Icon className="w-4 h-4" />
        </button>
        <button onClick={() => formatHeading("h2")} title="Heading 2" className="p-2 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded">
          <Heading2Icon className="w-4 h-4" />
        </button>
        <button onClick={() => formatHeading("h3")} title="Heading 3" className="p-2 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded">
          <Heading3Icon className="w-4 h-4" />
        </button>

        <div className="h-6 border-l border-gray-300 mx-1"></div>

        <button onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)} title="Bullet List" className="p-2 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded">
          <ListIcon className="w-4 h-4" />
        </button>
        <button onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)} title="Numbered List" className="p-2 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded">
          <ListOrderedIcon className="w-4 h-4" />
        </button>
        <button onClick={insertQuote} title="Quote" className="p-2 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded">
          <QuoteIcon className="w-4 h-4" />
        </button>
        <button onClick={insertCodeBlock} title="Code Block" className="p-2 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded">
          <CodeIcon className="w-4 h-4" />
        </button>

        <div className="h-6 border-l border-gray-300 mx-1"></div>

        <button onClick={() => setShowLinkDialog(true)} title="Insert Link" className="p-2 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded">
          <LinkIcon className="w-4 h-4" />
        </button>
        <button onClick={() => setShowImageDialog(true)} title="Insert Image" className="p-2 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded">
          <ImageIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Link Dialog */}
      {showLinkDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Insert Link</h3>
            <input
              type="url"
              placeholder="Enter URL"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4 dark:bg-zinc-700 dark:border-zinc-600"
              autoFocus
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowLinkDialog(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={insertLink}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Dialog */}
      {showImageDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Insert Image</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Image URL</label>
                <input
                  type="url"
                  placeholder="Enter image URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded dark:bg-zinc-700 dark:border-zinc-600"
                />
              </div>
              <div className="text-center">
                <span className="text-sm text-gray-500">or</span>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full p-2 border border-gray-300 rounded dark:bg-zinc-700 dark:border-zinc-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Alt Text</label>
                <input
                  type="text"
                  placeholder="Describe the image"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded dark:bg-zinc-700 dark:border-zinc-600"
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end mt-4">
              <button
                onClick={() => setShowImageDialog(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={insertImage}
                disabled={!imageUrl}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}