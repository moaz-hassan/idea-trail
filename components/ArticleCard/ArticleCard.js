import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import ArticleTitle from "./ArticleTitle";
import ArticleDescription from "./ArticleDescription";
import ArticleFooter from "./ArticleFooter";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChartNoAxesColumnIncreasing } from "lucide-react";

export default function ArticleCard({
  coverImageUrl,
  title,
  description,
  category,
  viewsNum,
  articleUrl,
  publisherId,
  publisherImage,
  publisherName,
  publishedDate,
  styles = "",
  imgStyles = "",
  miniCard = false,
}) {
  return (
    <Card
      className={cn(
        "overflow-hidden rounded-2xl border bg-background transition-all duration-300 p-0 ",
        "hover:shadow-lg hover:translate-y-[-5px] dark:hover:shadow-gray-800/50",
        !miniCard && "shadow-sm max-w-[450px]",
        styles
      )}
    >
      {!miniCard && (
        <div className="relative w-full h-[250px] overflow-hidden">
          <Image
            src={coverImageUrl || "/images/WebArticle.jpg"}
            alt={title || "Article cover image"}
            fill
            className={cn(
              "object-cover transition-transform duration-500 group-hover:scale-105",
              imgStyles
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent" />
        </div>
      )}

      {miniCard && (
        <div className="grid grid-cols-[100px_1fr] gap-4 p-2 items-start">
          <Link href={articleUrl || ""} className="block">
            <div className="relative w-[100px] h-[70px] rounded-md overflow-hidden">
              <Image
                src={coverImageUrl || "/images/WebArticle.jpg"}
                alt="cover"
                fill
                className={`object-cover ${imgStyles}`}
              />
            </div>
          </Link>
          <div className="flex flex-col justify-between">
            <ArticleTitle
              title={title}
              articleUrl={articleUrl}
              miniCard={true}
            />
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4">
              <Link
                href={`/blog/category/${
                  category?.toLowerCase().replace(/\s+/g, "-") ||
                  "web-development"
                }`}
                className="bg-muted px-2 py-0.5 rounded-md text-xs hover:bg-muted/80 transition-colors"
              >
                {category || "Web Development"}
              </Link>
              <span>{viewsNum || 0} Views</span>
            </div>
          </div>
        </div>
      )}

      {!miniCard && (
        <CardContent className="mt-4 flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <div className="flex flex-row flex-wrap justify-between items-center">
              <Link
                href={`/blog/category/${
                  category?.toLowerCase().replace(/\s+/g, "-") ||
                  "web-development"
                }`}
                className=" bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-medium hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
              >
                {category || "Web Development"}
              </Link>
              <div className="flex items-center justify-between text-sm text-muted-foreground ">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                    <ChartNoAxesColumnIncreasing />
                    {viewsNum || 0} views
                  </span>
                  <span className="text-gray-300 dark:text-gray-600">•</span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {new Date(publishedDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>

            <ArticleTitle
              title={title}
              articleUrl={articleUrl}
              className="text-xl font-bold leading-snug hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            />

            <ArticleDescription
              description={description}
              className="text-gray-600 dark:text-gray-400 line-clamp-2"
            />
          </div>
        </CardContent>
      )}
      <ArticleFooter
        articleUrl={articleUrl}
        publisherId={publisherId}
        publisherImage={publisherImage}
        publisherName={publisherName}
        publishedDate={publishedDate}
        publisherUrl={`/publishers/${publisherId}`}
        miniCard={miniCard}
      />
    </Card>
  );
}
