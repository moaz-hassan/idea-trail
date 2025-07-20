"use client";
import ImageUploader from "../ImageUploader";

const categories = [
  "Technology",
  "Design",
  "Development",
  "Business",
  "Marketing",
  "Productivity",
  "Tutorial",
  "Case Study",
  "Opinion",
  "News",
  "Other",
];

export default function ArticleForm({
  title,
  subtitle,
  category,
  keywords,
  featuredImage,
  onTitleChange,
  onSubtitleChange,
  onCategoryChange,
  onKeywordsChange,
  onImageUpload,
  onImageRemove,
}) {
  return (
    <form className="space-y-5 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Article Title *
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Enter a compelling title"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Subtitle *
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
          value={subtitle}
          onChange={(e) => onSubtitleChange(e.target.value)}
          placeholder="A brief description of your article"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category *
          </label>
          <select
            className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            required
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Keywords *
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
            value={keywords}
            onChange={(e) => onKeywordsChange(e.target.value)}
            placeholder="technology, web, development"
            required
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Separate keywords with commas
          </p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Featured Image *
        </label>
        <ImageUploader
          onUploadSuccess={onImageUpload}
          onRemove={onImageRemove}
        />
      </div>
    </form>
  );
}