import { TrendingUp, Star, Flame } from "lucide-react";

import TrendingArticles from "@/components/TrendingArticles";
import SuggestedArticles from "@/components/SuggestedArticles";
import PubularTopics from "@/components/PubularTopics";

const Trends = () => {
  const periods = [
    { id: "today", label: "Today", icon: Flame },
    { id: "week", label: "This Week", icon: TrendingUp },
    { id: "month", label: "This Month", icon: Star },
  ];

  return (
    <div className="mt-16 min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900">
      {/* Header */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 dark:from-orange-400/5 dark:to-red-400/5"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-white/20 dark:bg-white/10 backdrop-blur-xl border border-white/20 dark:border-white/10 text-orange-800 dark:text-orange-300 px-6 py-3 rounded-full text-sm font-medium shadow-lg mb-6">
              <Flame className="w-4 h-4" />
              <span>What&apos;s Hot Now</span>
            </div>
            <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Trending
              <span className="block bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Articles
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Discover the most popular articles and topics that the community
              is talking about right now
            </p>
          </div>

          {/* Period Selection */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/20 dark:bg-white/10 backdrop-blur-xl rounded-2xl p-2 border border-white/20 dark:border-white/10">
              <div className="flex space-x-2">
                {periods.map((period) => (
                  <button
                    key={period.id}
                    className="flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                  >
                    <period.icon className="w-4 h-4" />
                    <span>{period.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrendingArticles />
      <PubularTopics />
      <SuggestedArticles />
    </div>
  );
};

export default Trends;
