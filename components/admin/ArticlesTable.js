"use client";
import { useState } from "react";
import Link from "next/link";
import updateArticleStatus from "@/lib/db_functions/updateArticleStatus";

export default function ArticlesTable({ articles }) {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const statusColors = {
    published: "bg-green-100 text-green-800",
    draft: "bg-yellow-100 text-yellow-800",
    pending: "bg-blue-100 text-blue-800",
    blocked: "bg-red-100 text-red-800"
  };

  return (
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Author
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {articles.map((article) => (
              <tr key={article.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-normal text-sm font-medium text-gray-900">
                  <Link
                    href={`/blog/${article.id}`}
                    className="hover:text-blue-600"
                  >
                    {article.title}
                  </Link>
                  <p className="text-xs md:text-sm mt-0.5 text-gray-500">
                    {article.subtitle}
                  </p>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Link
                    href={`/authors/${article.authorId}`}
                    className="hover:border-b-[1px] border-black"
                  >
                    {article.author}
                  </Link>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      statusColors[article.status]
                    }`}
                  >
                    {article.status}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {article?.publishDate.split("T")[0]}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 relative">
                  <button
                    className="p-1 rounded-md hover:bg-gray-100"
                    onClick={() =>
                      setSelectedArticle(
                        selectedArticle === article.id ? null : article.id
                      )
                    }
                    aria-label="Article actions"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                      />
                    </svg>
                  </button>
                  {selectedArticle === article.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                      <div className="py-1">
                        {article.status === "blocked" ? (
                          <button
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            onClick={() =>
                              updateArticleStatus(article.id, "active")
                            }
                          >
                            Unblock
                          </button>
                        ) : (
                          <button
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            onClick={() =>
                              updateArticleStatus(article.id, "blocked")
                            }
                          >
                            Block
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {articles.map((article) => (
          <div key={article.id} className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <Link href={`/blog/${article.id}`} className="font-medium text-gray-900 hover:text-blue-600">
                  {article.title}
                </Link>
                <p className="text-xs text-gray-500 mt-1">{article.subtitle}</p>
              </div>
              <div className="relative">
                <button
                  onClick={() => setSelectedArticle(selectedArticle === article.id ? null : article.id)}
                  className="p-1 rounded-md hover:bg-gray-100"
                  aria-label="Article actions"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                </button>
                {selectedArticle === article.id && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                    <div className="py-1">
                      {article.status === "blocked" ? (
                        <button
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          onClick={() => updateArticleStatus(article.id, "active")}
                        >
                          Unblock
                        </button>
                      ) : (
                        <button
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          onClick={() => updateArticleStatus(article.id, "blocked")}
                        >
                          Block
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <Link href={`/authors/${article.authorId}`} className="text-sm text-gray-600 hover:underline">
                  {article.author}
                </Link>
                <span className={`px-2 py-1 text-xs rounded-full ${statusColors[article.status]}`}>
                  {article.status}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                {article?.publishDate.split("T")[0]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}