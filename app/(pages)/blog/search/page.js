import getAllArticles from "@/lib/db_functions/getAllArticles";
import SearchClientPage from "./SearchClientPage";

export default async function page() {
  const articles = await getAllArticles();
  const categories = [...new Set(articles.map((article) => article.category))];
  const allCategories = categories.map((category) => ({
    name: category,
    count: articles.filter((article) => article.category === category).length,
  }));

  return (
    <>
      <SearchClientPage articles={articles} categories={allCategories} />
    </>
  );
}
