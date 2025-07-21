import Link from "next/link";
import { ArrowLeft, Tag, User, Calendar } from "lucide-react";
import ViewsNum from "./ViewsNum";
import ArticleReactsBtns from "./ArticleReactsBtns";

const ArticleHeader = ({
  title,
  subtitle,
  publisherName,
  publisherId,
  category,
  tags,
  viewsNum,
  publishDate,
  imgUrl,
}) => {
  return (
    <div
      className={`relative min-h-[600px] overflow-hidden`}
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative backdrop-blur-md bg-white/10 dark:bg-slate-800/10 border border-white/20 dark:border-slate-700/20 shadow-2xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative z-10">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-white/90 hover:text-white font-medium transition-all duration-300 mb-8 group backdrop-blur-xl bg-white/10 dark:bg-slate-800/10 px-6 py-3 rounded-2xl border border-white/20 dark:border-slate-700/20 shadow-lg hover:shadow-xl hover:bg-white/20 dark:hover:bg-slate-800/20"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to Home</span>
          </Link>

          <div className="mb-6">
            <span className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/80 to-purple-500/80 backdrop-blur-xl text-white text-sm font-medium rounded-2xl shadow-2xl border border-white/20 hover:from-blue-500/90 hover:to-purple-500/90 transition-all duration-300">
              <Tag className="w-4 h-4 mr-2" />
              {category}
            </span>
          </div>

          <div className="mb-8 p-6">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent leading-tight drop-shadow-lg">
              {title}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-6 mb-8 p-6 ">
            <Link
              href={`/publishers/${publisherId}`}
              className="flex items-center space-x-3 group hover:bg-white/20 dark:hover:bg-slate-800/20 p-3 rounded-2xl transition-all duration-300 backdrop-blur-sm"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500/80 to-purple-500/80 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm border border-white/20">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-white/90 group-hover:text-white transition-colors duration-300 drop-shadow-sm">
                  {publisherName}
                </p>
                <p className="text-sm text-white/70 group-hover:text-white/80 transition-colors duration-300">
                  View Profile
                </p>
              </div>
            </Link>

            <div className="flex items-center space-x-4 text-white/80">
              <div className="flex items-center space-x-2 backdrop-blur-sm bg-white/10 px-4 py-2 rounded-xl border border-white/20">
                <Calendar className="w-5 h-5" />
                <time className="font-medium">
                  {publishDate?.split("T")[0]}
                </time>
              </div>
              <div className="backdrop-blur-sm bg-white/10 px-4 py-2 rounded-xl border border-white/20">
                <ViewsNum viewsNum={viewsNum} />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog`}
                className="inline-flex items-center px-4 py-2 backdrop-blur-xl bg-white/10 dark:bg-slate-800/10 text-white/90 text-sm rounded-2xl hover:bg-white/20 dark:hover:bg-slate-800/20 hover:text-white transition-all duration-300 font-medium border border-white/20 dark:border-slate-700/20 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <span className="mr-1">#</span>
                <span>{tag}</span>
              </Link>
            ))}
          </div>

          <div className="relative p-8 backdrop-blur-2xl bg-gradient-to-br from-white/15 to-white/5 dark:from-slate-800/15 dark:to-slate-800/5 rounded-3xl border border-white/30 dark:border-slate-700/30 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50 animate-pulse"></div>

            <div className="relative z-10 flex items-center justify-between">
              <p className="text-lg text-white/90 italic font-medium leading-relaxed drop-shadow-sm">
                {subtitle}
              </p>
              <ArticleReactsBtns />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleHeader;
