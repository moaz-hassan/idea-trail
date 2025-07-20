import ArticleCard from "../ArticleCard/ArticleCard";

export default function NewPublishersSection({ articles }) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">New Publishers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.slice(0, 3).map((article) => (
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
