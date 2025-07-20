import { SearchIcon } from "lucide-react";
import Link from "next/link";
import ArticleCard from "./ArticleCard/ArticleCard";

const ArticlesSearchResultsComponent = ({
  query,
  searchResults,
  isLoading,
  selectedCategory,
}) => {
  return (
    <div className="lg:w-3/4">
      {query && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Search Results
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {isLoading ? (
              "Searching..."
            ) : (
              <>
                {searchResults.length > 0 ? (
                  <>
                    Found {searchResults.length} result
                    {searchResults.length !== 1 ? "s" : ""} for &quot;
                    {query}&quot;
                  </>
                ) : (
                  <>No results found for &quot;{query}&quot;</>
                )}
                {selectedCategory && ` in ${selectedCategory}`}
              </>
            )}
          </p>
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 animate-pulse"
            >
              <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : searchResults?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {searchResults?.map((article) => (
            <ArticleCard
              key={article.id}
              title={article.title}
              category={article.category}
              description={article.subtitle}
              publishedDate={article.publishDate}
              coverImageUrl={article.imgUrl}
              articleUrl={`/blog/${article.id}`}
              viewsNum={article.viewsNum}
            />
          ))}
        </div>
      ) : query ? (
        <div className="text-center py-12">
          <SearchIcon className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No results found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Try adjusting your search terms or browse our categories
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Browse All Posts
          </Link>
        </div>
      ) : (
        <div className="text-center py-12">
          <SearchIcon className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Start Your Search
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Enter a search term above to find articles
          </p>
        </div>
      )}
    </div>
  );
};

export default ArticlesSearchResultsComponent;
