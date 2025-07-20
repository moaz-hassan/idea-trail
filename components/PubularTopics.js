import { Star } from "lucide-react";
import Link from "next/link";
import React from "react";

const PubularTopics = () => {
  const popularTopics = [
    "React",
    "TypeScript",
    "CSS",
    "JavaScript",
    "Design Systems",
  ];
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
            <Star className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Popular Topics
          </h2>
        </div>

        <div className="flex flex-wrap gap-4 mb-12">
          {popularTopics.map((topic) => (
            <Link
              key={topic}
              href={`/search?q=${topic}`}
              className="bg-white/20 dark:bg-white/10 backdrop-blur-xl border border-white/20 dark:border-white/10 px-6 py-3 rounded-2xl text-slate-700 dark:text-slate-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {topic}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PubularTopics;
