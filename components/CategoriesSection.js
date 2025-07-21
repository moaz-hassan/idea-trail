import DescriptiveCard from "@/components/ui/DescriptiveCard";
import { TrendingUp } from "lucide-react";
import Link from "next/link";

const CategoriesSection = ({ articles }) => {
  let categories = articles.reduce((acc, post) => {
    if (!acc[post.category]) {
      acc[post.category] = 0;
    }
    acc[post.category]++;
    return acc;
  }, {});


  const sortedCategories = Object.entries(categories).sort((a, b) => b[1] - a[1]).slice(0, 5);

  return (
    <div>
      <div>
        <h1 className="text-4xl font-bold text-center">Explore Categories</h1>
        <p className="text-lg text-center mt-4 mb-8 text-gray-500">
          Dive deep into topics that matter to you
        </p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 p-4 my-16 min-md:px-30">
        {sortedCategories?.map(([category, count]) => (
          <Link href={`/blog/search?category=${encodeURIComponent(category)}`} key={category}>
            <DescriptiveCard
              icon={<TrendingUp className="w-8 h-8 text-gray-500" />}
              title={category}
              articlesNumber={count.toString()}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
