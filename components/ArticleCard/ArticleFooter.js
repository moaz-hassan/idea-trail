import {
  Calendar,
  User,
  Eye,
  Clock,
  ChartNoAxesColumnIncreasing,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const ArticleFooter = ({
  publisherImage,
  publisherName,
  publishedDate = "2025-01-01",
  publisherId,
  articleUrl,
  miniCard,
  viewsNum,
}) => {
  let formattedDate = "2025-01-01";

  if (typeof publishedDate === "object" && publishedDate?.seconds) {
    const date = new Date(publishedDate.seconds * 1000);
    formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } else if (typeof publishedDate === "string") {
    const date = new Date(publishedDate);
    if (!isNaN(date)) {
      formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  }

  return (
    <CardFooter
      className={cn(
        "flex flex-row items-center mb-4",
        miniCard
          ? "px-3 pb-3 justify-between w-full text-xs text-muted-foreground"
          : "pt-4 border-t border-gray-200 dark:border-gray-700 justify-between"
      )}
    >
      {miniCard ? (
        <div className="flex items-center justify-between w-full">
          <Link
            href={`/publishers/${publisherId}`}
            className="flex items-center gap-2 hover:underline h-fit max-w-[60%]"
          >
            {publisherImage ? (
              <Image
                src={publisherImage}
                alt={publisherName || "Publisher"}
                width={30}
                height={30}
                className="rounded-full h-[30px]"
              />
            ) : (
              <User className="w-8 h-8 rounded-full text-white bg-gradient-to-r from-blue-600 to-purple-600 p-2" />
            )}
            <span className="truncate text-lg">
              {publisherName || "John Doe"}
            </span>
          </Link>
          <div className="flex items-center gap-3 shrink-0">
            <span className="flex items-center gap-1 text-sm">
              <Clock className="w-3 h-3" />
              {formattedDate}
            </span>
            {viewsNum !== undefined && (
              <span className="flex items-center gap-1 text-sm">
                <ChartNoAxesColumnIncreasing />
                {viewsNum}
              </span>
            )}
          </div>
        </div>
      ) : (
        <>
          <Link
            href={`/publishers/${publisherId}`}
            className="flex items-center gap-3 group"
          >
            {publisherImage ? (
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 group-hover:border-blue-500 transition-colors">
                <Image
                  src={publisherImage}
                  alt={publisherName || "Publisher"}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white">
                <User className="w-5 h-5" />
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {publisherName || "John Doe"}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <Calendar className="w-3 h-3" />
                  {formattedDate}
                </span>
                {viewsNum !== undefined && (
                  <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <Eye className="w-3 h-3" />
                    {viewsNum} views
                  </span>
                )}
              </div>
            </div>
          </Link>
          <Link
            href={articleUrl || "/blog"}
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center gap-1"
          >
            Read More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </Link>
        </>
      )}
    </CardFooter>
  );
};

export default ArticleFooter;
