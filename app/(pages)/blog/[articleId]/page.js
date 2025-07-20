import ArticleCommentsSection from "@/components/article/ArticleCommentsSection";
import ArticleHeader from "@/components/article/ArticleHeader";
import ArticleContent from "@/components/article/ArticleContent";
import RelatedArticlesSection from "@/components/article/RelatedArticlesSection";
import getArticleById from "@/lib/db_functions/getArticleById";
import { getArticlesByCategories } from "@/lib/db_functions/getArticlesByCategories";
import getAllArticlesIds from "@/lib/db_functions/getAllArticlesIds";
import NotFound from "@/app/not-found";
import Link from "next/link";

export async function generateStaticParams() {
  const ids = await getAllArticlesIds();
  return ids.map((id) => ({ articleId: id }));
}

const Article = async ({ params }) => {
  const { articleId } = params;

  const article = await getArticleById(articleId);
  if (!article) return <NotFound />;

  const relatedArticles = await getArticlesByCategories([article.category]);

  function isScheduledInFuture(scheduleDate) {
    let scheduledDateObj;

    if (!scheduleDate) return false;

    if (typeof scheduleDate === "string") {
      const cleaned = scheduleDate.replace(" at ", " ");
      scheduledDateObj = new Date(cleaned);
    } else if (typeof scheduleDate === "object" && "seconds" in scheduleDate) {
      scheduledDateObj = new Date(scheduleDate.seconds * 1000);
    } else {
      return false;
    }

    return scheduledDateObj > new Date();
  }

  if (article.status === "blocked") {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-gradient-to-br from-slate-50 via-white to-red-50 dark:from-slate-900 dark:via-slate-800 dark:to-red-900">
        <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8 max-w-xl w-full text-center border border-red-300 dark:border-red-700">
          <h1 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-4">
            🚫 This article is blocked
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
            The article you’re trying to access has been blocked by an
            administrator and is no longer available to the public.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
          >
            Return to Home Page
          </Link>
        </div>
      </div>
    );
  } else if (isScheduledInFuture(article.scheduleDate)) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900">
        <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8 max-w-xl w-full text-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            📅 This article is not yet published
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
            This article is scheduled to be published at a future time. It will
            become available to readers once its scheduled publish time has
            passed.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Return to Home Page
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-22 min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900">
      <ArticleHeader
        title={article.title}
        subtitle={article.subtitle}
        category={article.category}
        author={article.author}
        authorId={article.authorId}
        tags={article.tags}
        viewsNum={article.viewsNum}
        publishDate={article.publishDate}
        imgUrl={article.imgUrl}
      />
      <ArticleContent content={article.content} />
      <ArticleCommentsSection />
      <RelatedArticlesSection relatedArticles={relatedArticles} />
    </div>
  );
};

export default Article;
