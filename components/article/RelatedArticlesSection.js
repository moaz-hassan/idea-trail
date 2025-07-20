import Link from "next/link";
import { TrendingUp } from "lucide-react";
import ArticleCard from "../ArticleCard/ArticleCard";

const RelatedArticlesSection = ({ relatedArticles }) => {
  if (relatedArticles.length === 0) return null;

  return (
    <section className="mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 dark:border-slate-700/50 p-8">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            Related Articles
          </h3>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
          {relatedArticles.map((article) => (
            <ArticleCard
              key={article.id}
              title={article.title}
              category={article.category}
              description={article.subtitle}
              publishedDate={article.publishDate}
              viewsNum={article.viewsNum}
              publisherName={article.publisher}
              coverImageUrl={article.imgUrl}
              publisherId={article.publisherId}
              publisherImageUrl={article.publisherImageUrl}
              articleUrl={`/blog/${article.id}`}
            />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/trends"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <TrendingUp className="w-4 h-4" />
            <span>Explore More Trending Articles</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RelatedArticlesSection;
