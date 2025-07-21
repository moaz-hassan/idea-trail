import Image from "next/image";
import Link from "next/link";

const RecentArticlesSection = ({ RecentArticles }) => {
  
  if (!RecentArticles) {
    return null;
  }
  RecentArticles = RecentArticles.slice(0, 5);
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Recent articles</h2>
      <ul className="space-y-4">
        {RecentArticles?.map((article) => (
          <li key={article.id} className="flex items-center gap-4">
            <Image
              src={article.imgUrl || "/images/WebArticle.jpg"}
              alt={article.title}
              width={48}
              height={48}
              className="rounded-md object-cover"
            />
            <div className="flex-1">
              <Link
                href={`/blog/${article.id}`}
                className="font-medium hover:underline"
              >
                {article.title || "No Title"}
              </Link>
            </div>
            <span className="text-sm text-gray-500">
              {article.viewsNum || 0} views
            </span>
            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
              {article.status || "Draft"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentArticlesSection;
