import { CardDescription } from "@/components/ui/card";
const ArticleDescription = ({ description, miniCard }) => {
  return (
    <>
      {!miniCard && (
        <CardDescription className="text-sm md:text-base text-gray-600 dark:text-gray-300">
          {`${description?.slice(0, 280)}${
            description?.length > 280 ? "..." : ""
          }` ||
            "Explore the latest trends and technologies shaping the future of web development, from AI-driven design to serverless architectures."}
        </CardDescription>
      )}
    </>
  );
};

export default ArticleDescription;
