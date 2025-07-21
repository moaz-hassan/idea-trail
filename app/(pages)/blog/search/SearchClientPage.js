"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Search, Filter, X, ChevronDown, Loader2 } from "lucide-react";
import ArticleCard from "@/components/ArticleCard/ArticleCard";

export default function SearchClientPage({ articles, categories }) {
  const searchParams = useSearchParams();
  const [searchResults, setSearchResults] = useState(articles);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState(
    searchParams.get("value") || ""
  );
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const router = useRouter();
  const searchInputRef = useRef(null);
  const query = searchParams.get("value") || "";
  const categoryParam = searchParams.get("category") || "";

  // Initialize category from URL parameter
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  // Memoize filtered and sorted results
  const filteredArticles = useMemo(() => {
    let result = [...articles];

    // Filter by category if selected
    if (selectedCategory) {
      result = result.filter(
        (article) =>
          article.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by search query if exists
    if (query) {
      const searchTerms = query.toLowerCase().split(" ");
      result = result.filter((article) => {
        const title = article.title.toLowerCase();
        const description = article.subtitle?.toLowerCase() || "";
        const content = article.content?.toLowerCase() || "";

        return searchTerms.some(
          (term) =>
            title.includes(term) ||
            description.includes(term) ||
            content.includes(term)
        );
      });
    }

    return result;
  }, [articles, query, selectedCategory]);

  // Memoize sorted results
  const sortedArticles = useMemo(() => {
    return [...filteredArticles].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.createdAt || b.publishedDate) -
            new Date(a.createdAt || a.publishedDate)
          );
        case "oldest":
          return (
            new Date(a.createdAt || a.publishedDate) -
            new Date(b.createdAt || b.publishedDate)
          );
        case "title":
          return a.title.localeCompare(b.title);
        case "popular":
          return (b.viewsNum || b.views || 0) - (a.viewsNum || a.views || 0);
        default:
          return 0;
      }
    });
  }, [filteredArticles, sortBy]);

  // Update results when dependencies change
  useEffect(() => {
    setIsLoading(true);
    setSearchResults(sortedArticles);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [sortedArticles]);

  // Focus search input on mount
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Helper function to update URL parameters
  const updateUrlParams = (newParams) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        currentParams.set(key, value);
      } else {
        currentParams.delete(key);
      }
    });

    const newUrl = `/blog/search${currentParams.toString() ? `?${currentParams.toString()}` : ''}`;
    router.push(newUrl);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      updateUrlParams({
        value: searchValue || null,
        category: selectedCategory || null
      });
    }
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
    if (e.target.value.length > 2) {
      updateUrlParams({
        value: e.target.value,
        category: selectedCategory || null
      });
    } else if (e.target.value.length === 0) {
      updateUrlParams({
        value: null,
        category: selectedCategory || null
      });
    }
  };

  const clearSearch = () => {
    setSearchValue("");
    updateUrlParams({
      value: null,
      category: selectedCategory || null
    });
  };

  const clearCategory = () => {
    setSelectedCategory("");
    updateUrlParams({
      value: searchValue || null,
      category: null
    });
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    updateUrlParams({
      value: searchValue || null,
      category: category || null
    });
  };

  const clearAllFilters = () => {
    setSelectedCategory("");
    setSearchValue("");
    router.push("/blog/search");
  };

  // Group categories with counts
  const categoryCounts = useMemo(() => {
    const counts = {};
    articles.forEach((article) => {
      const category = article.category || "Uncategorized";
      counts[category] = (counts[category] || 0) + 1;
    });
    return counts;
  }, [articles]);

  // Enhanced categories with counts
  const enhancedCategories = useMemo(() => {
    return categories
      .map((category) => ({
        ...category,
        count: categoryCounts[category.name] || 0,
      }))
      .filter((cat) => cat.count > 0)
      .sort((a, b) => b.count - a.count);
  }, [categories, categoryCounts]);

  return (
    <div className="mt-20 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Enhanced Header */}
      <section className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Discover Articles
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 md:mb-12 max-w-2xl mx-auto">
              Explore our comprehensive collection of articles, tutorials, and
              insights
            </p>

            {/* Enhanced Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <div className="relative flex items-center">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchValue}
                  placeholder="Search articles, topics, or keywords..."
                  onChange={handleInputChange}
                  onKeyDown={handleSearch}
                  className="w-full h-14 pl-12 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
                />
                {searchValue && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              <button
                onClick={handleSearch}
                className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium"
              >
                Search
              </button>
            </div>

            {/* Search Stats */}
            {(query || selectedCategory) && (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {searchResults.length} article
                {searchResults.length !== 1 ? "s" : ""} found
                {query && <span> for &quot;{query}&quot;</span>}
                {selectedCategory && <span> in {selectedCategory}</span>}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-6 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {searchResults.length} Article
              {searchResults.length !== 1 ? "s" : ""}
            </h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              aria-expanded={showFilters}
              aria-controls="filters-sidebar"
            >
              <Filter className="w-4 h-4" />
              Filters
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Enhanced Sidebar */}
            <aside
              id="filters-sidebar"
              className={`lg:w-80 transition-all duration-300 ease-in-out ${
                showFilters ? "block" : "hidden lg:block"
              }`}
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  Filters
                </h3>

                {/* Active Filters */}
                {(selectedCategory || query) && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Active Filters
                      </h4>
                      <button
                        onClick={clearAllFilters}
                        className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {query && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                          Search: {query}
                          <button
                            onClick={clearSearch}
                            className="ml-1 hover:text-blue-600 dark:hover:text-blue-300"
                            aria-label="Remove search filter"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}
                      {selectedCategory && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                          {selectedCategory}
                          <button
                            onClick={clearCategory}
                            className="ml-1 hover:text-green-600 dark:hover:text-green-300"
                            aria-label="Remove category filter"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Sort Options */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Sort By
                  </h4>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors cursor-pointer"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="title">Title A-Z</option>
                    <option value="popular">Most Popular</option>
                  </select>
                </div>

                {/* Categories */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Categories
                  </h4>
                  <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                    <button
                      onClick={() => handleCategorySelect("")}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        !selectedCategory
                          ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      All Categories
                      <span className="float-right text-xs text-gray-500 dark:text-gray-400">
                        {articles.length}
                      </span>
                    </button>
                    {enhancedCategories.map((category) => (
                      <button
                        key={category.name}
                        onClick={() => handleCategorySelect(category.name)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                          selectedCategory === category.name
                            ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                            : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <span>{category.name}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {category.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Enhanced Results */}
            <main className="flex-1">
              {isLoading ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="animate-spin rounded-full h-12 w-12 text-blue-600" />
                </div>
              ) : (
                <div>
                  {/* Results Header - Desktop */}
                  <div className="hidden lg:flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {searchResults.length} Article
                      {searchResults.length !== 1 ? "s" : ""}
                      {query && (
                        <span className="text-lg font-normal text-gray-600 dark:text-gray-400 ml-2">
                          for &quot;{query}&quot;
                        </span>
                      )}
                      {selectedCategory && (
                        <span className="text-lg font-normal text-gray-600 dark:text-gray-400 ml-2">
                          in {selectedCategory}
                        </span>
                      )}
                    </h2>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Sorted by: {sortBy === "newest" && "Newest First"}
                      {sortBy === "oldest" && "Oldest First"}
                      {sortBy === "title" && "Title (A-Z)"}
                      {sortBy === "popular" && "Most Popular"}
                    </div>
                  </div>

                  {searchResults.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                      {searchResults.map((article) => (
                        <ArticleCard
                          key={article.id}
                          miniCard={true}
                          coverImageUrl={
                            article.imgUrl || article.coverImageUrl
                          }
                          title={article.title}
                          description={article.subtitle || article.excerpt}
                          category={article.category}
                          viewsNum={article.viewsNum || article.views || 0}
                          articleUrl={`/blog/${article.id}`}
                          publisherImage={article.publisherImgUrl}
                          publisherName={article.publisherName || "Publisher"}
                          publishedDate={
                            article.publishedDate || article.createdAt
                          }
                          publisherId={article.publisherId}
                          styles="w-full hover:scale-[1.01] transition-transform duration-200"
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        <Search className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        No articles found
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Try adjusting your search criteria or browse all
                        articles
                      </p>
                      <button
                        onClick={clearAllFilters}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        View All Articles
                      </button>
                    </div>
                  )}
                </div>
              )}
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}