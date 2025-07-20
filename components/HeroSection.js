import { ArrowRight, Book, BookOpen, User } from "lucide-react";
import Link from "next/link";
import ArticleCard from "./ArticleCard/ArticleCard";
import { blogPosts } from "@/utils/dummyData";

export default function HeroSection() {
  return (
    <div className="min-sm:grid min-sm:grid-cols-[repeat(auto-fill,minmax(450px,1fr))] items-center  mt-16 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-400/5 dark:to-purple-400/5 py-12 px-40 max-md:px-5">
      <div className="flex flex-col gap-6 h-fit mx-auto max-sm:w-[100%]">
        <h3 className="w-fit flex flex-row gap-2 py-2.5 px-4 bg-white/10 rounded-4xl text-blue-800 font-bold text-center  shadow-lg shadow-gray-300">
          <Book /> Professional Tech Blog
        </h3>
        <h1 className="text-6xl max-sm:text-4xl font-bold text-center text-gray-800 dark:text-white ">
          Discover the
          <span className="text-6xl max-sm:text-4xl ml-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ">
            Future of Tech
          </span>
        </h1>
        <p className="text-lg text-center text-slate-600 dark:text-slate-400">
          Explore cutting-edge insights, tutorials, and stories from the world
          of technology, design, and development. Join thousands of
          professionals staying ahead of the curve.
        </p>
        <div className="flex justify-center gap-4 my-5">
          <Link
            href="/blog"
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700
 px-4 py-2 rounded-md text-white hover:transition-all hover:duration-300 hover:scale-102  shadow-lg shadow-gray-300"
          >
            <BookOpen /> Start Reading <ArrowRight className="max-sm:hidden" />
          </Link>
          <Link
            href="/about"
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-md text-black hover:transition-all hover:duration-300 hover:scale-102  shadow-lg shadow-gray-300"
          >
            <User /> About Us
          </Link>
        </div>
      </div>

      <div className="mx-auto px-4 py-12 max-sm:w-[100%] min-sm:w-[500px]">
        {/* Get the most recent article as featured */}
        {blogPosts.length > 0 && (
          <ArticleCard
            title={blogPosts[0].title}
            description={blogPosts[0].excerpt}
            category={blogPosts[0].category}
            publlishedDate={blogPosts[0].date}
            Articleurl={`/blog/${blogPosts[0].id}`}
            publisherName={blogPosts[0].author}
            publisherUrl={`/authors/${encodeURIComponent(blogPosts[0].author)}`}
            styles="shadow-lg shadow-gray-300"
          />
        )}
      </div>
    </div>
  );
}
