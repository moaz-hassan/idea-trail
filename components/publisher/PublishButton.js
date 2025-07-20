"use client";

export default function PublishButton({ 
  isScheduled, 
  isPublishing, 
  onClick 
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isPublishing}
      className={`inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 h-12 w-48 ${
        isPublishing
          ? "bg-blue-300 dark:bg-blue-700 text-white cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
      }`}
    >
      {isPublishing ? (
        <span className="flex items-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {isScheduled ? "Scheduling..." : "Publishing..."}
        </span>
      ) : (
        <span className="flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {isScheduled ? "Schedule Article" : "Publish Article"}
        </span>
      )}
    </button>
  );
}