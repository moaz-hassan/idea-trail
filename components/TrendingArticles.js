import { TrendingUp } from "lucide-react";
import { blogPosts } from "@/utils/dummyData";
import ArticleCard from "./ArticleCard/ArticleCard";
const TrendingArticles = () => {
  const trendingPosts = blogPosts.slice(0, 4);
  console.log(trendingPosts);

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 ">
      <div className="flex items-center space-x-3 mb-12">
        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          Trending Now
        </h2>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 p-4 my-10">
        {trendingPosts.map((post) => (
          <ArticleCard
            key={post.id}
            title={post.title}
            category={post.category}
            description={post.excerpt}
            publlishedDate={post.publishDate}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingArticles;
