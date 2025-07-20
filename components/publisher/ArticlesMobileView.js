import React from "react";
import ActionDropdownMenu from "./ActionDropdownMenu";
import Image from "next/image";
import Link from "next/link";

const ArticlesMobileView = ({
  sortedArticles,
  selectedArticle,
  formatDate,
  formatViews,
  statusColors
}) => {

  return (
    <div className="lg:hidden space-y-3">
      {sortedArticles.map((article) => (
        <div
          key={article.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-3"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              {article.imgUrl && (
                <Image
                  src={article.imgUrl}
                  width={48}
                  height={48}
                  alt={article.title}
                  className="rounded-lg border object-cover w-12 h-12 flex-shrink-0"
                />
              )}
              <div className="min-w-0 flex-1">
                <Link
                  href={`/admin/dashboard/articles/${article.id}`}
                  className="text-sm font-medium text-gray-900 hover:text-blue-600 block leading-tight"
                >
                  {article.title}
                </Link>
                {article.subtitle && (
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {article.subtitle}
                  </p>
                )}
              </div>
            </div>
            <div className="flex-shrink-0">
              <ActionDropdownMenu
                article={article}
                selectedArticle={selectedArticle}
              />
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <span className="text-xs font-medium text-gray-600">
                  {formatViews(article.viewsNum)}
                </span>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  statusColors[article.status] || "bg-gray-100 text-gray-800"
                }`}
              >
                {article.status}
              </span>
            </div>
            <div className="text-xs text-gray-500">
              {formatDate(article.publishDate)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticlesMobileView;
