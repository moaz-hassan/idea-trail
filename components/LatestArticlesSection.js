import ArticleCard from "./ArticleCard/ArticleCard";
import { blogPosts } from "@/utils/dummyData";

const LatestArticlesSection = () => {
  // Get the latest 5 articles from the dummy data
  const latestArticles = [...blogPosts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div>
      <h1 className="text-4xl font-bold min-md:px-30">Latest Articles</h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-4 p-4 my-10 min-md:px-30">
        {latestArticles.map((article, index) => (
          <ArticleCard
            key={index}
            title={article.title}
            description={article.excerpt}
            category={article.category}
            publlishedDate={article.date}
            Articleurl={`/blog/${article.id}`}
            publisherName={article.author}
            publisherUrl={`/authors/${encodeURIComponent(article.author)}`}
            styles={"bg-white"}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestArticlesSection;
