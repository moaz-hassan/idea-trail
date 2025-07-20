const TrendingTagsSection = ({ trendingTags }) => {
  return (
    <section>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        Trending Tags
      </h3>
      <div className="flex flex-wrap gap-2">
        {trendingTags.map((tag) => (
          <button
            key={tag}
            className="px-3 py-1 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
          >
            {tag}
          </button>
        ))}
      </div>
    </section>
  );
};

export default TrendingTagsSection;
