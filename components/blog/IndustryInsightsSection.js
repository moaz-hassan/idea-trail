import ArticleCard from "../ArticleCard/ArticleCard";

const IndustryInsightsSection = ({ industryInsights }) => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Industry Insights
      </h2>
      <div className="grid grid-cols-[repeat(auto-fill,350px)] max-sm:justify-center gap-6">
        {industryInsights.slice(0, 5).map((article) => (
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

export default IndustryInsightsSection;
