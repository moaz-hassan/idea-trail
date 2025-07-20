"use client";

import { useRouter } from "next/navigation";

const SearchSection = () => {
   const router = useRouter();
  return (
    <div className="my-50">
      <div>
        <h1 className="text-4xl font-bold text-center">Find Your Next Read </h1>
        <p className="text-lg text-center mt-4 mb-8 text-gray-500">
          Search through our collection of articles and tutorials to find the
          content that interests you the most.
        </p>
      </div>

      <input
        type="text"
        placeholder="Search articles..."
        className="min-w-[250px] border border-gray-300 rounded-lg p-2 w-1/2 mx-auto my-15 block outline-none focus:ring-1 focus:ring-blue-500"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            router.push(`/blog/search?value=${encodeURIComponent(e.target.value)}`);
            e.target.value = ""; 
          }
        }}
      />
    </div>
  );
};

export default SearchSection;
