import ArticleCard from "@/components/ArticleCard/ArticleCard";

export default function ArticlesSection({ articles, title }) {
  return (
    <div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            coverImageUrl={article.imgUrl}
            title={article.title}
            description={article.subtitle}
            category={article.category}
            viewsNum={article.viewsNum}
            articleUrl={`/blog/${article.id}`}
            publishedDate={article.publishDate}
            publisherId={article.publisherId}
          />
        ))}
      </div>
    </div>
  );
}
