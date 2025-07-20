"use client";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateHtmlFromNodes } from "@lexical/html";

export default function ExportButton() {
  const [editor] = useLexicalComposerContext();

  const publishArticle = () => {
    editor.getEditorState().read(() => {
      const htmlString = $generateHtmlFromNodes(editor);
      // Log the HTML code to the console
      console.log(htmlString);
      alert("HTML code has been logged to the console.");
    });
  };

  return (
    <button
      onClick={publishArticle}
      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
      Publish
    </button>
  );
}
