import ArticleCard from "../ArticleCard/ArticleCard";

const ReaderFavoritesSection = ({ readerFavorites }) => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Reader Favorites
      </h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {readerFavorites.slice(0, 5).map((article) => (
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
};

export default ReaderFavoritesSection;
