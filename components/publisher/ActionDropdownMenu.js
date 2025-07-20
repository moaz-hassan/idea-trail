import Link from "next/link";

function ActionDropdownMenu({ article ,selectedArticle}) {
  <div className="lg:hidden relative">
    <button
      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
      onClick={(e) => {
        e.stopPropagation();
        setSelectedArticle(selectedArticle === article.id ? null : article.id);
      }}
      aria-label="Article actions"
    >
      <svg
        className="w-5 h-5 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 5v.01M12 12v.01M12 19v.01"
        />
      </svg>
    </button>

    {selectedArticle === article.id && (
      <div
        ref={dropdownRef}
        className="absolute right-0 top-full mt-2 z-50 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1"
      >
        <Link
          href={`/admin/dashboard/articles/edit/${article.id}`}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          Edit Article
        </Link>
        <Link
          href={`/blog/${article.id}`}
          target="_blank"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          View Article
        </Link>
        {article.status === "scheduled" && (
          <button
            onClick={() => handleReschedule(article.id)}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Reschedule
          </button>
        )}
        <button
          onClick={() => handleCopyLink(article.id)}
          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          Copy Link
        </button>
        <hr className="my-1 border-gray-200" />
        <button
          onClick={() => handleDelete(article.id)}
          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
        >
          Delete Article
        </button>
      </div>
    )}
  </div>;
}

export default ActionDropdownMenu;
