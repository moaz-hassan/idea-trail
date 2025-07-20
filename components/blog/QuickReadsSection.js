import { Clock } from "lucide-react";

const QuickReadsSection = ({ quickReads }) => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Quick Reads
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickReads.map((item) => (
          <article
            key={item.id}
            className="group bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-slate-700 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center text-gray-500 dark:text-gray-400 mb-3">
              <Clock className="w-4 h-4 mr-2" />
              <span className="text-sm">{item.time} min read</span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {item.title}
            </h3>
          </article>
        ))}
      </div>
    </section>
  );
};

export default QuickReadsSection;
