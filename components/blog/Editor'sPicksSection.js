import Image from "next/image";
import Link from "next/link";

const EditorsPicksSection = ({ editorsPicks }) => {
  return (
    <section>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        Editor&apos;s Picks
      </h3>
      <div className="space-y-4">
        {editorsPicks.map((article) => (
          <article key={article.id} className="flex space-x-3 group">
            <div className="w-16 h-16 overflow-hidden rounded-lg flex-shrink-0 relative">
              <Image
                src={article.imgUrl || "/images/WebArticle.jpg"}
                fill
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                <Link href={`/blog/${article.id}`}>{article.title}</Link>
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                By {article.publisherName}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default EditorsPicksSection;
