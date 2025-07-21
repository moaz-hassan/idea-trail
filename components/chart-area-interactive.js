"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ChartAreaInteractive({ articles }) {
  const parsedArticles = JSON.parse(articles);

  // Get last 10 articles and reverse to maintain recent order
  const recentArticles = parsedArticles
    .slice(-10)
    .reverse()
    .map((article) => ({
      name:
        article?.title?.length > 75
          ? article.title.slice(0, 75) + "..."
          : article.title,
      value: article?.viewsNum || 0,
    }));

  return (
    <div className="w-full h-[400px] rounded-xl border bg-white dark:bg-zinc-900 pt-8 pb-16 px-10 shadow-sm *:outline-none">
      <h2 className="text-lg font-semibold mb-8 text-zinc-800 dark:text-zinc-100">
        Monthly Engagement
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={recentArticles}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "0.375rem",
              fontSize: "0.875rem",
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            fill="url(#colorValue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
