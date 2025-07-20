import { Filter } from "lucide-react";
import Link from "next/link";

const SidebarFiltersComponent = ({ selectedCategory, setSelectedCategory, categories }) => {
  return (
    <div className="lg:w-1/4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-24">
        <div className="flex items-center space-x-2 mb-6">
          <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Filters
          </h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map((category,i) => (
                <option key={i} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Popular Categories
            </h3>
            <div className="space-y-2">
              {categories.map((category,i) => (
                <Link
                  key={i}
                  href={`/category/${category.slug}`}
                  className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <span>{category.name}</span>
                  <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    {category.postCount}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarFiltersComponent;
