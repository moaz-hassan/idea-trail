import ArticleCard from "./ArticleCard/ArticleCard";

const LatestArticlesSection = ({ latestArticles }) => {
  latestArticles = latestArticles.slice(0, 5);
  return (
    <div>
      <h1 className="text-4xl font-bold min-md:px-30">Latest Articles</h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-4 p-4 my-10 min-md:px-30">
        {latestArticles?.map((article, index) => (
          <ArticleCard
            key={index}
            title={article.title}
            description={article.subtitle}
            category={article.category}
            coverImageUrl={article.imgUrl}
            publishedDate={article.publishDate}
            articleUrl={`/blog/${article.id}`}
            publisherName={article.publisherName}
            publisherId={article.publisherId}
            viewsNum={article.viewsNum}
            styles={"bg-white"}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestArticlesSection;
