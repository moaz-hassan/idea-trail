import { Heart } from "lucide-react";
import { blogPosts } from "@/utils/dummyData";
import ArticleCard from "@/components/ArticleCard/ArticleCard";

const SuggestedArticles = () => {
  const suggestedPosts = blogPosts.slice(4, 8);
  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-white/10 dark:bg-white/5 backdrop-blur-xl"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3 mb-12">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Suggested for You
          </h2>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
          {suggestedPosts.map((post) => (
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
    </section>
  );
};

export default SuggestedArticles;
