"use client";

import { X } from "lucide-react";

export default function ErrorAlert({
  error,
  onDismiss,
  className = "",
  dismissible = false,
}) {
  if (!error) return null;

  return (
    <div
      className={`bg-red-50 border-l-4 border-red-500 p-4 rounded shadow-sm dark:bg-red-900/30 dark:border-red-500 ${className}`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-red-500 dark:text-red-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
            Error
          </h3>
          <div className="mt-1 text-sm text-red-700 dark:text-red-300 whitespace-pre-line">
            {error}
          </div>
        </div>
        {dismissible && (
          <button
            type="button"
            onClick={onDismiss}
            className="ml-3 -mt-1 -mr-1 p-1 rounded-md text-red-500 hover:bg-red-100 dark:hover:bg-red-800/50 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}