const ArticleContent = ({ content }) => {
  return (
    <article className="w-full py-12">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 dark:bg-slate-800/80 rounded-3xl shadow-md border border-white/30 dark:border-slate-700/60 p-8 md:p-12 lg:p-16">
          <div
            className="prose prose-xl dark:prose-invert max-w-none
                         Headings
                      prose-headings:font-semibold prose-headings:scroll-mt-24
                      prose-h1:text-4xl md:prose-h1:text-5xl prose-h1:mb-8 prose-h1:pb-2 prose-h1:border-b prose-h1:border-slate-200 dark:prose-h1:border-slate-700
                      prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-6
                      prose-h3:text-2xl md:prose-h3:text-3xl prose-h3:mt-12 prose-h3:mb-4
                      prose-h4:text-xl md:prose-h4:text-2xl prose-h4:mt-10 prose-h4:mb-3
                      
                      // Paragraphs
                      prose-p:text-lg prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-relaxed
                      prose-p:mb-6
                      
                      // Links
                      prose-a:font-medium prose-a:underline-offset-4 prose-a:decoration-2
                      prose-a:text-blue-600 hover:prose-a:text-blue-700 
                      dark:prose-a:text-blue-400 dark:hover:prose-a:text-blue-300
                      prose-a:transition-colors
                      
                      // Lists
                      prose-ul:list-disc prose-ol:list-decimal
                      prose-li:my-2
                      
                      // Code
                      prose-code:font-mono prose-code:text-sm
                      prose-code:text-blue-600 dark:prose-code:text-blue-400 
                      prose-code:bg-slate-100 dark:prose-code:bg-slate-800 
                      prose-code:px-2 prose-code:py-1 prose-code:rounded-lg
                      
                      // Pre/code blocks
                      prose-pre:bg-slate-900 dark:prose-pre:bg-slate-950 w-fit
                      prose-pre:rounded-xl prose-pre:shadow-lg
                      prose-pre:border prose-pre:border-slate-200 dark:prose-pre:border-slate-700
                      prose-pre:overflow-x-auto
                      
                      // Tables
                      prose-table:border-collapse prose-table:w-full
                      prose-th:bg-slate-100 dark:prose-th:bg-slate-700
                      prose-th:border prose-th:border-slate-300 dark:prose-th:border-slate-600
                      prose-td:border prose-td:border-slate-200 dark:prose-td:border-slate-700
                      
                      // Images
                      prose-img:rounded-xl prose-img:shadow-md
                      prose-img:mx-auto
                      
                      // Blockquotes
                      prose-blockquote:border-l-4 prose-blockquote:border-blue-500
                      prose-blockquote:bg-slate-100 dark:prose-blockquote:bg-slate-800
                      prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg
                      
                      // Horizontal rules
                      prose-hr:border-t prose-hr:border-slate-200 dark:prose-hr:border-slate-700
                      prose-hr:my-12"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </article>
  );
};

export default ArticleContent;