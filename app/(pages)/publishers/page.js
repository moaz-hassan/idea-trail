"use client";
import { useEffect, useState } from "react";
import { getAllPublishersWithStats } from "@/lib/db_functions/getAllPublishersWithStats";
import Link from "next/link";
import Image from "next/image";
import Loader from "@/components/ui/Loader";

export default function PublishersPage() {
  const [publishers, setPublishers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPublishers = async () => {
      setIsLoading(true);
      const allPublishers = await getAllPublishersWithStats();
      setPublishers(allPublishers);
      setIsLoading(false);
    };
    fetchPublishers();
  }, []);

  const publishersArray = publishers.map((publisher) => ({
    id: publisher.id,
    name: publisher.name,
    postCount: publisher.articleCount,
    categories: publisher.topCategories,
    tags: publisher.topKeywords,
    image: publisher.imgUrl || "/images/WebArticle.jpg",
  }));

  const filteredPublishers = publishersArray.filter((publisher) => {
    const matchesSearch = publisher.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "" ||
      publisher.categories.some(
        (cat) => cat.toLowerCase() === selectedCategory.toLowerCase()
      );
    return matchesSearch && matchesCategory;
  });

  const allCategories = [
    ...new Set(publishersArray.flatMap((p) => p.categories)),
  ];

  return (
    <div className="min-h-screen mt-36 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Our Publishers
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Discover the publishers who bring quality content to our platform
          </p>

          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Search publishers..."
              className="flex-grow px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {allCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {isLoading ? (
          <Loader size={30} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPublishers.map((publisher) => (
              <Link
                href={`/publishers/${publisher.id}`}
                key={publisher.id}
                className="group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                  <div className="p-6 flex items-center space-x-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-blue-100 dark:border-blue-900 flex-shrink-0">
                      <Image
                        src={publisher.imgUrl || "/images/WebArticle.jpg"}
                        alt={publisher.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                        {publisher.name}
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {publisher.postCount}{" "}
                        {publisher.postCount === 1 ? "Article" : "Articles"}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6">
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Writes about:
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {publisher.categories.map((category) => (
                          <span
                            key={category}
                            className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Popular topics:
                      </h3>
                      <div className="flex flex-wrap gap-1">
                        {publisher.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                          >
                            #{tag}
                          </span>
                        ))}
                        {publisher.tags.length > 3 && (
                          <span className="px-2 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                            +{publisher.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700">
                    <span className="text-blue-600 dark:text-blue-400 font-medium group-hover:underline flex items-center justify-center">
                      View Profile
                      <svg
                        className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
