"use client";

import React, { useEffect, useRef } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { LinkNode, AutoLinkNode } from "@lexical/link";
import { CodeNode } from "@lexical/code";
import { TRANSFORMERS } from "@lexical/markdown";
import { $generateHtmlFromNodes } from "@lexical/html";
import EditorToolbar from "./EditorToolbar";
import { ImageNode } from "./ImageNode";

const theme = {
  paragraph: "mb-2",
  heading: {
    h1: "text-3xl font-bold mb-4",
    h2: "text-2xl font-bold mb-3",
    h3: "text-xl font-bold mb-2",
  },
  list: {
    nested: {
      listitem: "list-none",
    },
    ol: "list-decimal ml-4",
    ul: "list-disc ml-4",
    listitem: "mb-1",
  },
  link: "text-blue-600 hover:text-blue-800 underline",
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
    strikethrough: "line-through",
    code: "font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm",
  },
  code: "font-mono bg-gray-100 dark:bg-gray-800 p-4 rounded-lg block my-2",
  quote: "border-l-4 border-gray-300 pl-4 italic my-2",
};

const initialConfig = {
  namespace: "ArticleEditor",
  theme,
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    LinkNode,
    AutoLinkNode,
    ImageNode,
  ],
  onError: (error) => {
    console.error("Lexical Error:", error);
  },
};

function EditorWithOnChange({ onChange }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const unregister = editor.registerUpdateListener(({ editorState }) => {
      // Generate HTML instead of JSON
      editorState.read(() => {
        const htmlString = $generateHtmlFromNodes(editor);
        onChange?.(htmlString);
      });
    });
    return () => unregister();
  }, [editor, onChange]);

  return null;
}

export default function ArticleEditor({ onChange, onEditorReady }) {
  const editorRef = useRef(null);
  
  
  // Get the Lexical editor instance when ready
  useEffect(() => {
    const interval = setInterval(() => {
      const editable = document.querySelector('[contenteditable="true"]');
      if (editable?._lexicalEditor) {
        editorRef.current = editable._lexicalEditor;
        clearInterval(interval);
        onEditorReady?.(editorRef.current);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [onEditorReady]);

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="relative border border-gray-300 rounded-lg overflow-hidden w-full">
        <div className="flex justify-between items-center border-b border-gray-300 sticky top-0 bg-white dark:bg-gray-800 z-10">
          <EditorToolbar />
        </div>
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="min-h-[400px] p-4 lg:p-6 outline-none prose max-w-none leading-relaxed w-full" />
          }
          placeholder={
            <div className="absolute top-4 left-4 text-gray-400 pointer-events-none">
              Start writing your article...
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <AutoFocusPlugin />
        <LinkPlugin />
        <ListPlugin />
        <TablePlugin />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        {onChange && <EditorWithOnChange onChange={onChange} />}
      </div>
    </LexicalComposer>
  );
}

// ✅ Exportable function to generate HTML
export async function generateHtmlFromEditor(editor) {
  if (!editor) return "";

  return new Promise((resolve) => {
    editor.getEditorState().read(() => {
      const htmlString = $generateHtmlFromNodes(editor);
      resolve(htmlString);
    });
  });
}

// ✅ Utility function to get clean HTML without Tailwind classes
export async function generateCleanHtmlFromEditor(editor) {
  if (!editor) return "";

  return new Promise((resolve) => {
    editor.getEditorState().read(() => {
      const htmlString = $generateHtmlFromNodes(editor);
      
      // Remove Tailwind classes and keep only semantic HTML
      const cleanHtml = htmlString
        .replace(/class="[^"]*"/g, '') // Remove all class attributes
        .replace(/\s+>/g, '>') // Clean up extra spaces
        .replace(/>\s+</g, '><'); // Remove spaces between tags
      
      resolve(cleanHtml);
    });
  });
}