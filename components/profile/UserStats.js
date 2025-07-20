import { BookOpen, Heart, Bookmark, TrendingUp } from "lucide-react";

export default function UserStats({ stats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 dark:border-slate-700/50 text-center p-6 hover:shadow-xl transition-transform transform hover:-translate-y-1"
        >
          <div
            className={`w-14 h-14 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mx-auto mb-4`}
          >
            <stat.icon className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">
            {stat.value}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}