"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import Link from "next/link";

// Custom debounce function (no lodash)
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

export default function BlogPage() {
  const [value, setValue] = useState("");
  const router = useRouter();

  const debouncedSearch = useRef(
    debounce((val) => {
      if (val.trim().length > 0) {
        router.push(`/blog/search?value=${encodeURIComponent(val.trim())}`);
      }
    }, 500)
  ).current;

  useEffect(() => {
    debouncedSearch(value);
  }, [debouncedSearch, value]);

  return (
    <div className="max-w-5xl mx-auto px-4 pt-8 pb-20">
      <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 mb-6 shadow-sm">
        <Search className="w-5 h-5 text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search articles..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full bg-transparent focus:outline-none"
        />
      </div>

      {/* You can place your homepage sections here */}
      {/* For example: */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Latest Articles</h2>
        {/* Render latest articles list here */}
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">New Voices</h2>
        {/* Render new publishers with >1 article */}
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">From Authors You Follow</h2>
        {/* Conditionally render if following publishers */}
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Daily Trending Tags</h2>
        {/* Render trending tags from last 24h */}
      </section>
    </div>
  );
}
