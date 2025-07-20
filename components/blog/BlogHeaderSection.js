"use client";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
const BlogHeaderSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  return (
    <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchTerm.trim() !== "") {
                  router.push(
                    `/blog/search?value=${encodeURIComponent(searchTerm)}`
                  );
                  setSearchTerm("");
                }
              }}
              className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-slate-700 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHeaderSection;
