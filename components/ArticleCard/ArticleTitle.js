import { CardTitle } from "@/components/ui/card";
import Link from "next/link";

const ArticleTitle = ({ title, articleUrl, miniCard}) => {
  return (
    <>
      {!miniCard ? (
        <CardTitle className="text-lg md:text-xl font-bold">
          {`${title?.slice(0, 40)}${title?.length > 40 ? "..." : ""}` ||
            "The Future of Web Development in 2025"}
        </CardTitle>
      ) : (
        <Link href={articleUrl || "/blog"}>
          <CardTitle className="text-md   hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {`${title?.slice(0, 40)}${title?.length > 40 ? "..." : ""}` ||
              "The Future of Web Development in 2025"}
          </CardTitle>
        </Link>
      )}
    </>
  );
};

export default ArticleTitle;
