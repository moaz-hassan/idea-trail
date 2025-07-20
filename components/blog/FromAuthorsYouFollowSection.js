import ArticleCard from "../ArticleCard/ArticleCard";

export default function FromAuthorsYouFollowSection({ articles }) {
  if (!articles?.length) return null;

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">From Authors You Follow</h2>
      <div className="space-y-4">
        {articles.slice(0, 5).map((article) => (
          <ArticleCard
            key={article.id}
            articleUrl={`/blog/${article.id}`}
            miniCard={true}
            title={article.title}
            category={article.category}
            publisherId={article.publisherId}
            publisherImage={article.publisherImgUrl}
            publisherName={article.publisherName}
            publishedDate={article.createdAt}
            coverImageUrl={article.imgUrl}
            viewsNum={article.viewsNum}
          />
        ))}
      </div>
    </section>
  );
}
